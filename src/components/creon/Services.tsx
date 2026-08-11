import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";

const services = [
  {
    id: "01",
    name: "Web development",
    blurb: "Fast, cinematic websites built with modern tooling. Custom motion, 3D depth, and conversion-tuned UX — engineered to load on a 4G phone in a café.",
    deliverables: ["Custom design", "Headless / Next.js", "CMS & bookings", "SEO + analytics"],
  },
  {
    id: "02",
    name: "Brand identity",
    blurb: "Logos, type systems, packaging and full brand kits that make small businesses look like the established player on the street.",
    deliverables: ["Logo system", "Brand guidelines", "Print + packaging", "Asset library"],
  },
  {
    id: "03",
    name: "Video editing",
    blurb: "Cinematic short-form for reels, ads, and storefront screens. We cut, colour, and score — turning your phone footage into something that sells.",
    deliverables: ["Reels & TikTok", "Brand films", "Ads", "Colour & sound"],
  },
  {
    id: "04",
    name: "Graphic design",
    blurb: "Menus, posters, signage, lookbooks, and the everyday graphics that quietly raise your perceived price point by 30%.",
    deliverables: ["Print collateral", "Menus & signage", "Lookbooks", "Templates"],
  },
  {
    id: "05",
    name: "Ads & social branding",
    blurb: "End-to-end paid social — Meta, TikTok, Google. Strategy, creative, and weekly optimisation aimed at one number: more customers through the door.",
    deliverables: ["Creative strategy", "Ad production", "Media buying", "Reporting"],
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  return (
    <section id="services" className="bg-ink text-bone px-6 lg:px-10 py-20 lg:py-40">
      <div className="max-w-[1600px] mx-auto">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 mb-4 flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-ember" />
              What we make
            </div>
            <h2 className="display text-5xl lg:text-7xl max-w-3xl">
              Five disciplines.<br />
              <span className="italic">One studio in your corner.</span>
            </h2>
          </div>
          <p className="max-w-sm text-bone/60">
            Everything a modern café, salon, boutique or service business needs to
            look premium online — without juggling four different freelancers.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-bone/15">
          <ul className="lg:col-span-7 divide-y divide-bone/15">
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <li
                  key={s.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group cursor-pointer"
                >
                  <div className="flex items-baseline gap-6 py-8 lg:py-10 transition-all">
                    <span className="font-mono text-xs text-bone/40">{s.id}</span>
                    <h3
                      className={`display text-4xl lg:text-7xl transition-all duration-500 ${
                        isActive ? "text-ember translate-x-3" : "text-bone"
                      }`}
                    >
                      {s.name}
                    </h3>
                    <span
                      className={`ml-auto text-2xl transition-all duration-500 ${
                        isActive ? "rotate-45 text-ember" : "rotate-0 text-bone/40"
                      }`}
                    >
                      +
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 lg:pl-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                          <p className="text-bone/70 leading-relaxed">{s.blurb}</p>
                          <ul className="space-y-1 font-mono text-xs uppercase tracking-widest text-bone/60">
                            {s.deliverables.map((d) => (
                              <li key={d} className="flex items-center gap-2">
                                <span className="size-1 bg-ember rounded-full" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex lg:col-span-4 lg:col-start-9 sticky top-32 self-start flex-col gap-6 pt-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50">
              Engagement model
            </div>
            <p className="display text-3xl leading-tight">
              One-off projects or monthly retainers — scoped to your business, not a price list.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-6 border-t border-bone/15">
              <div>
                <div className="display text-4xl">14d</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-bone/50 mt-1">
                  Typical launch
                </div>
              </div>
              <div>
                <div className="display text-4xl">1:1</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-bone/50 mt-1">
                  Founder access
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

