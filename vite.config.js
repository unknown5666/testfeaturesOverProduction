import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import {
  site,
  services,
  categories,
  portfolio,
  testimonials,
  marquee,
  heroWords,
  hero,
  intro,
  execSummary,
  workCategories,
  whyAbuDhabi,
  coreServices,
  supplierCaps,
  filmServices,
  productionCredits,
  team,
  whyOx,
  futureVision,
  clients,
  posters,
  locations,
} from './src/data/content.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = site.baseUrl;
const OG = `${BASE}/assets/og-default.jpg`;
// Google Search Console verification token (meta-tag method). Paste the value
// from Search Console → Settings → Ownership verification → HTML tag (the
// content="..." part only). Leave empty to omit the tag.
const GOOGLE_VERIFY = '';

/* ----------------------------- JSON-LD blocks ---------------------------- */
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE}/#business`,
  name: site.name,
  alternateName: 'OX Productions',
  description:
    'Production and film servicing company at Yas Creative Hub, Yas Island, Abu Dhabi, UAE — international film & TV production, commercial campaigns, film servicing and post-production.',
  url: `${BASE}/`,
  logo: `${BASE}/assets/logo.png`,
  image: `${BASE}/assets/logo.png`,
  email: site.email,
  telephone: site.phone,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line1,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: [
    { '@type': 'City', name: 'Abu Dhabi' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    name: site.contactPerson,
    telephone: site.phone,
    email: site.email,
  },
  sameAs: [site.instagram],
};

const serviceGraph = {
  '@context': 'https://schema.org',
  '@graph': coreServices.items.map((s) => ({
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.body,
    provider: { '@id': `${BASE}/#business` },
    areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  })),
};

const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${BASE}${it.path}`,
  })),
});

const ld = (...blocks) => blocks.map((b) => JSON.stringify(b)).join('\n');

/* --------------------------- shared render data -------------------------- */
const shared = {
  site,
  services,
  categories,
  portfolio,
  testimonials,
  marquee,
  heroWords,
  heroWordsJson: JSON.stringify(heroWords),
  hero,
  intro,
  execSummary,
  workCategories,
  whyAbuDhabi,
  coreServices,
  supplierCaps,
  filmServices,
  productionCredits,
  team,
  whyOx,
  futureVision,
  clients,
  posters,
  postersPreview: posters.slice(0, 12),
  locations,
  // Locations grouped by category for the gallery view.
  locationsView: locations.categories.map((c) => ({
    ...c,
    items: locations.items.filter((i) => i.category === c.name),
  })),
  ogImage: OG,
  googleVerify: GOOGLE_VERIFY,
  year: new Date().getFullYear(),
};

/* --------------------------- per-page metadata --------------------------- */
const pages = {
  '/index.html': {
    page: 'home',
    title: 'Over Exposure Productions | Bringing the World to Abu Dhabi — Film & Production Servicing, UAE',
    description:
      'A premier Abu Dhabi-based production and film servicing company connecting international filmmakers, studios, broadcasters and content creators with the UAE’s world-class production ecosystem — 50+ international productions.',
    canonical: `${BASE}/`,
    preloadImg: '/images/backgrounds/01-hero-ceiling-hallway-1200.webp',
    jsonld: ld(localBusiness, breadcrumb([{ name: 'Home', path: '/' }])),
  },
  '/company/index.html': {
    page: 'company',
    title: 'About | Company Profile & Leadership | Over Exposure Productions',
    description:
      'Over Exposure Productions — an Abu Dhabi production and film servicing company. Executive summary, leadership team and future vision behind 50+ international productions across the UAE.',
    canonical: `${BASE}/company/`,
    preloadImg: '/images/backgrounds/03-exec-summary-studio-1200.webp',
    jsonld: ld(
      localBusiness,
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Company', path: '/company/' },
      ])
    ),
  },
  '/services/index.html': {
    page: 'services',
    title:
      'Production Services & Film Servicing in Abu Dhabi | Over Exposure Productions',
    description:
      'Full-service production and international film servicing in Abu Dhabi — film & TV production, commercial campaigns, production management, post-production and ADFC rebate support across the UAE.',
    canonical: `${BASE}/services/`,
    jsonld: ld(
      serviceGraph,
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services/' },
      ])
    ),
  },
  '/portfolio/index.html': {
    page: 'portfolio',
    title: 'Filmography | Selected Production Credits | Over Exposure Productions',
    description:
      'Selected production credits across Hollywood, Bollywood, GCC content and global commercial campaigns — feature films, series and brand work supported in Abu Dhabi and across the UAE.',
    canonical: `${BASE}/portfolio/`,
    preloadImg: '/images/backgrounds/09-production-credits-desert-sunset-1200.webp',
    jsonld: ld(
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/portfolio/' },
      ])
    ),
  },
  '/contact/index.html': {
    page: 'contact',
    title: 'Contact Over Exposure Productions | Video Production Abu Dhabi',
    description:
      'Get in touch with Over Exposure Productions — Yas Creative Hub, Yas Island, Abu Dhabi. Call Khalid Ali on +971 55 556 5537 or email info@ox.productionsuae.com.',
    canonical: `${BASE}/contact/`,
    jsonld: ld(
      localBusiness,
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact/' },
      ])
    ),
  },
  '/locations/index.html': {
    page: 'locations',
    title: 'Abu Dhabi Filming Locations | Modern Architecture & Villas | Over Exposure Productions',
    description:
      'A curated, permit-ready library of Abu Dhabi filming locations — modern architecture, towers, marina skylines and premium beachfront, urban and desert villas, scouted and serviced by Over Exposure Productions.',
    canonical: `${BASE}/locations/`,
    preloadImg: '/images/locations/ad-skyline-1200.webp',
    jsonld: ld(
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Locations', path: '/locations/' },
      ])
    ),
  },
  ...Object.fromEntries(
    locations.items.map((loc) => [
      `/locations/${loc.slug}/index.html`,
      {
        page: 'locations',
        location: loc,
        title: `${loc.name} — ${loc.category} | Abu Dhabi Filming Location | Over Exposure Productions`,
        description: loc.intro,
        canonical: `${BASE}/locations/${loc.slug}/`,
        preloadImg: String(loc.bg).replace(/\.(jpe?g|png)$/i, '-1200.webp'),
        jsonld: ld(
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Locations', path: '/locations/' },
            { name: loc.name, path: `/locations/${loc.slug}/` },
          ])
        ),
      },
    ])
  ),
  '/privacy/index.html': {
    page: 'privacy',
    title: 'Privacy Policy | Over Exposure Productions',
    description:
      'How Over Exposure Productions collects, uses and stores your data — contact enquiries, cookies and your privacy choices, in plain language.',
    canonical: `${BASE}/privacy/`,
    robots: 'noindex, follow',
  },
  '/404.html': {
    page: '404',
    title: 'Scene Missing — 404 | Over Exposure Productions',
    description: 'That scene didn’t make the cut. The page you’re looking for could not be found.',
    canonical: `${BASE}/404`,
    robots: 'noindex, follow',
  },
};

export default defineConfig({
  appType: 'mpa',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: (pagePath) => ({ robots: 'index, follow', ...shared, ...(pages[pagePath] || {}) }),
      helpers: {
        eq: (a, b) => a === b,
        inc: (i) => i + 1,
        pad2: (i) => String(i + 1).padStart(2, '0'),
        slugify: (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        json: (v) => JSON.stringify(v),
        repeat: (n, ch) => String(ch).repeat(Math.max(0, Number(n) || 0)),
        // Derive next-gen responsive variant paths produced by generate-assets.mjs
        webp: (src, w) => String(src).replace(/\.(jpe?g|png)$/i, `-${w}.webp`),
        webpset: (src) =>
          [480, 800, 1200]
            .map((w) => `${String(src).replace(/\.(jpe?g|png)$/i, `-${w}.webp`)} ${w}w`)
            .join(', '),
      },
    }),
  ],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        company: resolve(__dirname, 'company/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        portfolio: resolve(__dirname, 'portfolio/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        locations: resolve(__dirname, 'locations/index.html'),
        notfound: resolve(__dirname, '404.html'),
        // Per-location detail pages (build-time static routes).
        ...Object.fromEntries(
          locations.items.map((loc) => [
            `location-${loc.slug}`,
            resolve(__dirname, `locations/${loc.slug}/index.html`),
          ])
        ),
      },
    },
  },
});
