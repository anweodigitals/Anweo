import { useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { Reveal } from "./Reveal";
import cafe from "@/assets/case-cafe.jpg";
import salon from "@/assets/case-salon.jpg";
import boutique from "@/assets/case-boutique.jpg";
import beauty from "@/assets/case-beauty.jpg";

interface Case {
  index: string;
  client: string;
  title: string;
  tags: string[];
  metric: string;
  img: string;
  alt: string;
  span: "tall" | "wide";
}

const cases: Case[] = [
  {
    index: "01",
    client: "Maison Brûlé — Specialty Café",
    title: "A café rebrand that doubled the morning rush.",
    tags: ["Brand identity", "Website", "Social"],
    metric: "+212% online orders",
    img: cafe,
    alt: "Barista pouring latte art under warm tungsten light",
    span: "tall",
  },
  {
    index: "02",
    client: "Atelier Noir — Hair Studio",
    title: "A booking site that books out three weeks ahead.",
    tags: ["Web dev", "Photography", "Ads"],
    metric: "3.2× monthly bookings",
    img: salon,
    alt: "Luxury hair salon with marble counter and brass pendant lights",
    span: "wide",
  },
  {
    index: "03",
    client: "Verde Boutique",
    title: "A storefront that finally matched the shop window.",
    tags: ["E-commerce", "Brand kit", "Reels"],
    metric: "+184% revenue / qtr",
    img: boutique,
    alt: "Luxury boutique storefront glowing at dusk on cobblestone street",
    span: "tall",
  },
  {
    index: "04",
    client: "Lilac & Gold — Beauty Parlour",
    title: "A digital ritual that feels like the treatment.",
    tags: ["Identity", "Video", "Web"],
    metric: "4.9★ across 600+ reviews",
    img: beauty,
    alt: "Pink marble beauty treatment room with orchid and gold fixtures",
    span: "wide",
  },
];

function CaseCard({ c }: { c: Case }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const cursorBg = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}% ${y}%, rgba(255,91,35,0.55), transparent 60%)`,
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 6);
    rx.set(-py * 6);
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.a
      href="#work"
      className={`group block ${c.span === "tall" ? "lg:row-span-2" : ""}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
        className="relative overflow-hidden bg-plum"
      >
        <div className={`relative ${c.span === "tall" ? "aspect-[4/5]" : "aspect-[16/10]"} overflow-hidden`}>
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease: [0.7, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <motion.img
              src={c.img}
              alt={c.alt}
              loading="lazy"
              decoding="async"
              style={{ y: imgY }}
              className="absolute inset-0 size-full object-cover scale-110 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.18]"
            />
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-soft-light"
            style={{ background: cursorBg }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

          <div className="absolute top-5 left-5 right-5 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-bone/80">
            <span>Case / {c.index}</span>
            <span className="px-2 py-1 rounded-full border border-bone/30 backdrop-blur-md">
              {c.metric}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="flex flex-wrap items-center gap-2 mb-3 transition-transform duration-700 group-hover:-translate-y-1">
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-widest text-bone/70 border border-bone/20 rounded-full px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember mb-1">
              {c.client}
            </div>
            <h3 className="display text-3xl lg:text-4xl text-bone max-w-md transition-transform duration-700 group-hover:-translate-y-1">
              {c.title}
            </h3>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="px-6 lg:px-10 py-20 lg:py-40">
      <div className="max-w-[1600px] mx-auto">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 mb-4 flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-ember animate-pulse" />
              Selected work
            </div>
            <h2 className="display text-5xl lg:text-7xl max-w-3xl">
              Local brands, <span className="italic text-ember">world-class</span> presence.
            </h2>
          </div>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-widest link-underline"
          >
            See full index →
          </a>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {cases.map((c) => (
            <CaseCard key={c.index} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
