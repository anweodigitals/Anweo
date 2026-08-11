import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: { delay: number; y: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: custom.delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={{ delay, y }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

interface SplitLinesProps {
  text: string;
  className?: string;
  stagger?: number;
}

export function SplitLines({ text, className, stagger = 0.08 }: SplitLinesProps) {
  const lines = text.split("\n");
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 1,
              delay: i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
