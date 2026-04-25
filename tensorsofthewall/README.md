# tensorsofthewall.github.io

Personal portfolio and blog — built with Next.js 16, React 19, and Tailwind CSS. Content is sourced from Notion via the Notion API and rendered server-side. Deployed as a static export to GitHub Pages.

## Stack

- **Framework**: Next.js 16 (App Router, static export, Turbopack)
- **Styling**: Tailwind CSS, Ant Design
- **Content**: Notion API (`@notionhq/client`) — blog posts, projects, experience, education, skills
- **Math rendering**: KaTeX
- **Animations**: Motion (Framer Motion)
- **Comments**: Giscus

## Prerequisites

- [devenv](https://devenv.sh) (manages Node.js 20 + pnpm via Nix)

## Getting Started

```bash
# Enter the dev environment (from the nix_config directory)
cd ../nix_config && devenv shell

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Fill in NOTION_TOKEN and NOTION_DATABASE_ID

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NOTION_TOKEN` | Notion integration secret |
| `NOTION_DATABASE_ID` | ID of the Notion database used for blog posts |

## Project Structure

```
app/
  blog/               # Blog listing and post pages (Notion-sourced)
  education/          # Education page
  experience/         # Work experience page
  hero/               # Landing/hero section
  industry-exp/       # Industry experience page
  projects_publications/ # Projects and publications page
  research-exp/       # Research experience page
  skills/             # Skills page
components/
  notion/             # Notion block renderer and rich-text component
  header.tsx          # Site-wide navigation header
public/               # Static assets
nix_config/           # devenv Nix configuration (../nix_config)
```

## Scripts

```bash
pnpm dev      # Dev server with Turbopack + Node inspector
pnpm build    # Static export to /out
pnpm start    # Serve the production build locally
pnpm lint     # ESLint
```

## Deployment

The site builds as a fully static export (`output: 'export'`). Push to `main` and GitHub Pages serves the `/out` directory.
