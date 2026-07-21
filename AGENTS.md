# AGENTS.md — the only file you need to read first

Single source of orientation for AI agents on this repo. Everything that used to live in
`HANDOVER.md` and `AGENT_LOG_2026-07-20_features.md` is merged here.

---

## 0. WORKING RULES — read before touching anything

1. **NEVER open a browser / preview / dev server.** No `preview_start`, no Browser pane, no
   `npm run dev`, no screenshots. Verification is done **in code and against build output only**
   (read the source, or `npm run build` and grep `dist/`).
2. **Always use the fewest tokens possible.** Grep for the exact symbol before reading; read
   line ranges, not whole files; never re-read a file you just edited; never dump `dist/`.
   Don't re-explore the tree — this file already tells you where everything is.
3. **Don't re-audit finished work.** SEO, contact backend, access gate, locations are done and
   documented below. Only touch what was asked.
4. **Git:** direct-to-`master` is the default workflow (no feature branches, no merge commits)
   unless the user names a branch/remote. Commit + push only when asked.
5. **Never commit build output.** `dist/` and `node_modules/` are gitignored, as are
   `scratch_*.txt`.

---

## 1. What this is

Static marketing site for **Over Exposure Productions** — production & film servicing company at
Yas Creative Hub, Yas Island, Abu Dhabi, UAE. Structured around the company's **Profile 2026**
deck. Replaces an old Hostinger builder site.

**Stack:** Vite 5 multi-page · vanilla JS · hand-rolled CSS · GSAP + ScrollTrigger + Flip ·
Lenis (desktop only) · sharp (asset pipeline).
No frameworks, no UI kits, no Bootstrap/Tailwind, no Google Fonts (fonts self-hosted `woff2`).
Output is **plain static HTML**, one real file per route — crawlers get full markup.

---

## 2. Commands

```bash
npm install        # deps
npm run harvest    # (first time only) pull old-site media + fonts into /public/media
npm run dev        # dev server :5173  — DO NOT RUN (see rule 1)
npm run build      # prod build -> ./dist   (prebuild = scripts/generate-assets.mjs)
npm run preview    # serve ./dist  — DO NOT RUN (see rule 1)
```

`prebuild` (`scripts/generate-assets.mjs`) derives the logo mark, favicons, OG image and
`-480/-800/-1200.webp` variants for every image in `/public/media` and `/public/images/**`.

---

## 3. Hosting & deploy

- **Live URL:** `https://ox.productionsuae.com` — hardcoded as canonical/sitemap base
  (`site.baseUrl` in `content.js`). Matches live; don't change it.
- **Host:** Hostinger, LiteSpeed, PHP 8.3. hPanel/hcdn.
- **Deploy = git pull + build on the server.** Pushing to `master` *is* the deploy: server pulls,
  runs `npm run build`, serves `dist/` from `public_html`.
- Therefore **`public/` files only go live after a build** (Vite copies `public/**` → `dist/` root
  verbatim, including dotfiles like `.htaccess`). A source change that isn't built won't appear.
- All routes are physical dirs → LiteSpeed serves `index.html`. **Trailing-slash clean URLs**
  (`/services/`) — links *and* canonicals must keep the slash.
- Remotes: `origin` = GitHub `unknown5666/over-exposure-productions` (the real site).
  `testfeatures` = `unknown5666/testfeaturesOverProduction` (feature-preview repo, unrelated
  history; branch `feature/access-whatsapp-locations` lives there).

---

## 4. COMPLETE FILE SCHEMA — what is where

```
AGENTS.md                     ← this file (the map)
README.md                     short public readme
package.json / vite.config.js
index.html                    HOME page markup (14-section deck narrative)
company/index.html            About
services/index.html           Services & Capabilities
portfolio/index.html          Filmography (53 posters + lightbox)
contact/index.html            Contact details + enquiry form + map
privacy/index.html            Privacy Policy (noindex, follow)
locations/index.html          Locations gallery + category filter
locations/<slug>/index.html   6 location detail pages (render partials/location-detail.html)
404.html                      "scene missing" film-slate page

src/
  data/content.js             ★ ALL copy/stats/credits/team/posters/locations — single source of truth
  css/main.css                ★ ALL styles + layout + motion (~3000 lines, one file)
  js/main.js                  motion system, hero reveal, nav, preloader, scroll, initGlobalUI()
  js/portfolio.js             portfolio filters + lightbox (code-split, lazy-imported)
  js/contact.js               contact form validation + fetch POST (code-split)
  partials/head.html          <head>: meta/OG/fonts/preload + inline gate-lock script + critical CSS
  partials/nav.html           header nav + mobile overlay
  partials/footer.html        footer
  partials/chrome.html        access gate overlay, WhatsApp button, cookie banner
  partials/location-detail.html  shared template for every /locations/<slug>/ page
  partials/pic.html           responsive <picture> helper partial

public/                       copied verbatim to dist root
  .htaccess                   deny *.log, etc.
  contact.php                 ★ contact form backend (see §7)
  robots.txt · sitemap.xml    SEO routes list
  googleeaff02fef1aad486.html Google Search Console verification — NEVER delete
  assets/                     favicons, logo-mark.png, wordmark-ar.png, og-default.jpg, fonts/, webmanifest
  images/backgrounds/         section background stills (01-hero… → 13-clients…)
  images/team/                4 leadership photos
  images/posters/             poster-01.jpg → poster-53.jpg
  images/clients/             client campaign imagery
  images/locations/           Abu Dhabi landmark photography + SOURCES.json (attribution)
  media/                      harvested old-site stock stills + hero-reel-720.mp4 / -1080.mp4

scripts/generate-assets.mjs   prebuild asset pipeline (webp variants, favicons, OG)
scripts/harvest-media.mjs     one-off old-site media/font downloader
```

### Task → file lookup

| Task | File |
|------|------|
| Any copy, stat, credit, team bio, poster list, location data | `src/data/content.js` |
| Any styling, layout, animation | `src/css/main.css` |
| Page `<title>`/description/canonical/JSON-LD, routes, Handlebars helpers | `vite.config.js` → `pages` |
| Nav links / mobile overlay / nav CTA | `src/partials/nav.html` |
| Footer links / footer bottom bar | `src/partials/footer.html` |
| Gate, WhatsApp button, cookie banner | `src/partials/chrome.html` (+ `head.html` for the lock script) |
| Global JS behaviour, cookie consent logic | `src/js/main.js` (`initGlobalUI`, `initLocations`) |
| Contact form frontend / backend | `src/js/contact.js` / `public/contact.php` |
| Add a page | `vite.config.js` `pages` + rollup input + new `<dir>/index.html` + `sitemap.xml` + nav/footer |
| Add/replace an image | drop file in `public/images/**`, point `content.js` at it, `npm run build` |

---

## 5. content.js exports (the data model)

- **Base:** `site` (contact, address, geo, baseUrl, phone/phoneDisplay, instagram),
  `services` (feeds the contact form's Project-Type dropdown), `testimonials`, `portfolio`,
  `marquee`, `heroWords`.
- **Deck (verbatim from Profile 2026):** `hero`, `intro` (stats), `execSummary`, `workCategories`,
  `whyAbuDhabi`, `coreServices`, `supplierCaps`, `filmServices`, `productionCredits`
  (Hollywood/Bollywood + GCC), `team` (CEO + 3), `whyOx`, `futureVision`, `clients`,
  `posters` (53).
- **`locations`** — 2 categories (Modern Architecture, Villas) × 6 items; each has intro, body,
  facts, tags and a multi-image `gallery`. `vite.config.js` builds `locationsView`
  (grouped-by-category) from it and emits per-location titles/descriptions/canonicals/
  BreadcrumbList.

---

## 6. Features shipped (don't rebuild these)

**Access gate (code `753`)** — *soft, client-side only, not real security*; it ships to the
browser and is bypassable. Zero content flash: inline blocking script in `head.html` adds
`gate-locked` to `<html>` before paint unless `sessionStorage.ox_gate === 'open'`, plus minimal
critical CSS; overlay markup `#ox-gate` + self-contained inline unlock script in `chrome.html`
(works even if the JS bundle fails) sets `sessionStorage.ox_gate=open`, removes `gate-locked`,
fires `ox:unlocked`. Styles: `#ox-gate`, `.ox-gate__*` in `main.css`. Applies to every page
because the partials are shared.

**WhatsApp button** — `a#ox-wa` in `chrome.html`, fixed bottom-right, z-index `2147482000`,
`https://wa.me/971555565537?text=…` (Khaled, +971 55 556 5537). Float/pulse + "Chat with Khaled"
tooltip in `main.css`; hidden while the gate is locked; respects `prefers-reduced-motion`.

**Cookie consent + Privacy Policy** — banner `#ox-cookie` in `chrome.html`, strictly two options
(**Accept** / **Learn More** → `/privacy/`). Logic in `main.js → initGlobalUI()`: shows once
unless `localStorage.ox_cookie_consent === 'accepted'`, waits for gate unlock. `/privacy/` is
`noindex, follow`.

**Locations showcase** — layout inspired by film.gov.ae/locations. Gallery `/locations/` with
category filter (`initLocations()`), 6 detail pages via `location-detail.html` (full-bleed hero,
two-column body + facts sidebar, masonry-ish gallery). Imagery is real Abu Dhabi landmark
photography (`public/images/locations/`, attribution in `SOURCES.json`); copy is descriptive —
**no venue is asserted as booked or permitted.** Nav, mobile overlay, footer and `sitemap.xml`
all include the routes.

---

## 7. Contact form backend (real, live)

Form in `contact/index.html` posts via `fetch` (`src/js/contact.js`) to
`data-endpoint="/contact.php"`. Handler `public/contact.php`:
- validates; honeypots the hidden `name="company"` field — **keep that field**;
- sends via `mail()` **with `-f info@ox.productionsuae.com` envelope sender** — that `-f` is
  load-bearing: without it Hostinger accepts then silently drops the mail (SPF);
- appends every enquiry to `enquiries.log` **above web root** (PII, never web-served; `.htaccess`
  denies `*.log`) as a lead backup;
- delivers to `info@ox.productionsuae.com`.

If `mail()` ever fully fails → switch to PHPMailer/SMTP (`smtp.hostinger.com:465`, mailbox creds,
password out of git); steps are documented at the bottom of `contact.php`.
(Any older "mailto: fallback" note is superseded.)

---

## 8. SEO — wired, don't re-audit

- On-page complete: per-page `<title>`/description/**canonical** + OG/Twitter + **LocalBusiness
  JSON-LD** (address/geo/hours/phone) + **Service** graph from `coreServices` + **BreadcrumbList**,
  all from `vite.config.js` `pages` + `head.html`. Default `robots: index, follow`; `/404` and
  `/privacy/` are `noindex`.
- `public/robots.txt` (allows all, points to sitemap) and `public/sitemap.xml` (keep `/company/`
  listed — it went missing once; locations + privacy routes added). Bump `lastmod` on changes.
- **Google Search Console:** verified via `public/googleeaff02fef1aad486.html` — leave it forever.
  Unused hook: paste a token into `GOOGLE_VERIFY` in `vite.config.js` for a meta-tag verification.
- Handlebars helpers: `pad2`, `inc`, `webp`, `webpset`, `eq` (in `vite.config.js`).
- To change domain: `baseUrl` in `content.js` + sitemap/robots.
- Current blocker is **not technical** — GSC "Crawled – currently not indexed" is normal for a new
  domain. Fix = backlinks (IG/LinkedIn bio, directories, IMDb) + time. Homepage is text-thin
  (~300 words); expand copy in `content.js` if asked.

---

## 9. Design system

- **Palette:** charcoal-black `#0B0C0E`, cool off-white `#EDEFF2`, steel `#8A9099`. Two accents:
  **signal red `#E5352B`** (REC record-light motif — nav, cursor, dots) and **warm gold `#CBA35B`**
  (deck highlight — section numbers, stats, headings).
- **Type:** self-hosted **Bebas Neue** (display) + **Inter** (body), `woff2`, `font-display: swap`.
- **Buttons:** `.btn` (line + ↗ arrow), `.btn-ghost` (outline), `.btn-solid` (filled),
  `.nav__cta` (nav pill), `.nav-overlay__cta` (mobile). Reuse these — don't invent new classes.
- One `<h1>` per page, semantic landmarks, descriptive `alt`, aria labels on icon links.

---

## 10. Conventions & gotchas

- **Reveal states are gated behind `html.js`.** With JS off everything is visible (no stuck-
  invisible content). `.mask > *` translateY, `.reveal`, `.is-in` only apply when `<html>` has
  class `js`. Reveals use IntersectionObserver. Respect `prefers-reduced-motion`.
- **Mobile vs desktop is `matchMedia('(max-width: 768px)')`**, computed once at module load as
  `isMobile` in `main.js` — NOT hover/pointer (emulators/touch laptops report hover). Mobile
  behaviour lives in `initMobileMotion` and `@media (max-width: 768px)`.
- **Lenis smooth scroll is desktop-only.** Mobile uses native scroll. Custom cursor auto-disables
  on touch.
- **Images:** drop a file, point `content.js` at it, run `npm run build` — sharp regenerates
  `-480/-800/-1200.webp`. Never hand-make variants.
- Preloader sets `sessionStorage.ox_seen` after first visit.
- All deck copy, stats, credits, client names and bios are **verbatim from Profile 2026** —
  invent nothing. Posters are caption-less on purpose (the deck's title list didn't reliably map
  to later posters; no per-poster credit is asserted, to avoid mislabeling).

---

## 11. Verifying changes (no browser, ever)

- Read the source you changed; grep for the class/ID you relied on in `main.css`.
- If a build check is warranted: `npm run build`, then grep `dist/` for the expected markup and
  for leftover `{{` (unresolved Handlebars). That is the accepted proof.
- Never ask the user to check in a browser and never launch one yourself.

---

## 12. Performance backlog (mobile Lighthouse)

Baseline was CLS 0 / TBT 30ms (great) but SI 4.6s / LCP 2.6s / FCP 1.8s (loader-gated).
**Done** (`c8647c8`): fast mobile preloader wipe, hero painted static on mobile, Lenis off mobile.
**Remaining, in priority order:**
1. Inline a `<head>` preloader-clear so the loader doesn't wait on the JS bundle (biggest LCP lever).
2. Inline critical above-the-fold CSS, load the 54KB stylesheet async (FCP lever).
3. Confirm the 23MB `hero-reel-1080.mp4` never loads on mobile; optionally idle-load GSAP/ScrollTrigger.
