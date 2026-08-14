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
 * Imagery is our own scout photography of three real properties. Sources were
 * shared over WhatsApp and are therefore recompressed and capped at 1280px, so
 * nothing here is treated as hero-grade stock: `span` values below are matched
 * to each frame's native aspect ratio, keeping `object-fit: cover` from having
 * to crop aggressively. Responsive WebP variants come from the asset pipeline.
 *
 * Property names are deliberately generic — no real venue name or address is
 * published. `area` is left at emirate level for the same reason; fill in a
 * district only where the owner is happy to be identified.
 */
const locImg = {
  // The Atrium Villa
  avHall: '/images/locations/atrium-villa-hall.jpg',
  avSalon: '/images/locations/atrium-villa-salon.jpg',
  avEntry: '/images/locations/atrium-villa-entry.jpg',
  avSuite: '/images/locations/atrium-villa-suite.jpg',
  avStair: '/images/locations/atrium-villa-stair.jpg',
  avNight: '/images/locations/atrium-villa-night.jpg',
  avFacade: '/images/locations/atrium-villa-facade.jpg',
  // Timber House
  thWall: '/images/locations/timber-house-wall.jpg',
  thLounge: '/images/locations/timber-house-lounge.jpg',
  thCorridor: '/images/locations/timber-house-corridor.jpg',
  thScreen: '/images/locations/timber-house-screen.jpg',
  thPassage: '/images/locations/timber-house-passage.jpg',
  thDoor: '/images/locations/timber-house-door.jpg',
  thGlass: '/images/locations/timber-house-glass.jpg',
  // The Paddock
  pdStables: '/images/locations/paddock-stables.jpg',
  pdStalls: '/images/locations/paddock-stalls.jpg',
  pdMajlis: '/images/locations/paddock-majlis.jpg',
  pdHearth: '/images/locations/paddock-hearth.jpg',
  pdPool: '/images/locations/paddock-pool.jpg',
  pdDusk: '/images/locations/paddock-dusk.jpg',
  pdDrive: '/images/locations/paddock-drive.jpg',
};

const locationItems = [
  {
    slug: 'atrium-villa',
    name: 'The Atrium Villa',
    category: 'Private Residences',
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
      { src: locImg.avSalon, span: 'span-4', alt: 'Sunlit salon with an arched iron-latticed window casting patterned shadow across a marble floor.' },
      { src: locImg.avFacade, span: 'span-4', alt: 'White neo-classical villa facade with columned portico, seen across a walled lawn in daylight.' },
      { src: locImg.avEntry, span: 'span-2', tall: true, alt: 'Arched entrance with ornate wrought-iron double doors flanked by potted plants.' },
      { src: locImg.avSuite, span: 'span-2', tall: true, alt: 'Master bedroom with floor-to-ceiling drapes lit by concealed cove lighting.' },
      { src: locImg.avStair, span: 'span-2', tall: true, alt: 'Marble staircase turning beneath a wrought-iron balustrade and tall window.' },
    ],
  },
  {
    slug: 'timber-house',
    name: 'Timber House',
    category: 'Private Residences',
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
      { src: locImg.thLounge, span: 'span-4', alt: 'Open-plan lounge and dining area with pale plank floors and recessed ceiling lighting.' },
      { src: locImg.thGlass, span: 'span-4', alt: 'Empty room with full-height sliding glazing and sheer drapes over a timber floor.' },
      { src: locImg.thScreen, span: 'span-2', tall: true, alt: 'Backlit stone screen glowing between two sculptural pedestal basins.' },
      { src: locImg.thPassage, span: 'span-4', alt: 'Lit entry passage running between high walls towards the house after dark.' },
      { src: locImg.thDoor, span: 'span-4', alt: 'Timber pivot door set beside a fluted wood wall in a bare, clean-finished room.' },
    ],
  },
  {
    slug: 'the-paddock',
    name: 'The Paddock',
    category: 'Desert Estates',
    area: 'Abu Dhabi · UAE',
    type: 'Equestrian Estate',
    bg: locImg.pdStables,
    intro:
      'A working desert estate — a full stable block with horses on site, a lantern-hung majlis long enough to track down, and a pool pavilion set behind palm-lined drives.',
    body: [
      'The Paddock is the rare location that arrives with its own cast. A pitched-roof stable block runs the length of the property — box stalls either side of a wide aisle, horses looking out over the doors, hard light punching through the far entrance. It is a ready-made set that would cost a great deal to build.',
      'The residence answers it with scale: a majlis long enough for a full tracking move, hung with rows of lanterns, opening into reception rooms finished in book-matched marble.',
      'Outside, a pool terrace and shaded cabanas sit behind palm-lined drives, with open desert and white ranch fencing running to the perimeter — clean horizons in every direction and no neighbouring build to dress out.',
      'We provide 4x4 transport, desert power and water, dust management for gear, and animal-handling coordination for any work involving the horses.',
    ],
    facts: [
      ['Setting', 'Desert estate'],
      ['Best light', 'Hard midday · golden hour'],
      ['Access', 'Stables · majlis · pool terrace · grounds'],
      ['Crew scale', 'Medium to large unit'],
    ],
    tags: ['Equestrian', 'Stables', 'Desert', 'Pool', 'Majlis'],
    gallery: [
      { src: locImg.pdDusk, span: 'span-2', tall: true, alt: 'Swimming pool and covered terrace under a pink dusk sky.' },
      { src: locImg.pdStables, span: 'span-4', alt: 'Long stable aisle with horses looking out of box stalls on both sides towards a bright doorway.' },
      { src: locImg.pdMajlis, span: 'span-4', alt: 'Long majlis under a pitched ceiling, hung with rows of lanterns above a planted divider.' },
      { src: locImg.pdPool, span: 'span-3', alt: 'Outdoor pool beside a single-storey pavilion framed by palms and desert planting.' },
      { src: locImg.pdHearth, span: 'span-3', alt: 'Reception room with a book-matched marble feature wall, linear fireplace and equestrian trophies.' },
      { src: locImg.pdStalls, span: 'span-3', alt: 'Horses at the doors of their stalls beneath the stable block’s steel roof structure.' },
      { src: locImg.pdDrive, span: 'span-3', alt: 'Paved drive lined with palms and shrubs running through the estate grounds.' },
    ],
  },
];

export const locations = {
  hero: {
    eyebrow: 'ABU DHABI LOCATION LIBRARY',
    title: 'Locations',
    lead:
      'Properties we have scouted and can service end to end — private residences and working desert estates across Abu Dhabi, with access, permits, power and crew handled for you.',
    bg: locImg.pdMajlis,
  },
  categories: [
    {
      name: 'Private Residences',
      slug: 'private-residences',
      blurb:
        'Villas and private homes — classical and contemporary, several available as blank interior stages rather than dressed sets.',
    },
    {
      name: 'Desert Estates',
      slug: 'desert-estates',
      blurb:
        'Working estates beyond the city — open horizons, outbuildings, livestock and grounds with genuine scale.',
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
