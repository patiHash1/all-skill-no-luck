# patiHash Portfolio — Architecture Reference

> Generated: 2026-04-09  
> Purpose: Full technical blueprint so this portfolio can be replicated or extended by future agents or developers.

---

> [!IMPORTANT]
> **🤖 AI Agent Instructions (CRITICAL):**
> 1. **ALWAYS READ THE DOCS:** If you are reading this `SYSTEM_ARCHITECTURE.md` file to understand the project, you **MUST ALSO read all files in the `docs/` directory** (starting with `docs/DOCS_INDEX.md`). This is required to keep your context updated with the latest architecture, scroll timeline system, and asset management patterns.
> 2. **ALWAYS UPDATE THE CHANGELOG:** After completing ANY task or making changes to the codebase, you **MUST IMMEDIATELY document your changes in `CHANGELOG.md`**.

---

## 1. Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | React | 19 |
| Build Tool | Vite (rolldown-vite) | 7 |
| Styling | Tailwind CSS | v4 (PostCSS plugin) |
| Animation | GSAP + ScrollTrigger | 3.13 |
| Animation (extras) | Framer Motion (`motion`) | 12 |
| Smooth Scroll | Lenis (`lenis/react`) | 1.3 |
| 3D | Three.js + @react-three/fiber + @react-three/drei | r180 |
| Particles | tsparticles-slim | 3 |
| Charts | Chart.js + react-chartjs-2 | 4.5 |
| Utilities | clsx, tailwind-merge | latest |
| Responsive detection | react-responsive, react-use | latest |
| Linting | ESLint 9 | flat config |

---

## 2. Project Directory Structure

```
Portfolio-Website/
├── index.html                  # Entry HTML — loads Balsamiq Sans font, mounts #root
├── vite.config.js              # Vite config (React plugin, 1500 KB chunk limit)
├── tailwind.config.js          # Extends fonts (Balsamiq Sans) + custom colors
├── postcss.config.js           # PostCSS with @tailwindcss/postcss
├── eslint.config.js            # ESLint flat config
│
├── public/                     # Static assets (served verbatim at /)
│   ├── fonts/                  # Local web fonts
│   ├── icons/                  # Favicon (patiHash.ico)
│   ├── images/
│   │   ├── landing/            # Hero section images (bomb_layer, logo_text)
│   │   ├── services/           # Service card images (game_dev, VR, websites, earth_chan)
│   │   └── assets/             # Decorative sprites (astronaut, space_gato, starfield, etc.)
│   ├── locales/                # i18n JSON text files (en.json, ja.json)
│   ├── media/                  # Locale-linked media manifest (en.media.json, ja.media.json)
│   ├── models/                 # 3D model files (.glb / .gltf)
│   └── videos/                 # MP4 clips for Featured section
│
└── src/
    ├── main.jsx                # React root mount, App shell (loader gate, providers, order)
    ├── index.css               # Master stylesheet — imports all from styles/
    │
    ├── styles/                 # Modular CSS (one file per concern)
    │   ├── globals.css         # Tailwind import, html/body resets, font
    │   ├── navbar.css          # Nav hover effect, floating style, indicator animation
    │   ├── progress-ring.css   # Ring component, starfield parallax keyframes
    │   ├── aurora.css          # Aurora gradient animation + Tailwind @theme token
    │   └── footer.css          # Contact form input/underline/submit styles
    │
    ├── sections/               # Full-page sections (one per scroll segment)
    │   ├── Hero.jsx
    │   ├── Service.jsx
    │   ├── ProgressRing.jsx
    │   ├── UfoGraph.jsx        # Sub-section inside ProgressRing
    │   ├── Featured.jsx
    │   ├── Footer.jsx
    │
    ├── components/             # Shared reusable components
    │   ├── Navbar.jsx
    │   ├── loader.jsx          # Initial full-screen loader
    │   ├── AnimatedLineChart.jsx
    │   ├── ProgressBar.jsx
    │   ├── Torch.jsx
    │   └── ui/                 # "Magic UI" primitives
    │       ├── aurora-background.jsx
    │       ├── container-text-flip.jsx
    │       ├── cover.jsx
    │       ├── encrypted-text.jsx
    │       ├── noise-background.jsx
    │       └── sparkles.jsx
    │
    ├── context/                # Global React contexts
    │   ├── LocaleContext.jsx   # i18n: loads text + media JSON per language
    │   ├── ScrollTimelineProvider.jsx  # Global GSAP timeline registry
    │   ├── ScrollTimelineContext.js    # Context object (thin singleton)
    │   └── languages.js        # LANGUAGES array [{code, label}]
    │
    ├── hooks/                  # Custom hooks
    │   ├── useBreakpoint.js              # Single source of responsive truth (matchMedia)
    │   ├── useSectionScrollProgress.js   # Main scroll animation hook
    │   ├── useScrollTimeline.js          # Reads ScrollTimelineContext
    │   └── useVisibility.js              # IntersectionObserver hook for lazy features
    │
    ├── data/                   # Static JS data (portfolio content)
    │   └── featuredWorks.js    # 3 rows of work entries (title, link, video/img/youtube)
    │
    ├── lib/
    │   └── utils.jsx           # cn() helper (clsx + tailwind-merge)
    │
    └── utils/
        ├── preloadImage.js     # Promise-based image preloader
        └── sendReview.js       # (Optional) Google Sheets form submission helper
```

---

## 3. App Boot Sequence (`main.jsx`)

```
main.jsx
  └─▶ <StrictMode>
        └─▶ <App>
              1. Preloads critical images (~2 on mobile, all ~12 on desktop)
              2. Enforces a minimum loading gate (800ms mobile / 1500ms desktop)
              3. Shows <Loader /> until assets are ready
              4. Mounts:
                  <ReactLenis root>           ← smooth scroll wrapper
                    <LocaleProvider>          ← i18n text + media
                      <ScrollTimelineProvider> ← GSAP registry
                        <Navbar />
                        <Hero />
                        <Service />
                        <ProgressRing />
                        <Featured />
                        <Footer />
```

---

## 4. Sections Breakdown

### 4.1 `Hero` (`sections/Hero.jsx`)
| Aspect | Detail |
|---|---|
| Background | `<AuroraBackground>` (animated gradient blob) |
| Layout | CSS Grid: 2 col on desktop (image right, text left), stacked on mobile |
| Headline | Static h1 + `<ContainerTextFlip>` cycling words |
| Body text | Desktop: `<EncryptedText>` reveal; Mobile: plain text |
| Scroll anim | `useSectionScrollProgress` — arrow fades, image parallaxes `y: 100` |
| CTA | Anchor link scrolling to `#footer-section` |

### 4.2 `Service` (`sections/Service.jsx`)
| Aspect | Detail |
|---|---|
| Animation | GSAP `matchMedia(isDesktop / isMobile)` - cards fly in from left/right |
| Pin | Desktop only, pinned for `+=2800` scroll distance |
| Transition | Body `backgroundColor` morphs white → black during scroll; title text turns white |
| Cards | `.card-game-dev`, `.card-ar-vr`, `.card-website` — start `invisible`, GSAP reveals |

### 4.3 `ProgressRing` (`sections/ProgressRing.jsx`)
| Aspect | Detail |
|---|---|
| Background | Canvas starfield (60° drift angle, 120–260 stars, responsive density) |
| Decor | Two GSAP `yoyo` floating sprites (astronaut, space cat) |
| SVG Ring | 4 colored arc segments, each draws with `strokeDashoffset` animation |
| Stages | 4 stages: Strategy → Design → Development → Launch |
| Pin | Pinned `+=350%` (desktop) / `+=220%` (mobile) |
| Sub-section | `<UfoGraph />` renders after the pinned block |

### 4.4 `Featured` (`sections/Featured.jsx`)
| Aspect | Detail |
|---|---|
| Data source | `src/data/featuredWorks.js` — 4 named exports (`featuredRow1/2/AR/Web`) |
| Layout | Ordered Masonry component via `useColumnCount` (1 → 2 → 3 cols responsive) |
| Media types | Supports `video` (local MP4), `you_tube` (auto-embed URL), or `img` |
| Performance | **Hybrid preload**: videos mount with `preload="metadata"` (~20 KB, layout-stable first frame), then `IntersectionObserver` (300px margin) upgrades to `preload="auto"` + `.play()` when near viewport. Iframes defer `src` until near-viewport. Pauses off-screen videos to save CPU/GPU. Prevents ~33 MB bandwidth spike on mobile. |
| Animation | GSAP `fromTo` with `stagger: { each: 0.12, from: "random" }` |
| Background | Linear gradient `black → #103A69 → #0d1b24` |

### 4.5 `Footer` (`sections/Footer.jsx`)
| Aspect | Detail |
|---|---|
| Content | All text from `LocaleContext` (`texts.footer.*`) |
| Layout  | Split left (CTA/Socials) and right (Form) with `#0d1b24` background |
| CTA | `<Cover>` animated highlight on the headline word |
| Form | Email + textarea with animated underline focus effect (inline `<style>`) |
| Socials | Facebook, Instagram, LinkedIn (icons via simpleicons CDN) |
| Optional | `sendReview.js` util can submit to Google Sheets (currently commented out) |

---

## 5. Navbar (`components/Navbar.jsx`)

- **Fixed** top, `z-50`, glassmorphism card (`bg-white/70 backdrop-blur-md`)
- **Auto-hide on scroll down**, re-appears on scroll up (via `react-use` `useWindowScroll`)
- **GSAP `ScrollToPlugin`** for smooth section-jump clicks
- **Hamburger menu** for mobile with CSS `max-h` transition (no JS animation library)
- Nav targets are section `id` attributes: `hero-section`, `service-section`, `progress-ring-section`, `featured`, `footer-section`

---

## 6. Animation System Architecture

### Global Scroll Timeline
```
ScrollTimelineProvider
  ├── mainTimelineRef        ← GSAP timeline tracking body top→bottom
  └── sectionTimelinesRef    ← Map<sectionId, gsap.Timeline>
        ├── register(id, tl)
        ├── unregister(id)
        └── get(id)
```

### `useSectionScrollProgress` Hook
The single most important hook in the project. Used by `Hero` and `ProgressRing`.

```js
useSectionScrollProgress({
  sectionId: "my-section",   // unique string ID
  sectionRef,                // React ref to the <section> element
  start: "top top",          // ScrollTrigger start string
  end: "+=200%",             // ScrollTrigger end string
  pin: true,                 // pin section during scroll?
  scrub: 1,                  // scrub smoothness
  markers: false,            // debug markers
  onAnimationSetup: (timeline, sectionEl) => {
    // Add your GSAP tweens to `timeline` here
    timeline.to(".my-element", { opacity: 1 });
  },
  onProgress: (progress, self) => {
    // Called every scroll frame with 0–1 progress
  },
});
```

It:
1. Creates a GSAP timeline with a `ScrollTrigger`
2. Animates a `progressRef` bar to `width: 100%` (if provided)
3. Calls `onAnimationSetup` for custom tweens
4. Registers the timeline in `ScrollTimelineProvider`
5. Cleans up on unmount

---

## 7. i18n / Localisation System

```
public/
  locales/
    en.json        ← text strings keyed by section (footer.cta_highlight, etc.)
    ja.json
  media/
    en.media.json  ← locale-specific media paths/overrides
    ja.media.json
```

`LocaleContext` lazy-fetches both JSON files when the language changes. Components read via `useLocale()`:

```js
const { texts, media, setLanguageIndex } = useLocale();
const footerText = texts?.footer;   // access typed keys
```

To add a language: add `{code, label}` to `src/context/languages.js` and create the corresponding JSON files in `public/locales/` and `public/media/`.

---

## 8. UI Primitives (`components/ui/`)

| Component | What it does |
|---|---|
| `aurora-background.jsx` | Animated CSS gradient aurora effect wrapping children |
| `container-text-flip.jsx` | Cycles through an array of words with flip animation |
| `encrypted-text.jsx` | Reveals characters one-by-one from a "scrambled" state |
| `noise-background.jsx` | Renders a canvas noise/grain texture overlay |
| `cover.jsx` | Animated underline highlight on a word (used in Footer CTA) |
| `sparkles.jsx` | tsparticles-powered sparkle burst effect |

---

## 9. CSS Architecture (`src/styles/`)

`index.css` is the single entry point — it imports modular CSS files from `src/styles/`:

```css
/* src/index.css */
@import "./styles/globals.css";     /* Tailwind, body resets, font-family */
@import "./styles/navbar.css";      /* .nav-hover-btn, .floating-nav, .indicator-line */
@import "./styles/progress-ring.css"; /* .ring, .stars, @keyframes stars-move */
@import "./styles/aurora.css";      /* @keyframes aurora, @theme --animate-aurora */
@import "./styles/footer.css";      /* .input-field, .underline, .submit-btn */
```

| File | Contents |
|---|---|
| `globals.css` | Tailwind import, `html`/`body` resets, Balsamiq Sans font |
| `navbar.css` | `.nav-hover-btn` underline slide, `.floating-nav`, `.indicator-line` equaliser animation |
| `progress-ring.css` | `.ring` component, `.stars` starfield parallax (`stars-move` keyframe) |
| `aurora.css` | `aurora` keyframe + Tailwind `@theme inline` token (`--animate-aurora`) |
| `footer.css` | `.input-field`, `.underline` focus effect, `.submit-btn` gradient button |

---

## 10. Data Layer (`src/data/featuredWorks.js`)

Three named exports, each an array of work objects:

```js
{
  title: string,       // Display name on card
  link: string,        // Click-through URL (external or "#")
  video?: string,      // Path to local MP4 in /public/videos/
  you_tube?: string,   // Full YouTube URL (converted to embed automatically)
  img?: string,        // Fallback image path
  subtitle?: string,   // Optional description shown on hover
}
```

Priority: `you_tube` > `video` > `img`

---

## 11. Agent / Replication Guide

### To clone this portfolio for a new client:

#### Step 1 — Content Swap (Data Layer)
- Replace video files in `public/videos/`
- Replace images in `public/images/`
- Update `src/data/featuredWorks.js` with the new client's work items
- Update `public/locales/en.json` with new texts (tagline, footer email, CTA copy, etc.)

#### Step 2 — Branding
- Swap favicon in `public/icons/`
- Update the logo image in `Navbar.jsx` (`/images/duck_small.png`)
- Change the font import in `index.html` (currently **Balsamiq Sans** from Google Fonts)
- Update `tailwind.config.js` `fontFamily` key to match
- Adjust color palette — primary is `blue-950` (light sections), `#0d1b24` dark bg

#### Step 3 — Sections
- Each section is self-contained in `src/sections/` — add, remove, or reorder in `main.jsx`
- The `ProgressRing` `stages` array (inside `ProgressRing.jsx`) holds the 4-step process — update titles/descriptions
- The `Service` section uses image cards — swap `/images/services/*.png`

#### Step 4 — Navigation
- Update `navItems` array in `Navbar.jsx` with new section labels/target IDs
- Ensure each section has a matching `id` prop

#### Step 5 — Language
- Keep or remove `LocaleProvider` (removing simplifies code but loses i18n)
- If keeping: add JSON key-value pairs to `public/locales/en.json`

#### Step 6 — Contact Form
- Uncomment `sendReview` logic in `Footer.jsx` + `utils/sendReview.js`
- Wire to a Google Sheets Apps Script endpoint or any backend

---

## 12. Key Patterns to Reuse

### Scroll-Pinned Section
```jsx
const sectionRef = useRef(null);
useSectionScrollProgress({
  sectionId: "my-new-section",
  sectionRef,
  start: "top top",
  end: "+=300%",
  pin: true,
  onAnimationSetup: (tl) => {
    tl.fromTo(".my-card", { x: -200, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 2 });
  },
});
return <section ref={sectionRef} id="my-new-section">...</section>;
```

### GSAP Responsive (matchMedia)
```jsx
useLayoutEffect(() => {
  const mm = gsap.matchMedia();
  mm.add({ isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" }, (ctx) => {
    const { isDesktop } = ctx.conditions;
    // conditional animation logic
  });
  return () => mm.revert();
}, []);
```

### Adding a UI Primitive
Drop a new `.jsx` file in `src/components/ui/` and import from sections as needed.

### Adding a New Section
1. Create `src/sections/MySection.jsx`
2. Import and add `<MySection />` in `main.jsx` between existing sections
3. Add a matching nav item to `navItems` in `Navbar.jsx`

---

## 13. Build & Dev Commands

```bash
npm install           # install dependencies
npm run dev           # dev server (Vite HMR)
npm run build         # production build → /dist
npm run preview       # preview production build
npm run lint          # ESLint check
```

> **Note:** This project overrides Vite with `rolldown-vite` for faster builds. The `chunkSizeWarningLimit` is set to 1500 KB to suppress Three.js size warnings.
