import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

function toWebRequest(req: any): Request {
  if (req instanceof Request || (req && typeof req.headers?.get === "function" && typeof req.url === "string")) {
    return req as Request;
  }

  const headers = new Headers();
  if (req && req.headers) {
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => headers.append(key, String(v)));
        } else {
          headers.set(key, String(value));
        }
      }
    }
  }

  const proto = headers.get("x-forwarded-proto") || "https";
  const host = headers.get("x-forwarded-host") || headers.get("host") || "localhost";
  const rawUrl = req?.url || "/";
  const fullUrl = rawUrl.startsWith("http") ? rawUrl : `${proto}://${host}${rawUrl}`;

  const method = req?.method || "GET";
  const hasBody = method !== "GET" && method !== "HEAD";

  return new Request(fullUrl, {
    method,
    headers,
    body: hasBody ? req : undefined,
  });
}

async function handler(rawReq: any, rawResOrEnv?: any, ctx?: unknown) {
  const isNodeHandler = rawResOrEnv && typeof rawResOrEnv.writeHead === "function" && typeof rawResOrEnv.end === "function";

  try {
    const request = toWebRequest(rawReq);
    const env = isNodeHandler ? undefined : rawResOrEnv;
    const entry = await getServerEntry();
    const response = await entry.fetch(request, env, ctx);
    const normalizedResponse = await normalizeCatastrophicSsrResponse(response);

    if (isNodeHandler) {
      const res = rawResOrEnv;
      res.statusCode = normalizedResponse.status;
      normalizedResponse.headers.forEach((val, key) => {
        res.setHeader(key, val);
      });
      const bodyBuffer = await normalizedResponse.arrayBuffer();
      res.end(Buffer.from(bodyBuffer));
      return;
    }

    return normalizedResponse;
  } catch (error) {
    console.error("SSR Handler Error:", error);
    const errResp = brandedErrorResponse();

    if (isNodeHandler) {
      const res = rawResOrEnv;
      res.statusCode = 500;
      res.setHeader("content-type", "text/html; charset=utf-8");
      res.end(await errResp.text());
      return;
    }

    return errResp;
  }
}

handler.fetch = handler;

export default handler;
