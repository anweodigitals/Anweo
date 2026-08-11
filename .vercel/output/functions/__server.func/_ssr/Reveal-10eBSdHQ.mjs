import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: custom.delay,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};
function Reveal({ children, className, delay = 0, y = 24 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className,
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-80px" },
      custom: { delay, y },
      variants,
      children
    }
  );
}
export {
  Reveal as R
};
