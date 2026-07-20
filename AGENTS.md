# AGENTS.md — orientation for AI agents

Read this first. It's the map; **[HANDOVER.md](HANDOVER.md)** has the full detail. Point agents
here to avoid re-exploring the tree.

## What this is
Static marketing site for **Over Exposure Productions** (film/production servicing, Abu Dhabi).
Vite multi-page build → plain static HTML in `dist/`. Vanilla JS + hand-rolled CSS.
**Stack:** Vite 5 · vanilla JS · GSAP + ScrollTrigger · Lenis (desktop only) · sharp (asset pipeline).
No frameworks, no UI kits, no Tailwind, no Google Fonts (fonts self-hosted).

## Commands
```bash
npm run dev        # dev server → http://localhost:5173  (use Browser pane preview, not Bash)
npm run build      # prod build → ./dist  (prebuild runs the asset pipeline: WebP variants, favicons, OG)
npm run preview     # serve ./dist to sanity-check
```

## Where to edit what
| Task | File |
|------|------|
| **All copy / stats / credits / team / poster list** | `src/data/content.js` — single source of truth, rendered to static HTML at build time |
| Per-page `<title>`/description/canonical/JSON-LD, Handlebars helpers, page routing | `vite.config.js` → `pages` |
| Global styles, all layout/motion | `src/css/main.css` (~2900 lines, one file) |
| Motion system, hero reveal, nav, preloader, scroll behaviour | `src/js/main.js` |
| Page-specific JS (code-split, lazy-imported) | `src/js/portfolio.js`, `src/js/contact.js` |
| `<head>` (meta/OG/fonts/preload), shared chrome, nav, footer, `pic` helper | `src/partials/*.html` |
| Images | `/public/images/**` (deck assets) and `/public/media/**` (harvested stock) — see HANDOVER §4 |

## Conventions & gotchas (don't trip on these)
- **`dist/` and `node_modules/` are gitignored.** Never commit build output. `.gitignore` also drops `scratch_*.txt`.
- **Git workflow is direct-to-`master`.** No feature branches, no merge commits by default. Just commit + push when asked. Remote: `origin` (GitHub `unknown5666/over-exposure-productions`).
- **Reveal states are gated behind `html.js`.** With JS off, everything is visible (no stuck-invisible content). CSS hidden states (`.mask > *` translateY, `.reveal`, `.is-in`) only apply when `<html>` has class `js`. Respect `prefers-reduced-motion`.
- **Mobile vs desktop is `matchMedia('(max-width: 768px)')`**, computed once at module load as `isMobile` in `main.js` — NOT hover/pointer (emulators/touch laptops report hover). Mobile-specific behaviour lives in `initMobileMotion` and `@media (max-width: 768px)` CSS.
- **Lenis smooth scroll is desktop-only** (skipped when `isMobile`). Mobile uses native scroll.
- **Trailing-slash clean URLs** (`/services/`) — links + canonicals must keep the slash.
- **Images:** drop a file, point `content.js` at it, run `npm run build` — sharp regenerates `-480/-800/-1200.webp` automatically. Don't hand-make variants.
- **Contact form** is `mailto:` fallback + honeypot (`name="company"` hidden field — keep it). No backend.

## Verifying UI changes
Use the Browser pane preview (`preview_start {name: "dev"}`), not Bash, to run the dev server.
For mobile work: `resize_window mobile` (375×812). Screenshots sometimes stall on the continuous
grain/vignette animation — prefer `read_page` + `javascript_tool` (computed styles) to confirm state.
The preloader sets `sessionStorage.ox_seen` after first visit; clear it to re-test the loader.

## Performance status (mobile Lighthouse)
Baseline was CLS 0 / TBT 30ms (great) but SI 4.6s / LCP 2.6s / FCP 1.8s (loader-gated).
**Done** (commit `c8647c8`): fast mobile preloader wipe, hero painted static on mobile, Lenis off on mobile.
**Remaining backlog, in priority order:**
1. Inline a `<head>` preloader-clear so the loader doesn't wait on the JS bundle (biggest LCP lever).
2. Inline critical above-the-fold CSS, load the 54KB stylesheet async (FCP lever).
3. Confirm the 23MB `hero-reel-1080.mp4` never loads on mobile; optionally idle-load GSAP/ScrollTrigger.
