/* =========================================================================
   Over Exposure Productions — motion system entry
   Lenis smooth scroll + GSAP ScrollTrigger. Animate transform/opacity only.
   Page-specific behaviour is code-split (dynamic import) to keep JS lean.
   ========================================================================= */
import '../css/main.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
/* Mobile is driven by viewport width (matchMedia), NOT hover/pointer — emulators
   and some touch laptops report hover, and the brief scopes mobile work to ≤768px. */
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

let lenis = null;
/* Hero entrance is chained to the preloader shutter — the shutter's clear IS
   the hero reveal. initHero() registers the real handler here; the preloader
   fires it as the panels open (or boot fires it directly when the loader is
   skipped). Default no-op keeps inner pages safe. */
let onHeroReveal = () => {};

/* ------------------------------- Lenis ---------------------------------- */
function initSmoothScroll() {
  // Native touch scroll on mobile — no Lenis, no rAF scroll loop (see CSS ≤768px).
  if (reduceMotion || isMobile) return;
  lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
function scrollTo(target) {
  if (lenis) lenis.scrollTo(target, { offset: 0 });
  else document.querySelector(target)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}

/* ----------------------------- Preloader -------------------------------- */
function runPreloader() {
  const pre = $('#preloader');
  const shutter = $('#shutter');
  if (!pre) {
    onHeroReveal();
    return Promise.resolve();
  }

  const seen = sessionStorage.getItem('ox_seen');
  const done = () => {
    pre.style.display = 'none';
    document.body.classList.add('loaded');
  };

  if (seen || reduceMotion) {
    done();
    onHeroReveal();
    return Promise.resolve();
  }

  // Mobile: the hero already paints in its final position underneath (see CSS
  // ≤768px), so the loader is a quick decorative wipe — no progress-bar dwell.
  // Reveals in ~0.3s instead of ~0.9s, which is what LCP/Speed Index wait on.
  if (isMobile) {
    return new Promise((resolve) => {
      const finishM = () => {
        if (shutter) shutter.style.display = 'none';
        sessionStorage.setItem('ox_seen', '1');
        done();
        onHeroReveal();
        resolve();
      };
      const failsafeM = setTimeout(finishM, 1200);
      const panels = $$('#shutter span');
      shutter.style.display = 'block';
      gsap.set(panels, { transformOrigin: 'top' });
      gsap
        .timeline({ onComplete: () => { clearTimeout(failsafeM); finishM(); } })
        .to(pre, { opacity: 0, duration: 0.22 }, 0)
        .fromTo(panels, { scaleY: 1 }, { scaleY: 0, duration: 0.26, stagger: 0.018, ease: 'power2.in' }, 0.04)
        .add(() => onHeroReveal(), 0.02);
    });
  }

  // Build 35mm sprocket-hole perforations — they light up one-by-one as the
  // "frame" exposes, instead of a solid progress fill.
  const bar = $('#preBar');
  const PERFS = 24;
  const perfs = [];
  if (bar) {
    bar.textContent = '';
    for (let i = 0; i < PERFS; i++) {
      const s = document.createElement('span');
      bar.appendChild(s);
      perfs.push(s);
    }
  }
  const pct = $('#prePct');

  return new Promise((resolve) => {
    // Idempotent finisher. A failsafe guarantees the loader can NEVER hide the
    // page — if the rAF ticker is throttled (e.g. a backgrounded tab) and the
    // GSAP timeline stalls, this still clears the loader and reveals the hero.
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (shutter) shutter.style.display = 'none';
      sessionStorage.setItem('ox_seen', '1');
      done();
      onHeroReveal();
      resolve();
    };
    const failsafe = setTimeout(finish, 2500);

    const state = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        // Exposure wipe — the shutter's clear IS the hero entrance. One
        // continuous timeline: panels snap open (tight stagger + ease-in for a
        // mechanical leaf-shutter feel) while the tagline mask-reveals beneath.
        shutter.style.display = 'block';
        const panels = $$('#shutter span');
        gsap.set(panels, { transformOrigin: 'top' });
        gsap
          .timeline({
            onComplete: () => {
              clearTimeout(failsafe);
              finish();
            },
          })
          .to(pre, { opacity: 0, duration: 0.28 }, 0)
          .fromTo(panels, { scaleY: 1 }, { scaleY: 0, duration: 0.28, stagger: 0.025, ease: 'power2.in' }, 0)
          .add(() => onHeroReveal(), 0.1)
          .add(done);
      },
    });
    tl.to(state, {
      v: 100,
      duration: 0.58,
      ease: 'power2.out',
      onUpdate: () => {
        const val = Math.round(state.v);
        if (pct) pct.textContent = String(val).padStart(2, '0') + '%';
        const lit = Math.round((state.v / 100) * PERFS);
        for (let i = 0; i < perfs.length; i++) perfs[i].classList.toggle('on', i < lit);
      },
    });
  });
}

/* ------------------------------- Nav ------------------------------------ */
function initNav() {
  const nav = $('#nav');
  const burger = $('#burger');
  const overlay = $('#navOverlay');

  // Plain passive scroll listener — reliable (Lenis scrolls the window natively).
  // On mobile the bar also hides on scroll-down / shows on scroll-up.
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle('scrolled', y > 80);
    if (isMobile && !reduceMotion) {
      const menuOpen = document.body.classList.contains('menu-open');
      if (menuOpen || y < 120) {
        nav?.classList.remove('nav-hidden');
      } else if (Math.abs(y - lastY) > 6) {
        nav?.classList.toggle('nav-hidden', y > lastY);
      }
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger?.setAttribute('aria-expanded', String(open));
    burger?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    overlay?.setAttribute('aria-hidden', String(!open));
    if (lenis) open ? lenis.stop() : lenis.start();
  };
  burger?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('.nav-overlay__link', overlay).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
}

/* ------------------------- Custom cursor -------------------------------- */
function initCursor() {
  if (!canHover || reduceMotion) return;
  const dot = $('#cursor');
  const ring = $('#cursorRing');
  if (!dot || !ring) return;
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ring2 = { x: pos.x, y: pos.y };
  window.addEventListener('mousemove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
  });
  gsap.ticker.add(() => {
    ring2.x += (pos.x - ring2.x) * 0.18;
    ring2.y += (pos.y - ring2.y) * 0.18;
    ring.style.transform = `translate3d(${ring2.x}px, ${ring2.y}px, 0)`;
  });
  const play = (on) => document.body.classList.toggle('cursor-play', on);
  // Bind enter/leave per target element (not delegated mouseover/mouseout) so
  // crossing child nodes inside a [data-cursor="play"] target never flickers.
  $$('[data-cursor="play"]').forEach((el) => {
    el.addEventListener('mouseenter', () => play(true));
    el.addEventListener('mouseleave', () => play(false));
  });
}

/* --------------------------- Scroll reveals ----------------------------- */
/* IntersectionObserver-driven (fires reliably regardless of rAF cadence and
   is cheaper than a scroll-tween). A failsafe timer guarantees no .reveal can
   ever remain hidden. */
function initReveals() {
  const els = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      let n = 0;
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.style.transitionDelay = (n++ % 5) * 70 + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
  // Belt-and-braces: reveal anything still hidden after load settles.
  setTimeout(() => els.forEach((el) => el.classList.add('is-in')), 4000);
}

/* ------------------------- Credits cascade ------------------------------ */
/* S2 signature moment. Each title is its own IO trigger: it rises + fades from
   behind a clip-mask, alternating L/R (CSS). Pure IO + CSS transition = 60fps
   on mid-range Android, no scroll-scrubbing. Runs on BOTH platforms. */
function initCredits() {
  const items = $$('[data-credit]');
  if (!items.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }),
    { rootMargin: '0px 0px -10% 0px', threshold: 0.4 }
  );
  items.forEach((el) => io.observe(el));
  setTimeout(() => items.forEach((el) => el.classList.add('is-in')), 4000);
}

/* One-shot image entrance (scale 1.08→1 + blur 8→0). Promoted to both
   platforms — the CSS does the work once `.in` lands; JS only observes. */
function initImageRise() {
  const els = $$('.img-rise');
  if (!els.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
  setTimeout(() => els.forEach((el) => el.classList.add('in')), 4000);
}

/* Signature-work video card: tap / click to load & play. The play affordance
   scales out into the video start; the poster→video swap is a CSS crossfade.
   Desktop shows the custom "PLAY" cursor ring instead of the button. */
function initVideoCard() {
  const card = $('[data-video-card]');
  if (!card) return;
  const video = $('.sig__vid', card);
  if (!video) return;
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    const src = video.querySelector('source[data-src]');
    if (src && !src.src) {
      src.src = src.dataset.src;
      video.load();
    }
    card.classList.add('played');
    const play = () =>
      video
        .play()
        .then(() => video.classList.add('is-playing'))
        .catch(() => {
          started = false;
          card.classList.remove('played');
        });
    if (video.readyState >= 2) play();
    else video.addEventListener('canplay', play, { once: true });
  };
  card.addEventListener('click', start);
}

/* ------------------------------- Hero ----------------------------------- */
function initHero() {
  const hero = $('#hero');
  if (!hero) return;

  // Lazy hero video. Plays on hover-capable desktops AND on mobile (≤768px) —
  // still skipped for reduced-motion, Save-Data and 2G to keep slow links fast.
  // The poster→video swap is a 1.2s opacity+scale crossfade (see CSS .is-playing).
  const video = $('#heroVideo');
  const conn = navigator.connection || {};
  const capable = (canHover || isMobile) && !reduceMotion && !conn.saveData && !/2g/.test(conn.effectiveType || '');
  if (video && capable) {
    const src = video.querySelector('source[data-src]');
    if (src) {
      src.src = src.dataset.src;
      video.load();
      const play = () => video.play().then(() => video.classList.add('is-playing')).catch(() => {});
      if (video.readyState >= 2) play();
      else video.addEventListener('canplay', play, { once: true });
    }
  }

  // Register the hero entrance. The preloader shutter fires this as it clears
  // (first line 100ms after the panels open, 90ms per-line stagger); the
  // subline then the CTA rise as single blocks behind it.
  const masks = $$('.hero__title .mask', hero);
  const subline = $('.hero__subline', hero);
  const ctaRow = $('.hero__cta-row', hero);
  let fired = false;
  onHeroReveal = () => {
    if (fired) return;
    fired = true;
    masks.forEach((m, i) => setTimeout(() => m.classList.add('is-in'), 100 + i * 90));
    const lastLine = 100 + Math.max(0, masks.length - 1) * 90;
    setTimeout(() => subline && subline.classList.add('is-in'), lastLine + 300);
    setTimeout(() => ctaRow && ctaRow.classList.add('is-in'), lastLine + 420);
  };
}

/* -------------------------- Services list ------------------------------- */
function initServices() {
  const rows = $$('[data-svc-row]');
  if (!rows.length) return;

  if (canHover) {
    const reveal = $('[data-svc-reveal]');
    const img = reveal ? $('img', reveal) : null;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        if (!reveal) return;
        img.src = row.dataset.img || '';
        reveal.classList.add('is-on');
      });
      row.addEventListener('mouseleave', () => reveal?.classList.remove('is-on'));
    });
    window.addEventListener('mousemove', (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    });
    if (reveal) {
      gsap.ticker.add(() => {
        cur.x += (target.x - cur.x) * 0.12;
        cur.y += (target.y - cur.y) * 0.12;
        reveal.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
      });
    }
  } else {
    // touch: tap to expand inline thumbnail
    rows.forEach((row) => {
      row.addEventListener('click', () => {
        rows.forEach((r) => r !== row && r.classList.remove('open'));
        row.classList.toggle('open');
        if (lenis) ScrollTrigger.refresh();
      });
    });
  }
}

/* --------------------------- Testimonials ------------------------------- */
function initTestimonials() {
  const root = $('[data-tst]');
  if (!root) return;
  const slides = $$('[data-tst-slide]', root);
  const dots = $$('[data-tst-dot]', root);
  if (slides.length < 2) return;
  let i = 0;
  let timer;
  const go = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    dots.forEach((d, k) => d.classList.toggle('active', k === i));
  };
  const auto = () => {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => go(i + 1), 6000);
  };
  dots.forEach((d) => d.addEventListener('click', () => { go(+d.dataset.tstDot); auto(); }));
  auto();
}

/* ---------------------------- Parallax ---------------------------------- */
function initParallax() {
  // Heavy scroll-scrubbed parallax is desktop-only; mobile gets lighter
  // entrance motion instead (see initMobileMotion) to stay smooth at 60fps.
  if (reduceMotion || isMobile) return;
  $$('[data-parallax], .about__media img, .pagehead__media img, .svc-sec__media img, .deck__bg img, .split__media img').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: el.closest('section, div'), start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });
}

/* ============================ MOBILE MOTION ==============================
   Everything below is gated to ≤768px (matchMedia) and to no-preference for
   reduced motion. Desktop behaviour is untouched. Transform/opacity only,
   plus a one-shot blur on image entrances. */

/* Count-up on the stat numbers when they scroll into view (both platforms). */
function initCounters() {
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const nums = $$('.stat__n').filter((el) => /\d/.test(el.textContent));
  if (!nums.length) return;
  const run = (el) => {
    const raw = el.textContent.trim();
    const target = parseFloat(raw.replace(/[^\d.]/g, ''));
    const suffix = raw.replace(/[\d.,]/g, ''); // keeps "+", "%", etc.
    if (!isFinite(target)) return;
    const dur = 1100;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      run(en.target);
      io.unobserve(en.target);
    }),
    { threshold: 0.6 }
  );
  nums.forEach((el) => io.observe(el));
}

/* Entrance treatment for section-number labels (eyebrows, gold line draws
   itself) and image blocks (scale 1.08→1, blur→sharp). CSS handles the actual
   transitions once `.m-in` lands; JS only observes. */
function initMobileMotion() {
  if (!isMobile || reduceMotion || !('IntersectionObserver' in window)) return;
  const targets = [
    ...$$('.eyebrow'),
    ...$$('.band__bg'),
    ...$$('.pagehead__media'),
    ...$$('.whyad__media, .coreserv__media, .clients__media, .team__ceo-photo'),
  ];
  if (!targets.length) return;
  targets.forEach((el) => el.classList.add('m-rev'));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('m-in');
      io.unobserve(en.target);
    }),
    { rootMargin: '0px 0px -6% 0px', threshold: 0.12 }
  );
  targets.forEach((el) => io.observe(el));
  // Failsafe: never leave anything hidden.
  setTimeout(() => targets.forEach((el) => el.classList.add('m-in')), 4000);
}

/* Lazy background videos on mobile (hero + [data-bg-video] sections).
   preload=none, load+play on intersection, pause off-screen. Missing
   placeholder files degrade silently to the poster image. */
function initMobileVideos() {
  if (!isMobile || reduceMotion) return;
  const conn = navigator.connection || {};
  if (conn.saveData || /2g/.test(conn.effectiveType || '')) return;
  if (!('IntersectionObserver' in window)) return;

  const hero = $('#heroVideo');
  const bgVideos = $$('[data-bg-video]');
  const managed = [hero, ...bgVideos].filter(Boolean);
  if (!managed.length) return;

  const load = (v) => {
    if (v.dataset.tried) return;
    v.dataset.tried = '1';
    const src = v.querySelector('source[data-src]');
    if (src && !src.src) {
      src.src = src.dataset.src;
      v.load();
    }
  };
  const play = (v) => v.play().then(() => v.classList.add('is-playing')).catch(() => {});

  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) {
        load(v);
        if (v.readyState >= 2) play(v);
        else v.addEventListener('canplay', () => play(v), { once: true });
      } else if (!v.paused) {
        v.pause(); // save cycles off-screen
      }
    }),
    { rootMargin: '10% 0px 10% 0px', threshold: 0.1 }
  );
  managed.forEach((v) => io.observe(v));
}

/* --------------------------- Smooth anchors ----------------------------- */
function initAnchors() {
  $$('[data-scroll]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        scrollTo(href);
      }
    });
  });
}

/* ------------------------------- Boot ----------------------------------- */
async function boot() {
  initSmoothScroll();
  initNav();
  initCursor();
  initHero();
  initServices();
  initTestimonials();
  initAnchors();
  initReveals();
  initParallax();
  initCounters();
  initCredits();
  initImageRise();
  initVideoCard();
  initMobileMotion();
  initMobileVideos();

  // Page-specific modules (code-split)
  if ($('[data-portfolio]')) import('./portfolio.js').then((m) => m.initPortfolio({ gsap, lenis, canHover, reduceMotion }));
  if ($('[data-contact-form]')) import('./contact.js').then((m) => m.initContact());

  await runPreloader();
  onHeroReveal(); // idempotent — guarantees the hero shows on every path
  ScrollTrigger.refresh();
  // Re-refresh once fonts/late media settle to keep triggers accurate
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
