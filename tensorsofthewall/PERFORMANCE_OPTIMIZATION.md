# Performance optimization log

Goal: lighter homepage (mobile Lighthouse) without changing the look of the site.

## Method

- Production build (`pnpm build`) served with `pnpm start` on localhost.
- Lighthouse 12, mobile preset, default simulated throttling, performance category only.
- 3 runs per stage, **median** reported. Headless Chrome 155, Node 20.20, pnpm 10.
- Local server, so absolute numbers differ from GitHub Pages/CDN. Compare stages, not absolutes.
- Notion data came from the real database (`.env.local`, not committed).

Baseline build: success, Next.js 16.2.4 (Turbopack). Turbopack does not print per-route
bundle sizes, so JS transfer is taken from Lighthouse's network log instead.

## Results

| Metric (median of 3)        | Baseline | After NN rewrite | After hero/prefetch/logo | Final (Next 16.4.0) |
| --------------------------- | -------: | ---------------: | -----------------------: | ------------------: |
| Performance score           |       55 |               74 |                       73 |              **97** |
| FCP                         |  1565 ms |           758 ms |                   765 ms |              762 ms |
| LCP                         |  8032 ms |          7806 ms |                  7065 ms |         **1815 ms** |
| TBT                         |   836 ms |           177 ms |                   189 ms |          **169 ms** |
| CLS                         |    0.001 |            0.001 |                    0.000 |               0.001 |
| Speed Index                 |  2488 ms |          1186 ms |                  1232 ms |             1049 ms |
| JS execution time (bootup)  |  3405 ms |           957 ms |                   731 ms |          **689 ms** |
| Main-thread work            |  6075 ms |          4244 ms |                  3181 ms |         **2772 ms** |
| Unused JS (est. savings)    |  741 KiB |          700 KiB |                  104 KiB |             102 KiB |
| Render-blocking (est.)      |   906 ms |           120 ms |                   115 ms |              112 ms |
| JS transferred              |  985 KiB |          891 KiB |                  255 KiB |         **240 KiB** |

Final-stage runs scored 96 / 97 / 97. Intermediate experiments scored up to 100; TBT varies
between about 60 and 190 ms from run to run, so treat the final number as 96-100.

### What each change was worth

1. **Neural-network rewrite (CSS instead of per-element Motion)**: biggest CPU win.
   TBT 836 -> 177 ms, JS execution 3.4 s -> 0.96 s, score 55 -> 74.
2. **Self-hosted Orbitron / removing the Google Fonts `@import`**: render-blocking
   906 -> ~120 ms. No requests to `fonts.googleapis.com` or `fonts.gstatic.com` remain.
3. **Prefetch + AntD scoping**: the homepage was prefetching `/blog`, `/skills` and
   `/projects_publications`, which pulled a 367 KiB (1.2 MB raw) AntD + Motion chunk.
   The header also prefetched the CV PDF through `<Link>` (85 KiB). JS transferred 891 -> 255 KiB.
4. **`page-enter` animation starting at `opacity: 0`**: this was the LCP problem.
   Lighthouse's simulated LCP stayed at ~7 s because the hero text was fully transparent
   until the animation ended. Starting at `opacity: 0.01` is visually the same and moved
   LCP 7.1 s -> 1.8 s (score 73 -> 97+). Observed (unthrottled) LCP was only 0.36 s, so
   this was largely a Lighthouse-simulation effect, but it is what the score measures.
5. **Header logo**: 212 KiB `tensorsofthewall.webp` -> 2.2 KiB 96x96 webp for the header
   (the original asset is untouched).
6. **Next.js 16.2.4 -> 16.4.0**: no code changes needed; within noise on performance.

Things that did **not** measurably help on their own: the Next upgrade, removing the unused
`react-responsive` / `prismjs` dependencies (not in any bundle), the typing-animation idle start.
They are still correct cleanups.

## Remaining Lighthouse findings (final run)

- Main-thread work 2.6 s (score 0) - mostly React/Next runtime, hydration, style/layout.
- Unused JavaScript ~102 KiB - framework chunks shared with the other routes.
- Render-blocking resources ~110 ms - the single global CSS file (23 KiB).
- Legacy JavaScript ~14 KiB - not pursued (low priority per the brief).
- Layout shifts: 8 tiny shifts, total CLS 0.001.

## Visual / behavioral compromises

- Body text is now Geist (was effectively Arial because `globals.css` overrode it). Slightly
  different glyph shapes in body text. Orbitron is used for the logo text only.
- Header slide-in uses a CSS cubic-bezier overshoot instead of Motion's spring physics.
- Neural network: the 45 ms layer-by-layer activation chain is replaced by a single state
  update every 15 s with per-layer `animation-delay` (0.45 s per layer, same as before).
  Reduced-motion users get a static highlighted state.
- Easter-egg text uses CSS opacity transitions (same 1.5 s ease-in-out).
- The "New!" badge logic (expired 2025-08-15) was removed.
- Links to `/skills`, `/experience`, `/projects_publications`, `/blog` and `/not-found` no
  longer prefetch, so the first click on those can be slightly slower.
- `/experience` logs `<path d="undefined">` console errors. Pre-existing (`ExperienceClient.tsx`
  was only moved), not fixed here.

## Pre-existing issue worth knowing about

`next.config.ts` declared `output: 'export'` and `images.unoptimized`, but a later
`module.exports = {...}` overwrote that object, so **neither ever took effect**. The site has
been built as a normal server build (dynamic `/blog/[pageId]`, `proxy.ts` rewrites), not a static
export, despite the README. The config was merged into one typed export **preserving the
effective behavior** (no `output: 'export'`). Enabling real export would need `proxy.ts` replaced
and `/blog/[pageId]` made fully static; that was out of scope.

## Further optimizations worth considering

- Code-split / lazy-load Motion on the routes that use it (`experience`, `industry-exp`,
  `research-exp`, `skills`).
- Replace the typing animation's per-character React state with a CSS/`requestAnimationFrame` approach.
- Fix the `/experience` SVG path errors.
- Decide whether the site should really be a static export (see above).
