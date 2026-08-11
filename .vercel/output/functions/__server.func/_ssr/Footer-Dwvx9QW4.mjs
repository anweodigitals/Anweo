import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { M as Magnetic, L as LiveClock } from "./index-CLwnYOT6.mjs";
import { R as Reveal } from "./Reveal-10eBSdHQ.mjs";
import { u as useScroll, c as useTransform, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/lenis.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Footer() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [120, -40]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.2]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "footer",
    {
      id: "contact",
      ref,
      className: "relative px-6 lg:px-10 pt-20 lg:pt-28 pb-10 overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            "aria-hidden": true,
            style: { scale: glowScale, background: "var(--ember)" },
            className: "absolute bottom-0 left-1/2 -translate-x-1/2 size-[900px] rounded-full opacity-[0.18] blur-[160px]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-[1600px] mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 mb-6 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-ember animate-pulse" }),
              "Now booking — 3 slots open"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display text-[clamp(2.5rem,9vw,9rem)] leading-tight", children: [
              "Let's make your",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "brand ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-ember", children: "unforgettable." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { strength: 0.25, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "mailto:hello@anweo.studio",
                  className: "group inline-flex items-center gap-4 text-2xl lg:text-3xl font-display border-b border-bone/20 pb-3 hover:border-ember transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-3 rounded-full bg-ember shadow-[0_0_20px_var(--ember)]" }),
                    "hello@anweo.studio",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2", children: "↗" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs uppercase tracking-widest text-bone/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Instagram", className: "link-underline", children: "Instagram" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Behance", className: "link-underline", children: "Behance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Dribbble", className: "link-underline", children: "Dribbble" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "LinkedIn", className: "link-underline", children: "LinkedIn" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "WhatsApp", className: "link-underline", children: "WhatsApp" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Newsletter", className: "link-underline", children: "Newsletter" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4 lg:col-start-9 space-y-6", children: [
              { city: "Studio", addr: "India · Available worldwide", tz: "Asia/Kolkata", code: "IND" }
            ].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between border-b border-bone/10 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: o.city }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-bone/50 mt-1", children: o.addr })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(LiveClock, { tz: o.tz, label: o.code })
            ] }, o.city)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              style: { y: wordmarkY, scale: wordmarkScale },
              className: "mt-28 select-none will-change-transform",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display text-[20vw] leading-none tracking-tighter text-bone/95", children: "ANWEO" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-6 border-t border-bone/10 flex flex-wrap justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "© 2026 Anweo — Beyond the builds" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Built in-house · every pixel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "v 2026.01" })
          ] })
        ] })
      ]
    }
  );
}
export {
  Footer
};
