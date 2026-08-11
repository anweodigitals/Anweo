import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { LiveClock } from "./LiveClock";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [120, -40]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.2]);

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative px-6 lg:px-10 pt-20 lg:pt-28 pb-10 overflow-hidden"
    >
      <motion.div
        aria-hidden
        style={{ scale: glowScale, background: "var(--ember)" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 size-[900px] rounded-full opacity-[0.18] blur-[160px]"
      />

      <div className="relative max-w-[1600px] mx-auto">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 mb-6 flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-ember animate-pulse" />
            Now booking — 3 slots open
          </div>
          <h2 className="display text-[clamp(2.5rem,9vw,9rem)] leading-tight">
            Let's make your<br />
            brand <span className="italic text-ember">unforgettable.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Magnetic strength={0.25}>
              <a
                href="mailto:hello@anweo.studio"
                className="group inline-flex items-center gap-4 text-2xl lg:text-3xl font-display border-b border-bone/20 pb-3 hover:border-ember transition-colors"
              >
                <span className="size-3 rounded-full bg-ember shadow-[0_0_20px_var(--ember)]" />
                hello@anweo.studio
                <span className="transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">↗</span>
              </a>
            </Magnetic>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs uppercase tracking-widest text-bone/60">
              <a href="#" aria-label="Instagram" className="link-underline">Instagram</a>
              <a href="#" aria-label="Behance" className="link-underline">Behance</a>
              <a href="#" aria-label="Dribbble" className="link-underline">Dribbble</a>
              <a href="#" aria-label="LinkedIn" className="link-underline">LinkedIn</a>
              <a href="#" aria-label="WhatsApp" className="link-underline">WhatsApp</a>
              <a href="#" aria-label="Newsletter" className="link-underline">Newsletter</a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 space-y-6">
            {[
              { city: "Studio", addr: "India · Available worldwide", tz: "Asia/Kolkata", code: "IND" },
            ].map((o) => (
              <div key={o.city} className="flex items-baseline justify-between border-b border-bone/10 pb-4">
                <div>
                  <div className="font-medium">{o.city}</div>
                  <div className="text-xs text-bone/50 mt-1">{o.addr}</div>
                </div>
                <LiveClock tz={o.tz} label={o.code} />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          style={{ y: wordmarkY, scale: wordmarkScale }}
          className="mt-28 select-none will-change-transform"
        >
          <div className="display text-[20vw] leading-none tracking-tighter text-bone/95">
            ANWEO
          </div>
        </motion.div>

        <div className="mt-10 pt-6 border-t border-bone/10 flex flex-wrap justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
          <span>© 2026 Anweo — Beyond the builds</span>
          <span>Built in-house · every pixel</span>
          <span>v 2026.01</span>
        </div>
      </div>
    </footer>
  );
}
