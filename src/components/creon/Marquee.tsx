import { useEffect, useRef } from "react";
import { useScroll, useSpring, useTransform, useVelocity, useMotionValue, useAnimationFrame } from "motion/react";

const items = [
  "Brand identity",
  "Web development",
  "Video editing",
  "Graphic design",
  "Ad creatives",
  "Social branding",
  "Motion",
  "Launch comms",
];

export function Marquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  const trackRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1);
  const halfWidthRef = useRef(0);

  // Cache scrollWidth on mount to avoid per-frame layout reflow
  useEffect(() => {
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

  useEffect(() => () => baseX.set(0), [baseX]);

  const loop = [...items, ...items, ...items, ...items];
  return (
    <section className="border-y border-bone/10 py-6 overflow-hidden bg-plum/60">
      <div ref={trackRef} className="flex gap-16 w-max will-change-transform">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-12 shrink-0">
            <span className="display italic text-5xl lg:text-7xl text-bone/90">{item}</span>
            <span aria-hidden className="text-ember text-4xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

