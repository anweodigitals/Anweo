## Opaque Pressings — landing page

A brutalist, ink-black landing page for a fictional indie record label. Acid-green (#C7FF00) accent, cream "bone" secondary, Fraunces italic display + Space Grotesk sans. Already generated the four album-art images and installed the fonts — just need build mode to commit the code.

### What gets built

**`src/styles.css`** — replace the default shadcn tokens with the label's design system:
- Tokens: `--ink #0D0D0D`, `--bone #E8E8E1`, `--acid #C7FF00`
- Map to Tailwind via `@theme inline` so `bg-ink`, `text-acid`, `font-serif`, etc. work
- Body defaults to ink background + Space Grotesk
- Keyframes for the acid marquee scroll and a fade-up entrance

**`src/routes/index.tsx`** — replace the placeholder with the landing page:
- Nav: wordmark + Catalog / Artists / Cart links
- Hero: 12-col split — giant Fraunces italic "Sound Unbound." with acid accent on the right word, intro copy underneath; right column shows the OP-042 cover with a rotated acid "New Release" badge
- Acid marquee strip: "Analog Mastery · Limited Run · 180g Heavyweight · Hand-Numbered · Found Sound" looping
- "Recent Cuts" catalog: 3-up grid of releases (OP-041, OP-040, OP-039) with cover, title, artist, genre; hover scales the cover
- Bone-colored footer: oversized italic manifesto + Join the Club / Our Process buttons + city list + social pills
- SEO `head()` with title, description, og:title/description, og:image set to the OP-042 cover

### Assets (already generated)
- `src/assets/op-042.jpg` — hero cover, abstract black shapes on cream
- `src/assets/op-041.jpg` — vinyl groove macro
- `src/assets/op-040.jpg` — minimalist cream sleeve
- `src/assets/op-039.jpg` — black + acid yellow abstract painting

### Fonts (already installed)
`@fontsource/space-grotesk` and `@fontsource/fraunces`, imported at the top of `index.tsx` (300/700 sans, 900-italic display).

### Notes
- No Lovable Cloud, no auth, no DB — pure marketing page
- Composition matches the chosen prototype exactly (hero split, marquee, 3-card catalog, manifesto footer)
- Switch to build mode and I'll commit the two files.
