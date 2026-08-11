import { createFileRoute } from "@tanstack/react-router";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/jetbrains-mono/400.css";

import { lazy, Suspense } from "react";
import { Nav } from "@/components/creon/Nav";
import { Hero } from "@/components/creon/Hero";
import { SmoothScroll } from "@/components/creon/SmoothScroll";
import { ScrollProgress } from "@/components/creon/ScrollProgress";
import { Cursor } from "@/components/creon/Cursor";

const Marquee = lazy(() => import("@/components/creon/Marquee").then(m => ({ default: m.Marquee })));
const Services = lazy(() => import("@/components/creon/Services").then(m => ({ default: m.Services })));
const Process = lazy(() => import("@/components/creon/Process").then(m => ({ default: m.Process })));
const Studio = lazy(() => import("@/components/creon/Studio").then(m => ({ default: m.Studio })));
const Footer = lazy(() => import("@/components/creon/Footer").then(m => ({ default: m.Footer })));
import cafe from "@/assets/case-cafe.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Anweo — Luxury Digital Studio for Modern Brands" },
      {
        name: "description",
        content:
          "Anweo is a boutique digital studio crafting luxury brand identities, cinematic websites and growth-ready content for cafés, salons, boutiques and modern service businesses.",
      },
      { property: "og:title", content: "Anweo — Luxury Digital Studio" },
      {
        property: "og:description",
        content:
          "Brand identity, web development, video, graphic design and social — under one premium roof.",
      },
      { property: "og:image", content: cafe },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: cafe },
    ],
  }),
});

function Index() {
  return (
    <main className="noise bg-ink text-bone min-h-screen">
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <Hero />
      <Suspense fallback={<div className="min-h-[100vh]" />}>
        <Marquee />
        <Services />
        <Process />
        <Studio />
        <Footer />
      </Suspense>
    </main>
  );
}
