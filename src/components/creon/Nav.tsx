import { useState, useEffect } from "react";
import { LiveClock } from "./LiveClock";
import logoUrl from "@/assets/anweo-logo.png";
const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-ink/70 border-b border-bone/10"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-10 py-5">
        <a href="#top" aria-label="Anweo Home" className="flex items-center gap-3 group">
          <span className="grid place-items-center size-9 rounded-md bg-ember overflow-hidden transition-transform group-hover:scale-105">
            <img src={logoUrl} alt="Anweo" className="size-7 object-contain" />
          </span>
          <span className="font-display text-2xl tracking-tight">Anweo<span className="text-ember">.</span></span>
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40 ml-2">
            Beyond the builds
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-bone/80 hover:text-bone link-underline transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <LiveClock tz="Asia/Kolkata" label="IND" />
          </div>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full border border-bone/30 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-ember hover:text-ember transition-colors"
          >
            <span className="size-1.5 rounded-full bg-ember animate-pulse" />
            Book a call
          </a>
        </div>
      </div>
    </header>
  );
}
