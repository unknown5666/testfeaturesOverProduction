/**
 * content.js — SINGLE SOURCE OF TRUTH for all site content & media slots.
 * ---------------------------------------------------------------------------
 * This file is imported in TWO places:
 *   1. vite.config.js  -> renders services/portfolio grids into STATIC HTML at
 *      build time (great for SEO — crawlers get full markup, no JS required).
 *   2. src/js/*        -> the portfolio lightbox reads the same data at runtime.
 *
 * To swap the old-site stock stills for REAL Over Exposure footage/photos:
 *   - drop new files into /public/media/
 *   - update the `image` / `media` paths below
 *   - (optional) point a card's `media` at an .mp4 / YouTube / Vimeo URL
 * No component code needs to change. See HANDOVER.md.
 * ---------------------------------------------------------------------------
 */

export const site = {
  name: 'Over Exposure Productions',
  shortName: 'Over Exposure',
  domain: 'ox.productionsuae.com',
  baseUrl: 'https://ox.productionsuae.com',
  email: 'info@ox.productionsuae.com',
  phone: '+971555565537',
  phoneDisplay: '+971 55 556 5537',
  contactPerson: 'Khalid Ali',
  address: {
    line1: 'Yas Creative Hub',
    line2: 'Yas Island — Abu Dhabi',
    locality: 'Yas Island',
    region: 'Abu Dhabi',
    country: 'AE',
  },
  hours: 'Mon–Fri, 8:00am – 7:00pm',
  instagram: 'https://www.instagram.com/ox.pro.ae',
  instagramHandle: '@ox.pro.ae',
  // General Yas Island coordinate for the embedded map (real location, not fabricated business data).
  geo: { lat: 24.4959, lng: 54.6056 },
};

/** Rotating accent words for the hero headline (GSAP word-swap). */
export const heroWords = ['Stories', 'Campaigns', 'Films', 'Moments'];

/** Auto-scrolling showreel marquee — craft/discipline labels, NOT fake clients. */
export const marquee = [
  'Film & TV',
  'Commercial',
  'Social Content',
  'Event Coverage',
  'Post-Production',
  'Cinematography',
  'Color',
  'Sound Design',
  'Direction',
];

/**
 * The five verified services. Descriptions are expanded ONLY from the verified
 * one-liners — no invented clients, awards, or stats. Deliverables are generic
 * and honest.
 */
export const services = [
  {
    num: '01',
    slug: 'film-tv',
    name: 'Film & TV Production',
    tagline: 'Cinematic storytelling, start to screen',
    description:
      'We produce films and television content with genuine production value — from concept and development through direction and cinematography. Every frame is built to hold an audience.',
    deliverables: ['Concept & development', 'Direction & cinematography', 'Broadcast-ready delivery'],
    image: '/media/hangar-film-production.jpg',
    alt: 'On-location film production set inside a dimly lit hangar with a helicopter — Over Exposure Productions, Abu Dhabi.',
  },
  {
    num: '02',
    slug: 'commercial-corporate',
    name: 'Commercial & Corporate Video',
    tagline: 'Brand storytelling for business',
    description:
      'We turn brand messages into video people actually watch — commercials, brand films and corporate stories crafted to communicate clearly and look the part. Storytelling with a modern, cinematic approach.',
    deliverables: ['Brand & promo films', 'Interviews & testimonials', 'Product & explainer video'],
    image: '/media/set-desert-corporate.jpg',
    alt: 'Production crew on a desert location shoot at golden hour beside a tanker truck — corporate video production, UAE.',
  },
  {
    num: '03',
    slug: 'social-media',
    name: 'Social Media Content',
    tagline: 'Short-form built for reach',
    description:
      'Dynamic short-form content designed to lift brand visibility across social platforms. Vertical-first, fast-moving, and made to travel — the kind of content the feed rewards.',
    deliverables: ['Short-form verticals', 'Reels & campaign cutdowns', 'Platform-ready exports'],
    image: '/media/night-set-lighting.jpg',
    alt: 'Night film set lit by a large LED panel with atmospheric haze — social media content production, Abu Dhabi.',
  },
  {
    num: '04',
    slug: 'event-coverage',
    name: 'Event Coverage',
    tagline: 'Every moment, professionally captured',
    description:
      'Professional event videography that documents the moments that matter and shapes them into a story worth revisiting. Reliable multi-camera coverage with a filmmaker’s eye.',
    deliverables: ['Multi-camera coverage', 'Highlight & recap films', 'Full-event documentation'],
    image: '/media/event-night-gear.jpg',
    alt: 'Lighting and camera gear staged at a night-time event production — event videography, Abu Dhabi.',
  },
  {
    num: '05',
    slug: 'post-production',
    name: 'Post-Production & Editing',
    tagline: 'Where the film is really made',
    description:
      'Edit, color, sound and delivery under one roof. We shape raw footage into a finished piece — cut with intent, graded for mood, mixed to feel, and exported to spec.',
    deliverables: ['Editing', 'Color grading', 'Sound design', 'Delivery formats'],
    image: '/media/monitor-rec-post.jpg',
    alt: 'Field monitor showing a recording waveform on a night desert shoot — post-production and editing, Over Exposure Productions.',
  },
];

/** The four portfolio categories (filter chips). */
export const categories = ['Film Production', 'Corporate Video', 'Event Coverage', 'Social Media'];

/**
 * Portfolio grid. CATEGORY LABELS ONLY — no invented project or client names.
 * `size` drives the masonry span; `focus` sets object-position so reused stills
 * read differently per card. `media` supports { type:'image' } or
 * { type:'video', src } (mp4) or { type:'embed', src } (YouTube/Vimeo).
 */
export const portfolio = [
  {
    id: 'w1', category: 'Film Production', size: 'tall', focus: '50% 40%',
    image: '/media/night-set-lighting.jpg',
    alt: 'Night film set lit by an LED panel through haze — film production, Abu Dhabi.',
    media: { type: 'video', src: '/media/hero-reel-720.mp4' },
  },
  {
    id: 'w2', category: 'Corporate Video', size: 'wide', focus: '50% 55%',
    image: '/media/set-desert-corporate.jpg',
    alt: 'Crew on a desert commercial shoot at golden hour — corporate video, UAE.',
    media: { type: 'image' },
  },
  {
    id: 'w3', category: 'Event Coverage', size: 'std', focus: '50% 50%',
    image: '/media/event-night-gear.jpg',
    alt: 'Lighting rig and flight cases at a night event shoot — event coverage, Abu Dhabi.',
    media: { type: 'image' },
  },
  {
    id: 'w4', category: 'Social Media', size: 'tall', focus: '50% 45%',
    image: '/media/monitor-rec-post.jpg',
    alt: 'Field monitor recording by firelight — short-form social content, UAE.',
    media: { type: 'image' },
  },
  {
    id: 'w5', category: 'Film Production', size: 'std', focus: '30% 60%',
    image: '/media/hangar-film-production.jpg',
    alt: 'Helicopter staged inside a hangar set — film production, Abu Dhabi.',
    media: { type: 'image' },
  },
  {
    id: 'w6', category: 'Event Coverage', size: 'std', focus: '60% 40%',
    image: '/media/night-set-lighting.jpg',
    alt: 'Silhouetted crew working a night event under film lighting — event coverage, UAE.',
    media: { type: 'image' },
  },
  {
    id: 'w7', category: 'Corporate Video', size: 'std', focus: '20% 50%',
    image: '/media/hangar-film-production.jpg',
    alt: 'Industrial hangar interior lit for a corporate shoot — corporate video, Abu Dhabi.',
    media: { type: 'image' },
  },
  {
    id: 'w8', category: 'Social Media', size: 'tall', focus: '50% 60%',
    image: '/media/set-desert-corporate.jpg',
    alt: 'Behind-the-scenes on a desert shoot — short-form social content, UAE.',
    media: { type: 'image' },
  },
  {
    id: 'w9', category: 'Film Production', size: 'wide', focus: '50% 45%',
    image: '/media/event-night-gear.jpg',
    alt: 'Camera and grip gear staged on a night set — film production, Abu Dhabi.',
    media: { type: 'image' },
  },
  {
    id: 'w10', category: 'Social Media', size: 'std', focus: '50% 35%',
    image: '/media/monitor-rec-post.jpg',
    alt: 'Recording monitor detail on location — social content, UAE.',
    media: { type: 'image' },
  },
];

/** The two verified testimonials — verbatim. */
export const testimonials = [
  {
    quote:
      'Over Exposure Productions delivered exceptional quality and creativity for our corporate video project. Highly recommended!',
    author: 'Justin Lee',
    stars: 5,
  },
  {
    quote:
      'Their team captured our event beautifully, showcasing their expertise in videography and storytelling. Truly impressive!',
    author: 'Omar.A',
    stars: 5,
  },
];

/* =========================================================================
   COMPANY PROFILE DECK — verbatim content from the Over Exposure Productions
   Profile 2026 deck. Do not embellish stats, client names or credits.
   Section imagery lives in /public/images/{backgrounds,team,clients,posters}.
   ========================================================================= */

/** 1. Hero. */
export const hero = {
  bg: '/images/backgrounds/01-hero-ceiling-hallway.jpg',
  tagline: 'Bringing the World to Abu Dhabi',
  subline: ['Hollywood', 'Bollywood', 'Global Streaming', 'Luxury Brands', 'UAE'],
};

/** 2. Intro / stats bar. */
export const intro = {
  bg: '/images/backgrounds/02-over-exposure-desert-crew.png',
  copy:
    'A premier Abu Dhabi-based production and film servicing company connecting international filmmakers, studios, broadcasters, and content creators with the UAE’s world-class production ecosystem.',
  stats: [
    { n: '50+', label: 'International Productions' },
    { n: '20+', label: 'Feature Films & TV Series' },
    { n: '10+', label: 'Global Brand Campaigns' },
    { n: '100%', label: 'UAE Production Coverage' },
  ],
};

/** 3. Executive Summary. */
export const execSummary = {
  bg: '/images/backgrounds/03-exec-summary-studio.jpg',
  copy:
    'A single trusted partner for production execution, film servicing, commercial campaigns and strategic media projects.',
  columns: [
    {
      title: 'Tender-Ready Delivery',
      body:
        'Structured operations with clear scope management, comprehensive documentation support, and procurement-ready processes built for international and institutional clients.',
    },
    {
      title: 'Local Access',
      body:
        'Deep expertise in Abu Dhabi locations, permitting, logistics, vendors, and crew. Unmatched local knowledge ensuring seamless production across the UAE.',
    },
    {
      title: 'Global Standards',
      body:
        'International production discipline across film, TV, brand campaigns, and government projects — delivering world-class quality from Abu Dhabi to global screens.',
    },
  ],
  footer:
    'Positioned for: supplier registration • tenders • RFPs • production partnerships • brand campaigns • international filming',
};

/** 4. Our Work Categories. */
export const workCategories = {
  bg: '/images/backgrounds/04-work-categories-skyline-sunset.png',
  copy:
    'Over Exposure Productions delivers world-class content across three core production categories, each supported by deep local expertise and international production standards in Abu Dhabi and the UAE.',
  items: [
    {
      title: 'International Productions',
      body:
        'Feature films, episodic series, streaming content, and regional productions. Full-service production and film servicing for global studios, broadcasters, and streaming platforms.',
    },
    {
      title: 'Commercial Campaigns',
      body:
        'Luxury, automotive, real estate, and destination campaigns. Premium branded content for global and regional clients demanding the highest production values.',
    },
    {
      title: 'Government & Institutional',
      body:
        'Strategic communications, national media initiatives, and institutional content. Supporting government entities with professional production and storytelling.',
    },
  ],
};

/** 5. Why Abu Dhabi. */
export const whyAbuDhabi = {
  bgPrimary: '/images/backgrounds/05-why-abudhabi-etihad-towers.jpg',
  bgSecondary: '/images/backgrounds/05-why-abudhabi-towers-closeup.jpg',
  subheading: 'infrastructure and strong government support.',
  bullets: [
    'World-class locations ranging from deserts and coastlines to cityscapes, landmarks and modern architecture.',
    'Advanced production infrastructure, professional crew base, efficient logistics and access to international suppliers.',
    'Government-backed initiatives, efficient permitting pathways and recognized production incentive programs.',
    'Stable, connected and globally trusted environment for international productions and high-value brand campaigns.',
  ],
  stats: [
    { value: '35% - 50%', label: 'ADFC Rebate Support' },
    { value: 'UAE', label: 'Coverage Across Abu Dhabi & Dubai' },
    { value: '24/7', label: 'Production Coordination Mindset' },
  ],
};

/** 6. Core Services. */
export const coreServices = {
  bgs: [
    '/images/backgrounds/06-core-services-desert-crew.png',
    '/images/backgrounds/06-core-services-postproduction-suite.png',
  ],
  copy: 'Full-service capabilities tailored to supplier, agency, brand and studio requirements.',
  items: [
    {
      name: 'Film & Television Production',
      body: 'Feature films, TV series, documentaries, streaming content and original productions.',
    },
    {
      name: 'Commercial & Branded Content',
      body:
        'Premium visual campaigns for luxury, automotive, hospitality, real estate and global advertisers.',
    },
    {
      name: 'International Film Servicing',
      body: 'End-to-end support for productions filming in Abu Dhabi and across the UAE.',
    },
    {
      name: 'Production Management',
      body: 'Budgeting, scheduling, permits, logistics, crew management and production supervision.',
    },
    {
      name: 'Post-Production Services',
      body: 'Editing, colour grading, sound design, visual effects, finishing and delivery.',
    },
    {
      name: 'ADFC Incentive & Rebate Support',
      body: 'Guidance and facilitation for Abu Dhabi Film Commission incentive programs.',
    },
  ],
};

/** 7. Supplier Capabilities. */
export const supplierCaps = {
  bg: '/images/backgrounds/07-supplier-capabilities-desert-tent.png',
  phases: [
    {
      title: 'Pre-Production',
      body:
        'Research & development, budgeting, scheduling, permits & location clearances, casting coordination, crew planning, vendor sourcing, and full logistics preparation for every production.',
    },
    {
      title: 'Production',
      body:
        'On-ground crew deployment, vendor management, equipment supply, safety coordination, transportation, and real-time problem solving across Abu Dhabi and UAE locations.',
    },
    {
      title: 'Post-Production & Compliance',
      body:
        'Editing, colour grading, sound design, VFX, finishing and delivery. Full reporting, scope tracking, approvals, ADFC documentation, and project closeout support.',
    },
  ],
};

/** 8. Film Services & Rebate Support. */
export const filmServices = {
  bg: '/images/backgrounds/08-film-services-desert-night.png',
  copy: 'Helping international productions maximize the benefits of filming in Abu Dhabi and the UAE.',
  advantage:
    'We connect international productions with Abu Dhabi’s locations, incentives, infrastructure, local suppliers and professional talent pool - making the production journey smoother, faster and more efficient.',
  bullets: [
    'ADFC rebate guidance and documentation support',
    'Production budget optimization and execution planning',
    'Permits, locations, vendor coordination and local logistics',
    'Crew, equipment, accommodation and transportation solutions',
    'Customs, carnet processing and regional production advisory',
    'End-to-end film servicing from development to final delivery',
  ],
  tag: 'REBATE • PERMITS • CREW • LOCATIONS • LOGISTICS • DELIVERY',
};

/** 9. Selected Production Credits (verbatim credit lists). */
export const productionCredits = {
  bg: '/images/backgrounds/09-production-credits-desert-sunset.png',
  copy:
    'A proven track record across international film, television, Bollywood, GCC content, and global commercial campaigns — all produced in Abu Dhabi and the UAE.',
  hollywood: [
    'Mission: Impossible – Dead Reckoning Part One',
    'Star Wars: The Force Awakens',
    'Sonic the Hedgehog',
    'The Misfits',
    'Deliver Us From Evil',
    'Top Gear',
    'Last Light',
    'Heropanti 2',
    'Baby',
    'Bang Bang!',
    'Vikram Vedha',
    'Bloody Daddy',
    'Race 3',
    'Bunty Aur Babli 2',
  ],
  gcc: [
    'Six Minus One',
    'Rashash',
    'Al Asouf 3',
    'Malh Wa Samra',
    'Harim Tarek',
    'Zodi & Tehu',
    'Honda Pilot',
    'Bentley Flying Spur Hybrid',
    'Prada Mode Abu Dhabi',
    'Dubai Airports / GITEX',
    'ORA Developers',
    'Pagani Italy Showcase',
  ],
  // Curated homepage marquee of credits — a 10-title subset of the lists above
  // (every string is verbatim from `hollywood`/`gcc`). The full lists live on
  // /portfolio/. This is the AED-500M-tier proof promoted to the top of the page.
  feature: [
    'Mission: Impossible – Dead Reckoning Part One',
    'Star Wars: The Force Awakens',
    'Sonic the Hedgehog',
    'Top Gear',
    'Vikram Vedha',
    'Bang Bang!',
    'Al Asouf 3',
    'Prada Mode Abu Dhabi',
    'Bentley Flying Spur Hybrid',
    'Pagani Italy Showcase',
  ],
};

/** 10. Leadership Team. */
export const team = {
  copy:
    'Our leadership brings decades of combined expertise across international film production, operations, creative direction, and financial strategy — driving Over Exposure Productions to the forefront of Abu Dhabi’s film industry.',
  ceo: {
    name: 'Abdulaziz Al Ali',
    role: 'CEO',
    photo: '/images/team/abdulaziz-al-ali-ceo.png',
    bio:
      'Strategic vision and international partnerships. Leads the company’s growth across global markets, overseeing 50+ international productions and positioning Abu Dhabi as a premier film destination.',
  },
  members: [
    {
      name: 'Khalid Ali',
      role: 'General Manager',
      photo: '/images/team/khalid-ali-gm.png',
      bio:
        'Operations and client relations. Manages day-to-day production services, vendor coordination, and ensures seamless delivery across all project phases for international and regional clients.',
    },
    {
      name: 'Manar Al Naqbi',
      role: 'Director',
      photo: '/images/team/manar-al-naqbi-director.jpg',
      bio:
        'Creative leadership and storytelling. Drives the creative vision behind productions, bridging international standards with authentic UAE narratives for film, TV, and branded content.',
    },
    {
      name: 'Abdullah Al Ali',
      role: 'Chief Financial Officer (CFO)',
      photo: '/images/team/abdullah-al-ali-cfo.png',
      bio:
        'Financial executive overseeing financial strategy, project financing, budgeting, risk management and operational planning.',
    },
  ],
};

/** 11. Why Over Exposure Productions. */
export const whyOx = {
  bg: '/images/backgrounds/11-why-ox-desert-crew.png',
  copy: 'Clear differentiators for supplier onboarding and project award decisions.',
  items: [
    {
      title: 'Proven Industry Leadership',
      body: 'Leadership exposure across 50+ productions, series, films, campaigns and strategic media initiatives.',
    },
    {
      title: 'International Perspective',
      body: 'Experience across Hollywood, Bollywood, GCC, European and international production environments.',
    },
    {
      title: 'Abu Dhabi Advantage',
      body: 'Deep knowledge of local regulations, locations, permitting, production infrastructure and incentives.',
    },
    {
      title: 'Elite Industry Network',
      body: 'Access to crews, studios, suppliers, talent, government stakeholders and production partners.',
    },
    {
      title: 'End-to-End Solutions',
      body: 'One accountable partner from development and planning to production, post and final delivery.',
    },
    {
      title: 'Local Access, Global Standards',
      body: 'Authentic local expertise combined with international production discipline and client service.',
    },
  ],
};

/** 12. Future Vision. */
export const futureVision = {
  bg: '/images/backgrounds/12-future-vision-studio-silhouette.jpg',
  copy: 'Building an Abu Dhabi production partner with global reach and local impact.',
  points: [
    'Strengthen Abu Dhabi’s position as a destination for film, television and premium brand production.',
    'Expand partnerships with global studios, streaming platforms, agencies, luxury brands and government stakeholders.',
    'Develop local creative capacity through high-end productions, local suppliers and Emirati talent development.',
    'Deliver procurement-ready production services for clients across the UAE and internationally.',
  ],
  direction:
    'From premium film servicing to large-scale commercial campaigns, Over Exposure Productions is built to scale with Abu Dhabi’s creative economy and become a trusted supplier for world-class productions.',
};

/** 13. Clients & Partners. Tags render as styled text chips (no logo files). */
export const clients = {
  bg: '/images/backgrounds/13-clients-partners-black-car.png',
  secondary: '/images/clients/prada-mode-model.png',
  copy:
    'Over Exposure is positioned to collaborate with international production companies, streaming platforms, luxury brands, agencies, government organizations and creative partners seeking world-class production support across the UAE.',
  tags: [
    'PRADA',
    'BENTLEY',
    'PAGANI',
    'BINGHATTI',
    'DUBAI AIRPORTS',
    'GETEX GLOBAL',
    'ORA DEVELOPERS',
    'HONDA',
    'STUDIOS',
    'BROADCASTERS',
    'GOVERNMENT ENTITIES',
    'PRODUCTION PARTNERS',
  ],
  // Real client/partner names only — the quiet strip beneath the homepage
  // credits. Generic role tags ('STUDIOS', 'BROADCASTERS', …) are intentionally
  // excluded here; the full `tags` list still renders on inner pages.
  featured: [
    'PRADA',
    'BENTLEY',
    'PAGANI',
    'DUBAI AIRPORTS',
    'HONDA',
    'ORA DEVELOPERS',
    'BINGHATTI',
    'GETEX GLOBAL',
  ],
};

/**
 * 14. Portfolio / poster filmography. 53 real poster images extracted from the
 * deck in visual (deck) order. Rendered caption-less: the deck's portfolio
 * pages carry no per-poster captions, and the deck's supplied title list did
 * not reliably map to the later posters — so no titles are asserted here to
 * avoid mislabeling credits. Alt text is neutral.
 */
export const posters = Array.from({ length: 53 }, (_, i) => ({
  src: `/images/posters/poster-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Production poster ${i + 1} of 53 — Over Exposure filmography`,
}));

/**
 * LOCATIONS SHOWCASE — Abu Dhabi filming-location library.
 *
 * Two kinds of imagery live here, and they are treated differently:
 *
 *  1. Landmark stand-ins (Modern Architecture, and the three stock villas) —
 *     freely-licensed Abu Dhabi photography from Wikimedia Commons, see
 *     /public/images/locations/SOURCES.json. These illustrate a location TYPE;
 *     no specific venue is asserted as booked or permit-cleared.
 *  2. Own scout photography (The Atrium Villa, Timber House, and the four
 *     estate entries) — real properties we have walked. Names are deliberately
 *     generic and `area` stays at emirate level so no owner is identified.
 *
 * The scout frames arrived over WhatsApp: recompressed, capped at 1280px and
 * mostly 4:3. Because .locd-grid rows are 12rem, a non-`tall` span-4 cell is
 * roughly 4:1 and would slice those frames apart — so scout galleries use
 * `tall` throughout (span-2 tall ~1:1, span-3 tall ~1.6:1, span-4 tall ~2:1)
 * and each gallery is sized to tile the 6-column grid exactly.
 */
const locImg = {
  // Landmark stand-ins (Wikimedia — see SOURCES.json)
  skyline: '/images/locations/ad-skyline.jpg',     // Abu Dhabi Corniche skyline
  etihad: '/images/locations/etihad-towers.jpg',   // Etihad Towers
  capital: '/images/locations/capital-gate.jpg',   // Capital Gate (leaning tower)
  louvre: '/images/locations/louvre.jpg',          // Louvre Abu Dhabi dome
  mosque: '/images/locations/mosque.jpg',          // Sheikh Zayed Grand Mosque
  palace: '/images/locations/emirates-palace.jpg', // Emirates Palace
  almaryah: '/images/locations/al-maryah.jpg',     // Al Maryah Island cityscape
  yasHotel: '/images/locations/yas-hotel.jpg',     // W Abu Dhabi over Yas Marina
  yasIsland: '/images/locations/yas-island.jpg',   // Yas Island aerial
  saadiyat: '/images/locations/saadiyat.jpg',      // Saadiyat Island shoreline
  dunes: '/images/locations/desert-dunes.jpg',     // Abu Dhabi desert dunes

  // The Atrium Villa — own scout photography
  avHall: '/images/locations/atrium-villa-hall.jpg',
  avSalon: '/images/locations/atrium-villa-salon.jpg',
  avEntry: '/images/locations/atrium-villa-entry.jpg',
  avSuite: '/images/locations/atrium-villa-suite.jpg',
  avStair: '/images/locations/atrium-villa-stair.jpg',
  avNight: '/images/locations/atrium-villa-night.jpg',
  avFacade: '/images/locations/atrium-villa-facade.jpg',

  // Timber House — own scout photography
  thWall: '/images/locations/timber-house-wall.jpg',
  thLounge: '/images/locations/timber-house-lounge.jpg',
  thCorridor: '/images/locations/timber-house-corridor.jpg',
  thScreen: '/images/locations/timber-house-screen.jpg',
  thPassage: '/images/locations/timber-house-passage.jpg',
  thDoor: '/images/locations/timber-house-door.jpg',
  thGlass: '/images/locations/timber-house-glass.jpg',

  // The Long House — estate residence
  lhHall: '/images/locations/longhouse-hall.jpg',
  lhMajlis: '/images/locations/longhouse-majlis.jpg',
  lhLounge: '/images/locations/longhouse-lounge.jpg',
  lhGames: '/images/locations/longhouse-games.jpg',
  lhHearth: '/images/locations/longhouse-hearth.jpg',
  lhSalon: '/images/locations/longhouse-salon.jpg',
  lhDining: '/images/locations/longhouse-dining.jpg',
  lhScreen: '/images/locations/longhouse-screen.jpg',
  lhEntry: '/images/locations/longhouse-entry.jpg',
  lhSitting: '/images/locations/longhouse-sitting.jpg',

  // The Stables — estate stable block
  stAisle: '/images/locations/stables-aisle.jpg',
  stStalls: '/images/locations/stables-stalls.jpg',
  stInterior: '/images/locations/stables-interior.jpg',
  stRoof: '/images/locations/stables-roof.jpg',

  // Palm Court — estate pool pavilion
  pcPavilion: '/images/locations/palmcourt-pavilion.jpg',
  pcTerrace: '/images/locations/palmcourt-terrace.jpg',
  pcApproach: '/images/locations/palmcourt-approach.jpg',
  pcPool: '/images/locations/palmcourt-pool.jpg',
  pcLoungers: '/images/locations/palmcourt-loungers.jpg',
  pcDeck: '/images/locations/palmcourt-deck.jpg',
  pcDusk: '/images/locations/palmcourt-dusk.jpg',

  // The Paddock — estate grounds and perimeter
  pdDrive: '/images/locations/paddock-drive.jpg',
  pdAvenue: '/images/locations/paddock-avenue.jpg',
  pdLawn: '/images/locations/paddock-lawn.jpg',
  pdFence: '/images/locations/paddock-fence.jpg',
  pdPerimeter: '/images/locations/paddock-perimeter.jpg',
  pdRail: '/images/locations/paddock-rail.jpg',
};

const locationItems = [
  {
    slug: 'corniche-towers',
    name: 'Corniche High-Rise',
    category: 'Modern Architecture',
    area: 'Corniche · Abu Dhabi',
    type: 'Tower / Skyline',
    bg: locImg.skyline,
    intro:
      'A cluster of curved-glass towers on the Abu Dhabi Corniche — mirror-finish facades, sweeping sea-front approaches and floodlit crowns after dark.',
    body: [
      'The Corniche high-rise gives productions a ready-made vision of modern Abu Dhabi: reflective glass volumes rising straight off the waterfront, framed by palm-lined boulevards and the Gulf beyond.',
      'Lobbies run to double-height marble and brushed steel; upper floors offer uninterrupted skyline and sea horizons ideal for interviews, brand films and establishing shots. Golden-hour light rakes across the facades for roughly forty minutes each evening.',
      'Our servicing team handles access coordination, height and drone clearances, and night-shoot power — turning a landmark exterior into a controlled, permit-ready set.',
    ],
    facts: [
      ['Setting', 'Waterfront towers'],
      ['Best light', 'Golden hour / blue hour'],
      ['Access', 'Lobby · rooftop · sea-front'],
      ['Crew scale', 'Up to full unit'],
    ],
    tags: ['Skyline', 'Glass facade', 'Waterfront', 'Rooftop', 'Night'],
    gallery: [
      { src: locImg.skyline, span: 'span-3', tall: true, alt: 'Abu Dhabi Corniche skyline of glass towers across the water.' },
      { src: locImg.etihad, span: 'span-3', tall: true, alt: 'The curved glass Etihad Towers on the Abu Dhabi Corniche.' },
      { src: locImg.capital, span: 'span-2', tall: true, alt: 'Capital Gate, Abu Dhabi’s dramatic leaning tower.' },
      { src: locImg.almaryah, span: 'span-2', tall: true, alt: 'High-rise towers on Al Maryah Island, Abu Dhabi.' },
      { src: locImg.palace, span: 'span-2', tall: true, alt: 'Emirates Palace and the Abu Dhabi waterfront.' },
    ],
  },
  {
    slug: 'yas-marina-skyline',
    name: 'Yas Marina Skyline',
    category: 'Modern Architecture',
    area: 'Yas Island · Abu Dhabi',
    type: 'Marina / Skyline',
    bg: locImg.yasHotel,
    intro:
      'Yas Island’s waterfront edge — superyacht berths, contemporary marina architecture and a skyline that ignites at sunset.',
    body: [
      'Yas Marina pairs sleek contemporary structures with reflective water and a constantly shifting sky. Wide promenades and clean geometric lines make it a natural fit for automotive, lifestyle and hospitality shoots.',
      'The location moves through distinct looks in a single day: crisp mid-day modernism, a saturated sunset over the water, then a neon-lit blue hour. Reflections double every light source across the basin.',
      'We arrange marina access, vehicle staging and marine-safety cover, so units can work the boardwalk, berths and elevated vantage points without friction.',
    ],
    facts: [
      ['Setting', 'Marina waterfront'],
      ['Best light', 'Sunset / neon blue hour'],
      ['Access', 'Boardwalk · berths · terraces'],
      ['Crew scale', 'Medium to large unit'],
    ],
    tags: ['Marina', 'Waterfront', 'Automotive', 'Sunset', 'Reflections'],
    gallery: [
      { src: locImg.yasHotel, span: 'span-3', tall: true, alt: 'The illuminated W Abu Dhabi hotel over Yas Marina at night.' },
      { src: locImg.yasIsland, span: 'span-3', tall: true, alt: 'Aerial of Yas Island with its marina and circuit, Abu Dhabi.' },
      { src: locImg.skyline, span: 'span-2', tall: true, alt: 'Abu Dhabi skyline across the water at golden hour.' },
      { src: locImg.etihad, span: 'span-2', tall: true, alt: 'Curved glass towers reflecting the sky, Abu Dhabi.' },
      { src: locImg.almaryah, span: 'span-2', tall: true, alt: 'Modern waterfront high-rises, Abu Dhabi.' },
    ],
  },
  {
    slug: 'cultural-hall',
    name: 'Cultural Landmark Hall',
    category: 'Modern Architecture',
    area: 'Saadiyat Cultural District · Abu Dhabi',
    type: 'Interior / Institutional',
    bg: locImg.louvre,
    intro:
      'A soaring institutional interior — patterned ceilings, filtered light and long processional hallways with museum-grade finish.',
    body: [
      'This landmark interior trades on scale and symmetry: repeating structural rhythm overhead, controlled daylight sifting through screens, and corridors that run long enough for dolly and gimbal moves with real depth.',
      'The palette is calm and monochromatic — pale stone, shadow and light — which makes wardrobe and product colour pop. It reads equally as fashion editorial, prestige narrative or architectural brand film.',
      'Because these are sensitive cultural spaces, our team leads on permissions, protective floor and surface cover, and out-of-hours access windows to keep the shoot clean and compliant.',
    ],
    facts: [
      ['Setting', 'Institutional interior'],
      ['Best light', 'Controlled daylight'],
      ['Access', 'Halls · atria · colonnades'],
      ['Crew scale', 'Small to medium unit'],
    ],
    tags: ['Interior', 'Architectural', 'Symmetry', 'Editorial', 'Daylight'],
    gallery: [
      { src: locImg.louvre, span: 'span-3', tall: true, alt: 'The latticed dome of Louvre Abu Dhabi rising over the water.' },
      { src: locImg.mosque, span: 'span-3', tall: true, alt: 'White domes and arches of the Sheikh Zayed Grand Mosque.' },
      { src: locImg.palace, span: 'span-2', tall: true, alt: 'The grand facade of Emirates Palace, Abu Dhabi.' },
      { src: locImg.etihad, span: 'span-2', tall: true, alt: 'Etihad Towers glass facades, Abu Dhabi.' },
      { src: locImg.capital, span: 'span-2', tall: true, alt: 'Capital Gate’s leaning architectural form, Abu Dhabi.' },
    ],
  },
  {
    slug: 'saadiyat-shoreline-villa',
    name: 'Saadiyat Shoreline Villa',
    category: 'Villas',
    area: 'Saadiyat Island · Abu Dhabi',
    type: 'Beachfront Villa',
    bg: locImg.saadiyat,
    intro:
      'A contemporary beachfront villa on Saadiyat — open-plan living, floor-to-ceiling glass and a pool deck that opens straight onto the dunes and shoreline.',
    body: [
      'The shoreline villa is built for light: full-height glazing dissolves the wall between polished interiors and the beach, so daylight carries all the way through the plan. Neutral stone, pale timber and water reflections keep every frame clean.',
      'Distinct zones — living, kitchen island, master suite, pool terrace — let a unit move through several looks without leaving the property. It suits lifestyle, hospitality and premium brand narratives.',
      'We handle owner liaison, protective cover for finishes, generator power and blackout for day-for-night, so a private residence performs like a purpose-built stage.',
    ],
    facts: [
      ['Setting', 'Beachfront villa'],
      ['Best light', 'Morning · golden hour'],
      ['Access', 'Interiors · pool deck · beach'],
      ['Crew scale', 'Small to medium unit'],
    ],
    tags: ['Villa', 'Beachfront', 'Pool', 'Interiors', 'Lifestyle'],
    gallery: [
      { src: locImg.saadiyat, span: 'span-3', tall: true, alt: 'Turquoise shoreline and beaches of Saadiyat Island, Abu Dhabi.' },
      { src: locImg.palace, span: 'span-3', tall: true, alt: 'Beachfront grounds of Emirates Palace, Abu Dhabi.' },
      { src: locImg.louvre, span: 'span-2', tall: true, alt: 'Waterside architecture of Louvre Abu Dhabi.' },
      { src: locImg.skyline, span: 'span-2', tall: true, alt: 'Abu Dhabi coastline and skyline across the Gulf.' },
      { src: locImg.mosque, span: 'span-2', tall: true, alt: 'Sunlit white marble of the Sheikh Zayed Grand Mosque.' },
    ],
  },
  {
    slug: 'al-maryah-residence',
    name: 'Al Maryah Private Residence',
    category: 'Villas',
    area: 'Al Maryah Island · Abu Dhabi',
    type: 'Urban Villa',
    bg: locImg.almaryah,
    intro:
      'An upscale urban villa moments from the financial district — sculpted concrete, a lit motor court and interiors dressed for high-end automotive and fashion work.',
    body: [
      'This residence brings a sharper, more metropolitan register to the villa category: a private motor court that stages vehicles beautifully, crisp architectural lines and a controlled, design-forward interior.',
      'It excels for automotive reveals, watch and fashion campaigns, and executive lifestyle films — the arrival sequence alone gives directors a full beat, from gate to door.',
      'Our team manages vehicle logistics, gated access, and evening lighting permits so the motor court and interiors can run late into a lit night shoot.',
    ],
    facts: [
      ['Setting', 'Urban villa'],
      ['Best light', 'Blue hour / lit night'],
      ['Access', 'Motor court · interiors · garden'],
      ['Crew scale', 'Medium unit'],
    ],
    tags: ['Villa', 'Automotive', 'Motor court', 'Fashion', 'Night'],
    gallery: [
      { src: locImg.almaryah, span: 'span-3', tall: true, alt: 'City view from Al Maryah Island, Abu Dhabi’s financial district.' },
      { src: locImg.skyline, span: 'span-3', tall: true, alt: 'Abu Dhabi high-rise skyline across the water.' },
      { src: locImg.etihad, span: 'span-2', tall: true, alt: 'The Etihad Towers, Abu Dhabi.' },
      { src: locImg.yasHotel, span: 'span-2', tall: true, alt: 'Illuminated modern architecture at night, Abu Dhabi.' },
      { src: locImg.palace, span: 'span-2', tall: true, alt: 'Emirates Palace grand exterior, Abu Dhabi.' },
    ],
  },
  {
    slug: 'desert-retreat-villa',
    name: 'Desert Retreat Villa',
    category: 'Villas',
    area: 'Al Wathba · Abu Dhabi',
    type: 'Desert Villa',
    bg: locImg.dunes,
    intro:
      'A secluded villa-retreat set against the dunes — earth-toned architecture, shaded courtyards and an unbroken desert horizon for sunrise and star fields.',
    body: [
      'The desert retreat pairs refined villa interiors with raw landscape: warm rammed-earth tones, shaded majlis courtyards, and a terrace that opens onto rolling dunes with zero horizon clutter.',
      'It carries a huge tonal range — soft dawn pastels, hard mid-day graphics, molten sunset, then a genuinely dark sky for astro and lit-night work. Ideal for wellness, hospitality and cinematic narrative.',
      'We provide 4x4 transport, desert power and water, dust management for gear, and permit coverage for dune access — so a remote location shoots as smoothly as a city one.',
    ],
    facts: [
      ['Setting', 'Desert villa'],
      ['Best light', 'Sunrise · sunset · astro'],
      ['Access', 'Courtyards · terrace · dunes'],
      ['Crew scale', 'Small to medium unit'],
    ],
    tags: ['Villa', 'Desert', 'Courtyard', 'Sunset', 'Astro'],
    gallery: [
      { src: locImg.dunes, span: 'span-3', tall: true, alt: 'Rolling dunes of the Abu Dhabi desert at golden light.' },
      { src: locImg.palace, span: 'span-3', tall: true, alt: 'Palatial Arabian architecture against the Abu Dhabi sky.' },
      { src: locImg.saadiyat, span: 'span-2', tall: true, alt: 'Coastal dunes and turquoise shallows near Abu Dhabi.' },
      { src: locImg.mosque, span: 'span-2', tall: true, alt: 'White domes of the Sheikh Zayed Grand Mosque.' },
      { src: locImg.skyline, span: 'span-2', tall: true, alt: 'Abu Dhabi skyline on the horizon.' },
    ],
  },
  {
    slug: 'atrium-villa',
    name: 'The Atrium Villa',
    category: 'Villas',
    area: 'Abu Dhabi · UAE',
    type: 'Classical Villa',
    bg: locImg.avNight,
    intro:
      'A grand neo-classical residence built around a skylit double-height atrium — white columns, wrought-iron balustrades and polished marble beneath a single circular oculus.',
    body: [
      'The atrium is the reason to shoot here. Two storeys of column and balustrade rise to a circular skylight that drops one moving shaft of daylight onto the marble floor — a source that changes character hour by hour and needs almost no augmentation to work on camera.',
      'Around it the house opens into a run of connected reception rooms: an arched salon where iron latticework throws patterned shadow across the floor, a cove-lit master suite, and a marble stair that gives a director a natural vertical move between levels.',
      'Outside, a walled lawn and a lit gatehouse approach let the property play as a daylight establishing shot or a full night exterior without relocating the unit.',
      'Our team handles owner liaison, floor and surface protection, generator power and out-of-hours access windows.',
    ],
    facts: [
      ['Setting', 'Classical villa'],
      ['Best light', 'Midday oculus · lit night'],
      ['Access', 'Atrium · reception rooms · lawn'],
      ['Crew scale', 'Small to medium unit'],
    ],
    tags: ['Atrium', 'Marble', 'Skylight', 'Night exterior', 'Interiors'],
    gallery: [
      { src: locImg.avHall, span: 'span-2', tall: true, alt: 'Double-height atrium with white columns, iron balustrades and a circular skylight overhead.' },
      { src: locImg.avSalon, span: 'span-4', tall: true, alt: 'Sunlit salon with an arched iron-latticed window casting patterned shadow across a marble floor.' },
      { src: locImg.avEntry, span: 'span-2', tall: true, alt: 'Arched entrance with ornate wrought-iron double doors flanked by potted plants.' },
      { src: locImg.avFacade, span: 'span-4', tall: true, alt: 'White neo-classical villa facade with columned portico, seen across a walled lawn in daylight.' },
      { src: locImg.avSuite, span: 'span-2', tall: true, alt: 'Master bedroom with floor-to-ceiling drapes lit by concealed cove lighting.' },
      { src: locImg.avStair, span: 'span-2', tall: true, alt: 'Marble staircase turning beneath a wrought-iron balustrade and tall window.' },
      { src: locImg.avNight, span: 'span-2', tall: true, alt: 'The villa gatehouse and facade floodlit against a night sky.' },
    ],
  },
  {
    slug: 'timber-house',
    name: 'Timber House',
    category: 'Villas',
    area: 'Abu Dhabi · UAE',
    type: 'Modern Villa',
    bg: locImg.thWall,
    intro:
      'A contemporary villa in fluted timber and warm light — ribbed wood walls, concealed cove lighting, pale plank floors and rooms that run clean and empty.',
    body: [
      'Timber House is a study in a single material. Floor-to-ceiling fluted wood wraps the main living volume, catching cove light along every rib so the wall reads as texture rather than surface — it holds a frame on its own, dressed or bare.',
      'Much of the house is deliberately unfurnished, and that is the point: plank floors, clean white returns and full-height glazing give an art department a genuine blank stage instead of a room that has to be undressed first.',
      'A backlit stone screen and sculptural basins supply close-up detail, while a lit entry passage handles arrivals after dark.',
      'We arrange access, power and blackout so the interior can run day-for-night without touching the fabric of the house.',
    ],
    facts: [
      ['Setting', 'Modern villa'],
      ['Best light', 'Warm practicals · controlled daylight'],
      ['Access', 'Living volume · corridors · entry court'],
      ['Crew scale', 'Small to medium unit'],
    ],
    tags: ['Timber', 'Minimal', 'Cove lighting', 'Empty rooms', 'Contemporary'],
    gallery: [
      { src: locImg.thCorridor, span: 'span-2', tall: true, alt: 'Warmly lit corridor opening into a lounge, framed by full-height timber panelling.' },
      { src: locImg.thLounge, span: 'span-4', tall: true, alt: 'Open-plan lounge and dining area with pale plank floors and recessed ceiling lighting.' },
      { src: locImg.thScreen, span: 'span-2', tall: true, alt: 'Backlit stone screen glowing between two sculptural pedestal basins.' },
      { src: locImg.thGlass, span: 'span-4', tall: true, alt: 'Empty room with full-height sliding glazing and sheer drapes over a timber floor.' },
      { src: locImg.thWall, span: 'span-2', tall: true, alt: 'Fluted timber wall running the length of a lounge, lit along every rib.' },
      { src: locImg.thPassage, span: 'span-2', tall: true, alt: 'Lit entry passage running between high walls towards the house after dark.' },
      { src: locImg.thDoor, span: 'span-2', tall: true, alt: 'Timber pivot door set beside a fluted wood wall in a bare, clean-finished room.' },
    ],
  },
  {
    slug: 'long-house',
    name: 'The Long House',
    category: 'Desert Estate',
    area: 'Abu Dhabi · UAE',
    type: 'Estate Residence',
    bg: locImg.lhHall,
    intro:
      'The residence at the heart of the estate — a pitched-ceiling hall long enough for a full tracking move, hung with rows of iron lanterns and opening into reception rooms on both sides.',
    body: [
      'The Long House is built around a single uninterrupted run of floor. The main hall carries a pitched white ceiling and a line of wrought-iron lantern chandeliers down its length, with timber plank flooring throughout — a natural dolly or Steadicam corridor with no set build required.',
      'Off it sit a sequence of distinct reception rooms: a formal salon, a games hall wide enough for full-size tables, a dining room hung with equestrian portraiture, and a lounge with a book-matched marble hearth and trophy shelves.',
      'Planted timber screens hung with pendant bulbs divide the spaces without closing them, so a unit can shoot through three rooms in depth on a single lens.',
      'The residence shares an access point, power supply and permit envelope with the estate’s other three locations — a production can move between all four in a day.',
    ],
    facts: [
      ['Setting', 'Estate residence'],
      ['Best light', 'Warm practicals · lit interior'],
      ['Access', 'Main hall · salon · games hall · dining'],
      ['Crew scale', 'Medium unit'],
    ],
    tags: ['Majlis', 'Lanterns', 'Long hall', 'Equestrian', 'Interiors'],
    gallery: [
      { src: locImg.lhHall, span: 'span-3', tall: true, alt: 'Long reception hall under a pitched ceiling, hung with rows of iron lantern chandeliers.' },
      { src: locImg.lhMajlis, span: 'span-3', tall: true, alt: 'Majlis seating running the length of a timber-floored hall behind a planted divider.' },
      { src: locImg.lhHearth, span: 'span-2', tall: true, alt: 'Book-matched marble feature wall with a linear fireplace and equestrian trophies on glass shelves.' },
      { src: locImg.lhSalon, span: 'span-2', tall: true, alt: 'Formal salon with pale blue armchairs, a long sofa and a sunburst wall clock.' },
      { src: locImg.lhDining, span: 'span-2', tall: true, alt: 'Dining room with a white table setting beneath a framed equestrian portrait.' },
      { src: locImg.lhGames, span: 'span-3', tall: true, alt: 'Games hall with a full-size table tennis table under lantern chandeliers.' },
      { src: locImg.lhLounge, span: 'span-3', tall: true, alt: 'Lounge with dark leather seating facing full-height glazing onto the estate grounds.' },
      { src: locImg.lhScreen, span: 'span-2', tall: true, alt: 'Planted timber screen hung with pendant bulbs dividing the hall from the entrance.' },
      { src: locImg.lhEntry, span: 'span-2', tall: true, alt: 'Entrance area with a raised planter, hanging bulbs and timber flooring.' },
      { src: locImg.lhSitting, span: 'span-2', tall: true, alt: 'Sitting area with a textured sofa and armchairs on wide timber planks.' },
    ],
  },
  {
    slug: 'the-stables',
    name: 'The Stables',
    category: 'Desert Estate',
    area: 'Abu Dhabi · UAE',
    type: 'Equestrian / Working Building',
    bg: locImg.stAisle,
    intro:
      'A working stable block with horses on site — box stalls down both sides of a wide aisle, exposed steel trusses overhead and hard light punching through the far doorway.',
    body: [
      'This is the location that arrives with its own cast. The stable block runs long and straight, box stalls facing each other across a broad concrete aisle, horses looking out over the doors. The far entrance blows out to white, giving a natural backlight down the length of the building that most units would spend a day rigging.',
      'Overhead, black steel trusses and a pitched metal roof read as industrial rather than rustic — it photographs closer to a hangar than a barn, which widens what it can double for.',
      'It is a genuine working facility, not a dressed set, so the detail holds up under a long lens: worn tack, rubber matting, feed buckets, hose runs.',
      'Any work involving the animals is coordinated through us, including handlers, welfare cover and the scheduling required to shoot around feed and exercise routines.',
    ],
    facts: [
      ['Setting', 'Working stable block'],
      ['Best light', 'Hard backlight through the aisle'],
      ['Access', 'Aisle · stalls · yard'],
      ['Crew scale', 'Small to medium unit'],
    ],
    tags: ['Equestrian', 'Horses', 'Steel truss', 'Backlight', 'Working building'],
    gallery: [
      { src: locImg.stAisle, span: 'span-3', tall: true, alt: 'Stable aisle with horses looking out of box stalls on both sides towards a bright doorway.' },
      { src: locImg.stStalls, span: 'span-3', tall: true, alt: 'Horses at the doors of their stalls beneath wall fans and the stable roof structure.' },
      { src: locImg.stInterior, span: 'span-3', tall: true, alt: 'Wide concrete stable aisle running towards an open doorway blown out with daylight.' },
      { src: locImg.stRoof, span: 'span-3', tall: true, alt: 'Black steel roof trusses and clerestory windows above the stable aisle.' },
    ],
  },
  {
    slug: 'palm-court',
    name: 'Palm Court',
    category: 'Desert Estate',
    area: 'Abu Dhabi · UAE',
    type: 'Pool Pavilion',
    bg: locImg.pcPavilion,
    intro:
      'The estate’s pool pavilion — a single-storey colonnade in tinted glass facing a long pool, shaded terraces and mature palms against open desert sky.',
    body: [
      'Palm Court is the estate’s resort register. A low pavilion runs along one side of a full-length pool, its glazing tinted dark enough to mirror the palms and sky, so the building reads as reflection rather than mass.',
      'A covered terrace with loungers and seating gives permanent shade — useful in practical terms as a crew base, and in frame as a clean hospitality or lifestyle set.',
      'The pool holds a strong blue under midday sun and turns to mirror at dusk, when the sky behind the pavilion runs pink and the water picks it up whole.',
      'Paved approaches on three sides take vehicles right up to the pavilion, so grip and lighting can be positioned without crossing landscaping.',
    ],
    facts: [
      ['Setting', 'Pool pavilion'],
      ['Best light', 'Midday blue · dusk mirror'],
      ['Access', 'Pool · terrace · pavilion · approaches'],
      ['Crew scale', 'Medium unit'],
    ],
    tags: ['Pool', 'Pavilion', 'Palms', 'Hospitality', 'Dusk'],
    gallery: [
      { src: locImg.pcPavilion, span: 'span-3', tall: true, alt: 'Long pool beside a single-storey pavilion framed by palms and desert planting.' },
      { src: locImg.pcTerrace, span: 'span-3', tall: true, alt: 'Covered pavilion terrace with seating and a tall palm beside the pool.' },
      { src: locImg.pcPool, span: 'span-2', tall: true, alt: 'Wide view of the estate pool with palms and white perimeter fencing beyond.' },
      { src: locImg.pcLoungers, span: 'span-2', tall: true, alt: 'White loungers on a timber deck running alongside the pool.' },
      { src: locImg.pcDusk, span: 'span-2', tall: true, alt: 'Pool and covered terrace under a pink dusk sky.' },
      { src: locImg.pcApproach, span: 'span-3', tall: true, alt: 'Paved approach leading to the pavilion with tinted glazing reflecting the palms.' },
      { src: locImg.pcDeck, span: 'span-3', tall: true, alt: 'Pool deck and paved surround seen from the shaded end of the terrace.' },
    ],
  },
  {
    slug: 'the-paddock',
    name: 'The Paddock',
    category: 'Desert Estate',
    area: 'Abu Dhabi · UAE',
    type: 'Grounds / Open Desert',
    bg: locImg.pdDrive,
    intro:
      'The estate’s outdoor run — white ranch fencing against raw sand, palm-lined paved drives and open desert horizon with nothing to dress out.',
    body: [
      'The Paddock is the estate at its most cinematic and its least built. White post-and-rail fencing runs in long straight lines across bare sand, giving a strong graphic lead-line in almost any direction a camera points.',
      'Paved drives curve through the grounds between mature palms and planted verges, wide enough for vehicle tracking work and clean enough to double for a private compound anywhere in the Gulf.',
      'Past the fencing the land simply stops — open desert to the horizon, no neighbouring build, no power lines through frame. That absence is the asset: establishing shots need no clean-up.',
      'We provide 4x4 transport, desert power and water, and dust management for gear across the open ground.',
    ],
    facts: [
      ['Setting', 'Estate grounds · open desert'],
      ['Best light', 'Hard midday · golden hour'],
      ['Access', 'Drives · paddocks · perimeter'],
      ['Crew scale', 'Medium to large unit'],
    ],
    tags: ['Desert', 'Ranch fence', 'Palm drive', 'Open horizon', 'Vehicle tracking'],
    gallery: [
      { src: locImg.pdDrive, span: 'span-3', tall: true, alt: 'Paved drive lined with palms and shrubs running through the estate grounds.' },
      { src: locImg.pdAvenue, span: 'span-3', tall: true, alt: 'Curving paved avenue between palms and planted verges on the estate.' },
      { src: locImg.pdLawn, span: 'span-3', tall: true, alt: 'Lawn and young trees beside a paved drive with a palm in the foreground.' },
      { src: locImg.pdFence, span: 'span-3', tall: true, alt: 'White post-and-rail ranch fencing running across bare sand under a clear sky.' },
      { src: locImg.pdPerimeter, span: 'span-3', tall: true, alt: 'Estate perimeter fencing with open desert beyond and buildings in the distance.' },
      { src: locImg.pdRail, span: 'span-3', tall: true, alt: 'Long line of white fencing dividing sand paddocks on the estate.' },
    ],
  },
];

export const locations = {
  hero: {
    eyebrow: 'ABU DHABI LOCATION LIBRARY',
    title: 'Locations',
    lead:
      'A curated, permit-ready library of Abu Dhabi filming locations — towers and landmark interiors, private villas, and a working desert estate with stables, pool pavilion and open horizon, all scouted and serviced by Over Exposure Productions.',
    bg: locImg.skyline,
  },
  categories: [
    {
      name: 'Modern Architecture',
      slug: 'modern-architecture',
      blurb: 'Glass towers, marina skylines and landmark interiors that define contemporary Abu Dhabi.',
    },
    {
      name: 'Villas',
      slug: 'villas',
      blurb:
        'Private beachfront, urban, desert and classical residences — dressed, serviced, or handed over as blank interior stages.',
    },
    {
      name: 'Desert Estate',
      slug: 'desert-estate',
      blurb:
        'Four distinct sets on one working estate — residence, stables, pool pavilion and open grounds, sharing a single access point and permit envelope.',
    },
  ],
  items: locationItems,
};

export default {
  site,
  heroWords,
  locations,
  marquee,
  services,
  categories,
  portfolio,
  testimonials,
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
};
