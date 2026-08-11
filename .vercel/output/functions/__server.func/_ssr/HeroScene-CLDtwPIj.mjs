import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Canvas, u as useFrame } from "../_libs/react-three__fiber.mjs";
import { F as Float } from "../_libs/react-three__drei.mjs";
import { i as Vector2 } from "../_libs/three.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/react-use-measure.mjs";
const vertexShader = (
  /* glsl */
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`
);
const fragmentShader = (
  /* glsl */
  `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x>x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;
    float t = uTime * 0.08;
    float n1 = snoise(p * 1.2 + vec2(t, -t * 0.6));
    float n2 = snoise(p * 2.4 - vec2(t * 0.7, t));
    float n = n1 * 0.65 + n2 * 0.35;
    vec2 m = uMouse * 2.0 - 1.0;
    m.x *= uResolution.x / uResolution.y;
    float d = distance(p, m);
    float bloom = smoothstep(1.2, 0.0, d) * 0.55;
    vec3 ink   = vec3(0.039, 0.039, 0.039);
    vec3 plum  = vec3(0.055, 0.070, 0.031);
    vec3 ember = vec3(0.714, 1.000, 0.235);
    vec3 gold  = vec3(0.875, 1.000, 0.520);
    float k = smoothstep(-0.4, 0.9, n + bloom * 1.2);
    vec3 col = mix(ink, plum, smoothstep(0.0, 0.5, k));
    col = mix(col, ember * 0.75, smoothstep(0.55, 0.85, k));
    col = mix(col, gold, smoothstep(0.85, 1.0, k) * 0.55);
    float v = smoothstep(1.4, 0.4, length(uv - 0.5));
    col *= mix(0.55, 1.0, v);
    gl_FragColor = vec4(col, 1.0);
  }
`
);
function BackgroundPlane() {
  const mouse = reactExports.useRef(new Vector2(0.5, 0.5));
  const target = reactExports.useRef(new Vector2(0.5, 0.5));
  const uniforms = reactExports.useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uResolution: { value: new Vector2(1, 1) }
    }),
    []
  );
  useFrame(({ size, pointer, clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
    target.current.set((pointer.x + 1) * 0.5, (pointer.y + 1) * 0.5);
    mouse.current.lerp(target.current, 0.04);
    uniforms.uMouse.value.copy(mouse.current);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0, 0, -5], renderOrder: -1, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("planeGeometry", { args: [40, 25] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "shaderMaterial",
      {
        vertexShader,
        fragmentShader,
        uniforms,
        depthWrite: false
      }
    )
  ] });
}
function GlassShape({
  position,
  scale,
  geometry,
  speed = 1,
  rotIntensity = 1,
  floatIntensity = 1
}) {
  const ref = reactExports.useRef(null);
  const mouse = reactExports.useRef({ x: 0, y: 0 });
  useFrame(({ pointer, clock }) => {
    if (!ref.current) return;
    mouse.current.x += (pointer.x * 0.3 - mouse.current.x) * 0.04;
    mouse.current.y += (pointer.y * 0.3 - mouse.current.y) * 0.04;
    ref.current.rotation.y = clock.getElapsedTime() * 0.2 * speed + mouse.current.x;
    ref.current.rotation.x = clock.getElapsedTime() * 0.15 * speed + mouse.current.y;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Float, { speed: speed * 1.4, rotationIntensity: rotIntensity, floatIntensity, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, position, scale, children: [
    geometry === "torus" && /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [1, 0.38, 16, 48] }),
    geometry === "ico" && /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [1, 1] }),
    geometry === "sphere" && /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [1, 24, 24] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhysicalMaterial",
      {
        transmission: 1,
        roughness: 0.15,
        ior: 1.4,
        thickness: 1.2,
        color: "#e8ffb8",
        attenuationColor: "#b6ff3c",
        attenuationDistance: 1.6,
        envMapIntensity: 0.8,
        transparent: true
      }
    )
  ] }) });
}
function HeroScene() {
  const containerRef = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(true);
  const [enabled, setEnabled] = reactExports.useState(true);
  const [isMobile, setIsMobile] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
    if (reduced) setEnabled(false);
  }, []);
  reactExports.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "absolute inset-0", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          background: "radial-gradient(60% 50% at 70% 35%, rgba(182,255,60,0.30), transparent 60%), radial-gradient(50% 45% at 25% 65%, rgba(14,18,8,0.9), transparent 70%), linear-gradient(180deg, #0A0A0A, #0A0A0A)"
        }
      }
    ),
    enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Canvas,
      {
        dpr: [1, isMobile ? 1 : 1.5],
        frameloop: visible ? "always" : "never",
        gl: {
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: !isMobile
        },
        camera: { position: [0, 0, 6], fov: isMobile ? 60 : 45 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("color", { attach: "background", args: ["#0A0A0A"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BackgroundPlane, {}),
            !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.6 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [5, 5, 5], intensity: 1.2, color: "#dfffa0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [-5, -3, 2], intensity: 0.6, color: "#b6ff3c" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GlassShape, { position: [2.2, 0.4, 0], scale: 1.4, geometry: "torus", speed: 0.7, floatIntensity: 1.2 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GlassShape, { position: [-2.8, -0.6, -1], scale: 1, geometry: "ico", speed: 1, rotIntensity: 1.4 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GlassShape, { position: [0.2, 1.6, -2], scale: 0.7, geometry: "sphere", speed: 0.5, floatIntensity: 2 })
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  HeroScene
};
