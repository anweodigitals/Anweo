import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useMotionValue, u as useScroll, d as useVelocity, a as useSpring, c as useTransform, e as useAnimationFrame } from "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const items = [
  "Brand identity",
  "Web development",
  "Video editing",
  "Graphic design",
  "Ad creatives",
  "Social branding",
  "Motion",
  "Launch comms"
];
function Marquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1e3], [0, 4], { clamp: false });
  const trackRef = reactExports.useRef(null);
  const directionRef = reactExports.useRef(1);
  const halfWidthRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (trackRef.current) {
      halfWidthRef.current = trackRef.current.scrollWidth / 2;
    }
  }, []);
  useAnimationFrame((_, delta) => {
    const baseSpeed = -0.04;
    let moveBy = baseSpeed * delta;
    const v = velocityFactor.get();
    if (v < 0) directionRef.current = -1;
    else if (v > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * Math.abs(v) * 0.5;
    const next = baseX.get() + moveBy;
    const el = trackRef.current;
    if (el) {
      const halfWidth = halfWidthRef.current;
      let wrapped = next;
      if (wrapped <= -halfWidth) wrapped += halfWidth;
      if (wrapped > 0) wrapped -= halfWidth;
      baseX.set(wrapped);
      el.style.transform = `translateX(${wrapped}px)`;
    }
  });
  reactExports.useEffect(() => () => baseX.set(0), [baseX]);
  const loop = [...items, ...items, ...items, ...items];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-bone/10 py-6 overflow-hidden bg-plum/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: trackRef, className: "flex gap-16 w-max will-change-transform", children: loop.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-12 shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "display italic text-5xl lg:text-7xl text-bone/90", children: item }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-ember text-4xl", children: "✦" })
  ] }, i)) }) });
}
export {
  Marquee
};
