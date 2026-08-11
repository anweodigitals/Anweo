import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Lenis } from "../_libs/lenis.mjs";
import { u as useScroll, a as useSpring, m as motion, b as useMotionValue, c as useTransform } from "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function LiveClock({ tz = "Europe/Berlin", label = "BER" }) {
  const [time, setTime] = reactExports.useState("");
  reactExports.useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: tz
      }).format(/* @__PURE__ */ new Date());
      setTime(t);
    };
    update();
    const id = setInterval(update, 1e3);
    return () => clearInterval(id);
  }, [tz]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs tracking-widest text-bone/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-bone", children: label }),
    " ",
    time || "--:--:--"
  ] });
}
const logoUrl = "/assets/anweo-logo-DhHIoT8-.png";
const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" }
];
function Nav() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-ink/70 border-b border-bone/10" : "bg-transparent"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 lg:px-10 py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", "aria-label": "Anweo Home", className: "flex items-center gap-3 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center size-9 rounded-md bg-ember overflow-hidden transition-transform group-hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "Anweo", className: "size-7 object-contain" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl tracking-tight", children: [
            "Anweo",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-ember", children: "." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40 ml-2", children: "Beyond the builds" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-10", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: l.href,
            className: "text-sm text-bone/80 hover:text-bone link-underline transition-colors",
            children: l.label
          },
          l.href
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveClock, { tz: "Asia/Kolkata", label: "IND" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "#contact",
              className: "group relative inline-flex items-center gap-2 rounded-full border border-bone/30 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-ember hover:text-ember transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-ember animate-pulse" }),
                "Book a call"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function Magnetic({ children, className = "", strength = 0.35 }) {
  const ref = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const innerX = useTransform(sx, (v) => v * 0.5);
  const innerY = useTransform(sy, (v) => v * 0.5);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      onMouseMove: handleMove,
      onMouseLeave: reset,
      style: { x: sx, y: sy },
      className,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { x: innerX, y: innerY }, children })
    }
  );
}
const HeroScene = reactExports.lazy(() => import("./HeroScene-CLDtwPIj.mjs").then((m) => ({ default: m.HeroScene })));
const lines = [
  { text: "Digital craft", italic: false, accent: false },
  { text: "for brands that", italic: true, accent: false },
  { text: "deserve more.", italic: false, accent: true }
];
function Hero() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "top",
      ref,
      className: "relative pt-40 lg:pt-48 pb-24 px-6 lg:px-10 overflow-hidden min-h-[100svh]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            style: { y: bgY, scale: bgScale, opacity: bgOpacity },
            className: "absolute inset-0 will-change-transform",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroScene, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink pointer-events-none" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-[1600px] mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              className: "flex items-center gap-3 mb-12 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { scaleX: 0 },
                    animate: { scaleX: 1 },
                    transition: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                    style: { transformOrigin: "left" },
                    className: "block w-12 h-px bg-bone/40"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Anweo — Beyond the builds" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              style: { y: headingY, opacity: headingOpacity },
              className: "display text-[clamp(3rem,11vw,11rem)] [text-shadow:0_2px_40px_rgba(0,0,0,0.4)] will-change-[transform,opacity]",
              children: lines.map((line, li) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  className: `block ${line.italic ? "italic" : ""}`,
                  initial: "hidden",
                  animate: "visible",
                  transition: { staggerChildren: 0.025, delayChildren: li * 0.12 },
                  children: line.text.split(" ").map((word, wi) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block overflow-hidden align-baseline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.span,
                    {
                      className: "inline-block",
                      variants: {
                        hidden: { y: "110%", opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
                        }
                      },
                      children: [
                        line.accent && wi === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-ember", children: word }) : word,
                        wi < line.text.split(" ").length - 1 && " "
                      ]
                    }
                  ) }, wi))
                }
              ) }, li))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] },
              className: "mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lg:col-span-5 text-lg lg:text-xl text-bone/80 max-w-xl leading-relaxed", children: "Anweo is a boutique digital studio building luxury brand identities, cinematic websites, and growth-ready content for cafés, salons, boutiques, and modern service businesses." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 lg:col-start-9 flex flex-col items-start lg:items-end gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { strength: 0.4, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: "#contact",
                      className: "group relative inline-flex items-center gap-4 rounded-full bg-ember pl-6 pr-2 py-2 text-ink font-medium overflow-hidden",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-bone translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative text-sm uppercase tracking-[0.15em]", children: "Start a project" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative grid place-items-center size-10 rounded-full bg-ink text-ember transition-transform duration-500 group-hover:rotate-45", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 12L12 2M12 2H4M12 2V10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "square" }) }) })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.25em] text-bone/50", children: "Currently booking · 3 slots open" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-32 max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-bone/15 pt-8", children: [
          { k: "120+", v: "Brands shaped" },
          { k: "4.9★", v: "Client rating" },
          { k: "14d", v: "Avg. launch" },
          { k: "100%", v: "In-house team" }
        ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-60px" },
            transition: { duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
            className: "flex flex-col gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "display text-5xl lg:text-6xl", children: s.k }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.25em] text-bone/60", children: s.v })
            ]
          },
          s.v
        )) })
      ]
    }
  );
}
function SmoothScroll() {
  reactExports.useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4
    });
    const onClick = (e) => {
      const target = e.target;
      const link = target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -20, duration: 1.4 });
    };
    document.addEventListener("click", onClick);
    let raf = 0;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
  return null;
}
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.25
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      style: { scaleX, transformOrigin: "0% 50%" },
      className: "fixed top-0 left-0 right-0 h-px bg-ember z-[60] origin-left"
    }
  );
}
function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 32, mass: 0.4 });
  const [hover, setHover] = reactExports.useState(false);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      "aria-hidden": true,
      style: { x: sx, y: sy, opacity: visible ? 1 : 0 },
      className: "pointer-events-none fixed top-0 left-0 z-[200] hidden md:block will-change-transform",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          animate: {
            width: hover ? 56 : 14,
            height: hover ? 56 : 14,
            backgroundColor: hover ? "rgba(255,91,35,0.18)" : "rgba(237,231,221,0)",
            borderColor: hover ? "rgba(255,91,35,0.9)" : "rgba(237,231,221,0.6)"
          },
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          className: "-translate-x-1/2 -translate-y-1/2 rounded-full border"
        }
      )
    }
  );
}
const Marquee = reactExports.lazy(() => import("./Marquee-CmSdtnNk.mjs").then((m) => ({
  default: m.Marquee
})));
const Services = reactExports.lazy(() => import("./Services-PBTRlAV1.mjs").then((m) => ({
  default: m.Services
})));
const Process = reactExports.lazy(() => import("./Process-DpYAN8UD.mjs").then((m) => ({
  default: m.Process
})));
const Studio = reactExports.lazy(() => import("./Studio-C9Cc2_hD.mjs").then((m) => ({
  default: m.Studio
})));
const Footer = reactExports.lazy(() => import("./Footer-CO6K2kNp.mjs").then((m) => ({
  default: m.Footer
})));
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "noise bg-ink text-bone min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SmoothScroll, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Cursor, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[100vh]" }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Marquee, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Services, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Process, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Studio, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] })
  ] });
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: Index
}, Symbol.toStringTag, { value: "Module" }));
export {
  LiveClock as L,
  Magnetic as M,
  index as i
};
