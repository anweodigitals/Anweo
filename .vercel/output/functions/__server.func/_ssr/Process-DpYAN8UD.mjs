import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Reveal } from "./Reveal-10eBSdHQ.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const steps = [
  {
    n: "01",
    title: "Discover",
    weeks: "Week 1",
    body: "We sit down with you — in person or on a call — and map the business: your customer, your room, your menu, your margins. Nothing ships until we agree on the goal."
  },
  {
    n: "02",
    title: "Design",
    weeks: "Week 1–2",
    body: "Brand direction, identity routes, and site wireframes. You see real pixels in days, not weeks. We iterate fast over Loom, not over status calls."
  },
  {
    n: "03",
    title: "Build",
    weeks: "Week 2–3",
    body: "Identity rolled out across web, social, print, signage. Cinematic edits, ad creatives, and a site that loads on a 4G phone in under two seconds."
  },
  {
    n: "04",
    title: "Grow",
    weeks: "Ongoing",
    body: "Optional retainer: weekly content, paid ads, and small site iterations. We watch the numbers — bookings, footfall, online orders — and keep tuning."
  }
];
function Process() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "process", className: "px-6 lg:px-10 py-20 lg:py-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "mb-20 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 mb-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-ember" }),
        "How we work"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display text-5xl lg:text-7xl", children: [
        "From kickoff to live in ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-ember", children: "two weeks." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "border-t border-bone/15", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Reveal,
      {
        delay: i * 0.05,
        className: "grid grid-cols-12 gap-6 border-b border-bone/15 py-10 lg:py-14 group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-12 lg:col-span-2 font-mono text-xs uppercase tracking-widest text-bone/50", children: s.weeks }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-full border border-bone/30 grid place-items-center font-mono text-xs group-hover:bg-ember group-hover:text-ink group-hover:border-ember transition-colors", children: s.n }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "col-span-10 lg:col-span-4 display text-4xl lg:text-6xl", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-12 lg:col-span-5 text-bone/70 leading-relaxed max-w-lg", children: s.body })
        ]
      },
      s.n
    )) })
  ] }) });
}
export {
  Process
};
