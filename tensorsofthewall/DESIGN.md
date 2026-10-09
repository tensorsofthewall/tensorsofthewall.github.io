# Visual redesign notes

How the portfolio's pages are put together after the staged redesign (Projects & Publications,
Blog, Skills, Education, Experience restyle, shared primitives, cross-links). The goal was to
keep the site's personality, dark theme, URLs and performance while replacing generic AntD
layouts with a small custom design language.

## Principles

1. Content is understandable before clicking. Interaction reveals depth, not basics.
2. No carousels for small collections, no cards that resize or move when clicked.
3. Humor stays in the copy; the layout stays quiet. No decorative gradients or glows.
4. One restrained palette: the accent colour is used for links, active states, key numbers and
   small borders only.
5. Motion is optional: everything respects `prefers-reduced-motion`.
6. No functional information is hidden behind hover (no blur-to-reveal instructions).

## Tokens

Defined as RGB-channel CSS variables in `app/globals.css` and exposed to Tailwind in
`tailwind.config.ts` (so opacity modifiers such as `border-accent/60` work). The article prose
styles in `styles/post.module.css` read the same variables.

| Token | Use |
| --- | --- |
| `background` / `foreground` | page background (#0a0a0a) and primary text (#ededed) |
| `surface` / `surface-hover` | cards and their hover state |
| `line` | borders and dividers |
| `body` / `secondary` / `muted` | text tones, from strongest to quietest |
| `accent` | the site cyan (#37accd) |
| `highlight` | author highlight (warm gold) |

## Shared primitives (`components/ui/`)

| Component | Purpose |
| --- | --- |
| `PageContainer` | 1100px max width, 16px mobile to 40px desktop gutters |
| `PageHeader` | title, personality subtitle, optional helper line. Renders a `div`: the global CSS sets every `<header>` to 600px tall |
| `SectionHeading` | muted uppercase section label (`md` for sections, `sm` inside cards) |
| `Surface` / `surfaceClass()` | the card surface; `interactive` adds the shared hover language |
| `TagList` | outline / quiet / strong / inline tag and chip variants |
| `MetaRow` | "date · read time" style lines |
| `ExternalAction` | outbound button (new tab, announces "opens in a new tab") |
| `RelatedLinks` | the quiet "Related work → A → B" row |
| `Divider` | hairline rule |

Interactive surfaces share one hover language: 2px lift, brighter border, slightly lighter
background, and the same border highlight when a child has keyboard focus. Large scale
transforms are avoided. Whole-card links use a stretched `::after` on the title link, so cards
stay a single keyboard stop.

## Pages

- **Projects & Publications** (`app/projects_publications`): Featured Work, Selected Projects
  (2-column grid), Publications (academic list). Any publication or project can be featured
  with `"featured": true` in `resume_json.json` (optional `featuredOrder`, `highlight`, `links`).
- **Blog** (`app/blog`): index = latest article + archive grid. Article = 720px reading column,
  wider figures (up to 900px), sticky table of contents (3+ sections, desktop), reading
  progress bar, heading anchors, newer/older links. Notion heading levels are normalised by
  `lib/headings.ts` so the shallowest level used becomes `h2`. Tags double as categories if
  filtering is added later.
- **Skills** (`app/skills`): decorative CSS-only toolbox wheel (static badge grid for reduced
  motion), four capability cards with a headline result each, and the supporting tools grouped
  by category. Data: `skills.capabilities`, `skills.toolbox`.
- **Education** (`app/education`): two always-visible timeline entries with the thesis block,
  roles and coursework. Data: `education[].thesis`, `education[].positionLinks`.
- **Experience** (`app/(antd)/experience`): restyled to the shared language; the S-shaped
  timeline geometry is unchanged. Stops are keyboard-accessible buttons and open with all
  details visible. `/experience#<id>` opens and scrolls to a stop.

## Cross-links

`lib/related.ts` is the single registry of real relationships (experience, projects,
publications, education). An item shows a "Related work" row only if it has an entry there.
Experience entries and publications carry an `id` in `resume_json.json` for anchors.

## Data changes in `public/data/resume_json.json`

- Projects: `summary`, `tags`.
- Publications: `id`, `year`, `venue`, `tldr`, `tags`, `links`, optional `featured`, `highlight`.
- Skills: `toolbox`, `capabilities` (existing arrays unchanged, still used for SEO keywords).
- Education: `thesis`, `positionLinks`.
- Experience entries: `id`.

## Performance (Lighthouse, mobile, median of 3, local production build)

Compared against the commit before the redesign (`5d41c75`), same machine and method as
`PERFORMANCE_OPTIMIZATION.md`.

| Page | Score before -> after | LCP before -> after | TBT before -> after | CLS before -> after | Transfer before -> after |
| --- | --- | --- | --- | --- | --- |
| `/` (untouched) | 97 -> 99 | 1.82 s -> 1.97 s | 94 -> 75 ms | 0.002 -> 0.002 | 313 -> 218 KB |
| `/projects_publications` | 96 -> 96 | 2.58 s -> 2.76 s | 84 -> 40 ms | 0.031 -> 0.000 | 386 -> 364 KB |
| `/blog` | 92 -> 95 | 3.22 s -> 2.97 s | 98 -> 58 ms | 0.038 -> 0.000 | 413 -> 313 KB |
| `/skills` | 92 -> 99 | 2.80 s -> 2.12 s | 204 -> 41 ms | 0.000 -> 0.000 | 405 -> 255 KB |
| `/education` | 97 -> 99 | 2.58 s -> 1.97 s | 58 -> 76 ms | 0.037 -> 0.000 | 335 -> 298 KB |
| `/experience` | 63 -> 96 | 4.68 s -> 2.74 s | 112 -> 40 ms | 0.424 -> 0.000 | 628 -> 346 KB |

The homepage was not changed; its run-to-run noise is about +/-2 points and +/-200 ms LCP.

`/experience` started as the weakest page. Three changes took it from 63 to 96: its heading is
server-rendered; the timeline starts hidden, snaps to its measured geometry without animation
and is then revealed (this removed the layout shift, which was the largest penalty); and the
raster org logos have WebP copies at 2x display size (~290 KB -> ~45 KB). The original PNG/JPG/SVG
files are kept in `public/images/org_logos/`; `resume_json.json` points at the `.webp` copies
(Ignitarium's PNG is already tiny and is unchanged). Lighthouse's simulated LCP for this page is
still higher than the measured LCP (~0.1 s), a known simulation artifact.

## Known limitations

- A ~20px page-level horizontal overflow at 390px comes from the global site header's entrance
  animation (not from page content).
- Legacy `/research-exp` and `/industry-exp` routes still use the old AntD cards (they are
  proxied, not linked from the navigation).
- The homepage hero caption still uses blur-to-reveal (left untouched on purpose).
- Giscus comments follow the browser colour scheme.
- Notion images carry no intrinsic dimensions, so article images use a 900x600 hint and
  `height: auto`; a small layout shift on load is possible.
