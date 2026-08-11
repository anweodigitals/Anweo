import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Reveal } from "./Reveal-10eBSdHQ.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const services = [
  {
    id: "01",
    name: "Web development",
    blurb: "Fast, cinematic websites built with modern tooling. Custom motion, 3D depth, and conversion-tuned UX — engineered to load on a 4G phone in a café.",
    deliverables: ["Custom design", "Headless / Next.js", "CMS & bookings", "SEO + analytics"]
  },
  {
    id: "02",
    name: "Brand identity",
    blurb: "Logos, type systems, packaging and full brand kits that make small businesses look like the established player on the street.",
    deliverables: ["Logo system", "Brand guidelines", "Print + packaging", "Asset library"]
  },
  {
    id: "03",
    name: "Video editing",
    blurb: "Cinematic short-form for reels, ads, and storefront screens. We cut, colour, and score — turning your phone footage into something that sells.",
    deliverables: ["Reels & TikTok", "Brand films", "Ads", "Colour & sound"]
  },
  {
    id: "04",
    name: "Graphic design",
    blurb: "Menus, posters, signage, lookbooks, and the everyday graphics that quietly raise your perceived price point by 30%.",
    deliverables: ["Print collateral", "Menus & signage", "Lookbooks", "Templates"]
  },
  {
    id: "05",
    name: "Ads & social branding",
    blurb: "End-to-end paid social — Meta, TikTok, Google. Strategy, creative, and weekly optimisation aimed at one number: more customers through the door.",
    deliverables: ["Creative strategy", "Ad production", "Media buying", "Reporting"]
  }
];
function Services() {
  const [active, setActive] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "services", className: "bg-bone text-ink px-6 lg:px-10 py-20 lg:py-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "flex flex-wrap items-end justify-between gap-6 mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-ember" }),
          "What we make"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display text-5xl lg:text-7xl max-w-3xl", children: [
          "Five disciplines.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "One studio in your corner." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-ink/60", children: "Everything a modern café, salon, boutique or service business needs to look premium online — without juggling four different freelancers." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-ink/15", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "lg:col-span-7 divide-y divide-ink/15", children: services.map((s, i) => {
        const isActive = active === i;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            onMouseEnter: () => setActive(i),
            onClick: () => setActive(i),
            className: "group cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-6 py-8 lg:py-10 transition-all", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-ink/40", children: s.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: `display text-4xl lg:text-7xl transition-all duration-500 ${isActive ? "text-ember translate-x-3" : "text-ink"}`,
                    children: s.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `ml-auto text-2xl transition-all duration-500 ${isActive ? "rotate-45 text-ember" : "rotate-0 text-ink/40"}`,
                    children: "+"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: "auto", opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  className: "overflow-hidden",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-10 lg:pl-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-ink/70 leading-relaxed", children: s.blurb }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 font-mono text-xs uppercase tracking-widest text-ink/60", children: s.deliverables.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1 bg-ember rounded-full" }),
                      d
                    ] }, d)) })
                  ] })
                }
              ) })
            ]
          },
          s.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex lg:col-span-4 lg:col-start-9 sticky top-32 self-start flex-col gap-6 pt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50", children: "Engagement model" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "display text-3xl leading-tight", children: "One-off projects or monthly retainers — scoped to your business, not a price list." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4 pt-6 border-t border-ink/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display text-4xl", children: "14d" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-widest text-ink/50 mt-1", children: "Typical launch" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display text-4xl", children: "1:1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-widest text-ink/50 mt-1", children: "Founder access" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Services
};
