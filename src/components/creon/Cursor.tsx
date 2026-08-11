import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 32, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor='hover']"));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:block will-change-transform"
    >
      <motion.div
        animate={{
          width: hover ? 56 : 14,
          height: hover ? 56 : 14,
          backgroundColor: hover ? "rgba(255,91,35,0.18)" : "rgba(237,231,221,0)",
          borderColor: hover ? "rgba(255,91,35,0.9)" : "rgba(237,231,221,0.6)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
      />
    </motion.div>
  );
}

