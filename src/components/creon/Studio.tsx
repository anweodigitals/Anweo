import { Reveal } from "./Reveal";



export function Studio() {
  return (
    <section id="studio" className="bg-plum/70 px-6 lg:px-10 py-20 lg:py-40 border-y border-bone/10">
      <div className="max-w-[1600px] mx-auto">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 mb-4 flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-ember" />
              The studio
            </div>
            <h2 className="display text-5xl lg:text-7xl">
              A small team.<br />
              <span className="italic">Obsessed</span> with your storefront.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-bone/70 leading-relaxed self-end">
            Anweo is a focused crew of designers, developers and editors who came
            up working with restaurants, salons, and boutique retailers — not
            faceless SaaS companies. We speak your language.
          </p>
        </Reveal>


      </div>
    </section>
  );
}
