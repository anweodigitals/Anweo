import { Magnetic } from "./Magnetic";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, lazy, Suspense } from "react";

const HeroScene = lazy(() => import("./HeroScene").then((m) => ({ default: m.HeroScene })));

const lines = [
  { text: "Digital craft", italic: false, accent: false },
  { text: "for brands that", italic: true, accent: false },
  { text: "deserve more.", italic: false, accent: true },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative pt-40 lg:pt-48 pb-24 px-6 lg:px-10 overflow-hidden min-h-[100svh]"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 will-change-transform"
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink pointer-events-none" />
      </motion.div>

      <div className="relative max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-12 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="block w-12 h-px bg-bone/40"
          />
          <span>Anweo — Beyond the builds</span>
        </motion.div>

        <motion.h1
          style={{ y: headingY, opacity: headingOpacity }}
          className="display text-[clamp(3rem,11vw,11rem)] [text-shadow:0_2px_40px_rgba(0,0,0,0.4)] will-change-[transform,opacity]"
        >
          {lines.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                className={`block ${line.italic ? "italic" : ""}`}
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.025, delayChildren: li * 0.12 }}
              >
                {line.text.split(" ").map((word, wi) => (
                  <span key={wi} className="inline-block overflow-hidden align-baseline">
                    <motion.span
                      className="inline-block"
                      variants={{
                        hidden: { y: "110%", opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                    >
                      {line.accent && wi === 0 ? (
                        <span className="text-ember">{word}</span>
                      ) : (
                        word
                      )}
                      {wi < line.text.split(" ").length - 1 && "\u00A0"}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end"
        >
          <p className="lg:col-span-5 text-lg lg:text-xl text-bone/80 max-w-xl leading-relaxed">
            Anweo is a boutique digital studio building luxury brand identities,
            cinematic websites, and growth-ready content for cafés, salons,
            boutiques, and modern service businesses.
          </p>

          <div className="lg:col-span-4 lg:col-start-9 flex flex-col items-start lg:items-end gap-4">
            <Magnetic strength={0.4}>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-4 rounded-full bg-ember pl-6 pr-2 py-2 text-ink font-medium overflow-hidden"
              >
                <span className="absolute inset-0 bg-bone translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative text-sm uppercase tracking-[0.15em]">Start a project</span>
                <span className="relative grid place-items-center size-10 rounded-full bg-ink text-ember transition-transform duration-500 group-hover:rotate-45">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </span>
              </a>
            </Magnetic>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/50">
              Currently booking · 3 slots open
            </span>
          </div>
        </motion.div>
      </div>

      <div className="relative mt-32 max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-bone/15 pt-8">
        {[
          { k: "120+", v: "Brands shaped" },
          { k: "4.9★", v: "Client rating" },
          { k: "14d", v: "Avg. launch" },
          { k: "100%", v: "In-house team" },
        ].map((s, i) => (
          <motion.div
            key={s.v}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1"
          >
            <span className="display text-5xl lg:text-6xl">{s.k}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/60">
              {s.v}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
