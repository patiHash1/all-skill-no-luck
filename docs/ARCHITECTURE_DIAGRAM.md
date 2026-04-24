# Scroll Timeline System - Architecture Diagram

> Updated: 2026-03-14

## Component Hierarchy

```
App.jsx
├── ReactLenis (smooth scroll wrapper)
│   └── LocaleProvider
│       └── ScrollTimelineProvider ⚡ (Global Timeline Manager)
│           │
│           ├── Navbar
│           │
│           ├── Hero
│           │   └── useSectionScrollProgress('hero-section') 📊
│           │
│           ├── Service
│           │   └── gsap.matchMedia (desktop pin / mobile per-card reveals)
│           │
│           ├── ProgressRing
│           │   └── useSectionScrollProgress('progress-ring-section') 📊
│           │       └── UfoGraph (sub-section)
│           │
│           ├── Featured
│           │   └── PreloadVideo / PreloadIframe (hybrid preload)
│           │
│           └── Footer
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   ScrollTimelineProvider                     │
│  • Manages main timeline (global scroll 0-100%)             │
│  • Registers/unregisters section timelines                  │
│  • Handles cleanup on unmount                               │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ provides context
                  │
    ┌─────────────┴─────────────┐
    │                           │
    ▼                           ▼
┌───────────────────┐   ┌──────────────────────┐
│ useScrollTimeline │   │ Section Components   │
│   • Registry      │   │   • useRef(section)  │
│   • Methods       │◄──┤   • useRef(progress) │
└───────────────────┘   └──────────┬───────────┘
                                   │
                                   │ calls
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │ useSectionScrollProgress     │
                    │  • Creates GSAP timeline     │
                    │  • Runs custom animations    │
                    │  • Registers with provider   │
                    └──────────────────────────────┘
```

## Timeline Structure

```
Main Timeline (0% ──────────────────────────────── 100%)
│
├── Hero Timeline (0% ─────── 100%)
│   └── Content: arrow fades, image parallaxes y:100
│
├── Service Timeline (desktop only)
│   ├── Pinned +=2800 scroll distance
│   ├── Cards fly in from left/right
│   └── Body bg: white → black, title turns white
│
├── ProgressRing Timeline (0% ─────── 100%) [PINNED]
│   ├── 4 SVG arc segments with strokeDashoffset
│   ├── Pinned +=350% (desktop) / +=220% (mobile)
│   └── UfoGraph sub-section after unpin
│
├── Featured (no scroll timeline)
│   └── GSAP stagger reveal on viewport entry
│
└── Footer (no scroll timeline)
    └── Static — no scroll-pinned animation
```

## Hook Architecture

```
useSectionScrollProgress Hook
│
├── Input Parameters
│   ├── sectionId (required)
│   ├── sectionRef (required)
│   ├── start (default: 'top top')
│   ├── end (default: '+=150%')
│   ├── pin (default: true)
│   ├── scrub (default: 1)
│   ├── markers (default: false)
│   ├── onAnimationSetup (callback)
│   └── onProgress (callback)
│
├── Internal Process
│   ├── 1. Get timeline context
│   ├── 2. Create GSAP timeline
│   ├── 3. Setup ScrollTrigger
│   ├── 4. Run onAnimationSetup callback
│   ├── 5. Register with provider
│   └── 6. Return cleanup function
│
└── Cleanup
    ├── Kill ScrollTrigger
    ├── Kill timeline
    └── Unregister from provider
```

## File Organization

```
Portfolio-Website/
├── src/
│   ├── main.jsx ⚡ (React root + GSAP plugin registration)
│   ├── App.jsx ⚡ (wraps with providers, preloads images)
│   ├── index.css (master stylesheet — imports from styles/)
│   │
│   ├── styles/                     # Modular CSS
│   │   ├── globals.css             # Tailwind import, body resets, font
│   │   ├── navbar.css              # Nav hover effect, floating style
│   │   ├── progress-ring.css       # Ring component, starfield keyframes
│   │   ├── aurora.css              # Aurora gradient + @theme token
│   │   └── footer.css              # Form input/underline/submit styles
│   │
│   ├── context/
│   │   ├── ScrollTimelineContext.js 📝 (context definition)
│   │   ├── ScrollTimelineProvider.jsx 🎯 (main provider)
│   │   ├── LocaleContext.jsx        📝 (i18n text + media)
│   │   └── languages.js            📝 (language list)
│   │
│   ├── hooks/
│   │   ├── useScrollTimeline.js    🔗 (access context)
│   │   └── useSectionScrollProgress.js ⭐ (main hook)
│   │
│   ├── sections/
│   │   ├── Hero.jsx                ✅
│   │   ├── Service.jsx             ✅
│   │   ├── ProgressRing.jsx        ✅
│   │   ├── UfoGraph.jsx            ✅ (sub-section)
│   │   ├── Featured.jsx            ✅
│   │   ├── Footer.jsx              ✅
│   │   ├── TorchBackground.jsx     ⚠️ (unused)
│   │   ├── TorchService.jsx        ⚠️ (unused)
│   │   └── usePinnedScrollProgress.js ⚠️ (unused)
│   │
│   ├── components/
│   │   ├── Navbar.jsx              ✅
│   │   ├── loader.jsx              ✅
│   │   ├── AnimatedLineChart.jsx   🎨
│   │   ├── ProgressBar.jsx         🎨
│   │   ├── Torch.jsx               🎨
│   │   └── ui/                     # Magic UI primitives
│   │       ├── aurora-background.jsx
│   │       ├── container-text-flip.jsx
│   │       ├── cover.jsx
│   │       ├── encrypted-text.jsx
│   │       ├── noise-background.jsx
│   │       └── sparkles.jsx
│   │
│   ├── data/
│   │   └── featuredWorks.js        📦 (3 rows of works)
│   │
│   ├── lib/
│   │   └── utils.jsx               🔧 cn() helper
│   │
│   └── utils/
│       ├── preloadImage.js          🔧 image preloader
│       └── sendReview.js            🔧 Google Sheets helper
│
└── docs/                            📚 (this folder)
```

## Scroll Trigger Visualization

```
Browser Viewport
┌─────────────────────────────┐ ← top
│                             │
│   Section (scrolling up)    │
│                             │
├─────────────────────────────┤ ← center
│                             │
│                             │
│                             │
└─────────────────────────────┘ ← bottom

ScrollTrigger Start/End Examples:

'top top'         Section top reaches viewport top
┌─────────────────────────────┐
│ [SECTION TOP] ═══════════   │ ← Trigger point

'top center'      Section top reaches viewport center
┌─────────────────────────────┐
│                             │
│        [SECTION TOP] ═══════│ ← Trigger point

'+=150%'          Extend scroll range
Section stays/animates for 150% of viewport height
```

## Event Flow

```
User Scrolls Down
    ↓
ScrollTrigger Detects Scroll Position
    ↓
Updates Timeline Progress (0 → 1)
    ↓
GSAP Animates Elements
    ├─→ Custom Animations: defined in onAnimationSetup
    └─→ onProgress Callback (optional)
```

## State Management

```
┌─────────────────────────────────────┐
│   ScrollTimelineProvider State      │
├─────────────────────────────────────┤
│  mainTimelineRef:                   │
│    • GSAP Timeline instance         │
│    • Tracks overall page scroll     │
│                                     │
│  sectionTimelinesRef (Map):         │
│    ├─ 'hero-section' → Timeline     │
│    ├─ 'progress-ring-section' → TL  │
│    └─ (sections register on mount)  │
└─────────────────────────────────────┘
```

## Dependency Graph

```
                   App.jsx
                      │
        ┌─────────────┴─────────────┐
        │                           │
   LocaleProvider          ScrollTimelineProvider
        │                           │
        │                 ┌─────────┴─────────┐
        │                 │                   │
        │          ScrollTimelineContext  useScrollTimeline
        │                                     │
        └─────────────┬───────────────────────┘
                      │
              Section Components
                      │
        ┌─────────────┴─────────────┐
        │                           │
  useSectionScrollProgress    gsap.matchMedia
        │
    GSAP + ScrollTrigger
```

## Legend

```
⚡ Provider/Context
📊 Timeline Hook
🎯 Main Entry Point
⭐ Core Hook
🎨 Shared Component
✅ Active Section
⚠️ Unused / Deprecated
📝 Definition
🔗 Accessor
📦 Data
🔧 Utility
📚 Documentation
```

---

This architecture provides a scalable, maintainable, and performant scroll animation system inspired by anime.js timeline concepts.
