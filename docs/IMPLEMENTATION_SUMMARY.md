# Scroll Timeline System - Implementation Summary

> Updated: 2026-03-14

## What Was Implemented

A centralized, anime.js-inspired scroll timeline system that provides:

1. **Main Timeline** - Global page scroll tracking
2. **Section Sub-Timelines** - Individual scroll progress for each section (0-100%)
3. **Unified Hook** - `useSectionScrollProgress` for consistent implementation
4. **Centralized Management** - Single source of truth via `ScrollTimelineProvider`

## Core System Files

| File | Purpose |
|------|---------|
| `src/context/ScrollTimelineContext.js` | Context definition |
| `src/context/ScrollTimelineProvider.jsx` | Provider — manages all timelines, register/unregister |
| `src/hooks/useScrollTimeline.js` | Hook to access timeline context |
| `src/hooks/useSectionScrollProgress.js` | Main reusable hook for section animations |
| `src/components/ProgressBar.jsx` | Reusable scroll progress bar component |

## Section Implementations

| Section | File | Animation Strategy |
|---------|------|--------------------|
| Hero | `src/sections/Hero.jsx` | `useSectionScrollProgress` — arrow fades, image parallaxes |
| Service | `src/sections/Service.jsx` | `gsap.matchMedia` — pinned scrub (desktop) / per-card reveals (mobile) |
| ProgressRing | `src/sections/ProgressRing.jsx` | `useSectionScrollProgress` — SVG arcs, pinned, starfield canvas |
| UfoGraph | `src/sections/UfoGraph.jsx` | Sub-section of ProgressRing — chart + spaceship animation |
| Featured | `src/sections/Featured.jsx` | GSAP stagger on viewport entry — hybrid video preload |
| Footer | `src/sections/Footer.jsx` | Static layout — no scroll-pinned animation |

## Key Features

### 1. Consistent API (where used)
```jsx
useSectionScrollProgress({
  sectionId: 'unique-id',
  sectionRef,
  start: 'top center',
  end: 'bottom center',
  pin: false,
  onAnimationSetup: (timeline, sectionEl) => {
    // Custom animations
  },
});
```

### 2. Automatic Timeline Registration
- Each section automatically registers with the global timeline
- Cleanup happens automatically on unmount
- No manual timeline management needed

### 3. Flexible Animation System
- Hero: Parallax fade on scroll
- Service: Desktop pinned scrub vs. mobile per-card IntersectionObserver-like reveals
- ProgressRing: 4-stage SVG ring with starfield canvas + floating sprites
- Featured: GSAP stagger with `from: "random"` on viewport entry
- Footer: Static content, no scroll animation

### 4. Featured Section — Hybrid Video Preloading
- 17 local MP4 videos + 2 YouTube iframes
- Videos mount with `preload="metadata"` (~20 KB each)
- `IntersectionObserver` (300px margin) upgrades to `preload="auto"` near viewport
- Off-screen videos pause to save CPU/GPU
- Iframes defer `src` until near-viewport
- Loader.jsx-style progress bar shown during load

### 5. Modular CSS Architecture
```
src/styles/
├── globals.css         # Tailwind, body resets, font
├── navbar.css          # .nav-hover-btn, .floating-nav, indicator
├── progress-ring.css   # .ring, .stars, starfield keyframes
├── aurora.css          # Aurora gradient + @theme token
└── footer.css          # Form input/underline/submit styles
```

## App Boot Sequence

```
main.jsx
  └─▶ <StrictMode>
        └─▶ <App>
              1. Fetches /media/en.media.json for criticalImages list
              2. Preloads ~12 critical images via preloadImages()
              3. Enforces minimum 1.5-second loading gate
              4. Shows <Loader /> until assets ready
              5. Mounts:
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

## Maintenance Notes

### Where to Find Things
- **Hook Logic**: `src/hooks/useSectionScrollProgress.js`
- **Provider Setup**: `src/context/ScrollTimelineProvider.jsx`
- **Progress Bar**: `src/components/ProgressBar.jsx`
- **Section components**: `src/sections/*.jsx`
- **CSS modules**: `src/styles/*.css`
- **Docs**: `docs/*.md`

### When Adding Animations
- Use `onAnimationSetup` callback in `useSectionScrollProgress`
- Or use `gsap.matchMedia` for responsive-specific animations (see Service.jsx)
- Target elements with class selectors
- Test with `markers: true` first

### When Debugging
1. Enable markers: `markers: true`
2. Add progress callback: `onProgress: (p) => console.log(p)`
3. Check ScrollTrigger panel in Chrome DevTools
4. Verify refs are attached correctly

## Deprecated Files (kept for reference)

| File | Status |
|------|--------|
| `src/sections/usePinnedScrollProgress.js` | Replaced by `useSectionScrollProgress` |
| `src/sections/TorchBackground.jsx` | Unused |
| `src/sections/TorchService.jsx` | Unused |

---

**Ready to use!** The system is fully implemented and documented. See `scroll_timeline_quick_reference.md` for copy-paste code snippets.
