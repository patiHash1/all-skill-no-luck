# Scroll Timeline Quick Reference

> Updated: 2026-03-14

## File Structure
```
src/
├── context/
│   ├── ScrollTimelineContext.js      # Context definition
│   └── ScrollTimelineProvider.jsx    # Main provider
├── hooks/
│   ├── useScrollTimeline.js          # Access context
│   └── useSectionScrollProgress.js   # Section timeline hook
└── components/
    └── ProgressBar.jsx               # Reusable progress bar
```

## Quick Setup for New Section

### 1. Import
```jsx
import { useRef } from 'react';
import { useSectionScrollProgress } from '../../hooks/useSectionScrollProgress';
import ProgressBar from '../../components/ProgressBar';
```

### 2. Create Refs
```jsx
const sectionRef = useRef(null);
const progressRef = useRef(null);
```

### 3. Setup Timeline
```jsx
useSectionScrollProgress({
  sectionId: 'my-section-id',  // REQUIRED: unique ID
  sectionRef,                   // REQUIRED: section ref
  progressRef,                  // OPTIONAL: progress bar ref
  start: 'top center',          // When animation starts
  end: 'bottom center',         // When animation ends
  pin: false,                   // Pin section in place?
  markers: false,               // Show debug markers?
  onAnimationSetup: (timeline, sectionEl) => {
    // Add your GSAP animations here
    timeline.from('.my-element', { opacity: 0, y: 50 }, 0);
  },
});
```

### 4. Add to JSX
```jsx
<section ref={sectionRef} className="relative">
  {/* Your content */}
  
  {/* Progress bar at bottom */}
  <div className="pointer-events-none absolute left-0 right-0 bottom-8 px-8 md:px-16 z-20">
    <ProgressBar ref={progressRef} height={8} fillColor="#3b82f6" />
  </div>
</section>
```

## Common Animation Patterns

### Fade Out on Scroll
```jsx
onAnimationSetup: (timeline, sectionEl) => {
  const element = sectionEl.querySelector('.my-element');
  timeline.to(element, { opacity: 0, ease: 'none' }, 0);
}
```

### Slide In from Sides
```jsx
onAnimationSetup: (timeline, sectionEl) => {
  timeline.from('.left', { x: -100, opacity: 0 }, 0);
  timeline.from('.right', { x: 100, opacity: 0 }, 0);
}
```

### Stagger Cards
```jsx
onAnimationSetup: (timeline, sectionEl) => {
  const cards = sectionEl.querySelectorAll('.card');
  timeline.from(cards, {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
  }, 0);
}
```

### Scale Animation
```jsx
onAnimationSetup: (timeline, sectionEl) => {
  timeline.from('.items', {
    scale: 0,
    opacity: 0,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  }, 0);
}
```

## ScrollTrigger Positions

### Start/End Values
```
'top top'       - Section top → Viewport top
'top center'    - Section top → Viewport center
'top bottom'    - Section top → Viewport bottom
'bottom center' - Section bottom → Viewport center
'+=150%'        - Extend by 150% of viewport height
```

### Visual Guide
```
Viewport:
┌─────────────────┐ ← top
│                 │
│                 │
├─────────────────┤ ← center
│                 │
│                 │
└─────────────────┘ ← bottom
```

## Timeline Positions

```jsx
timeline.to(el, { ... }, 0);     // Start at 0% (with progress bar)
timeline.to(el, { ... }, 0.5);   // Start at 50% of timeline
timeline.to(el, { ... });        // After previous animation
```

## ProgressBar Props

```jsx
<ProgressBar 
  ref={progressRef}           // Required ref
  height={8}                  // Bar height (px)
  fillColor="#3b82f6"         // Fill color
  trackColor="rgba(...)"      // Track color
  rounded={true}              // Rounded corners
  ariaLabel="Section progress" // Accessibility
/>
```


## Debugging

### Enable Markers
```jsx
useSectionScrollProgress({
  // ... config
  markers: true,  // Shows ScrollTrigger debug markers
});
```

### Progress Callback
```jsx
useSectionScrollProgress({
  // ... config
  onProgress: (progress, self) => {
    console.log(`Progress: ${Math.round(progress * 100)}%`);
  },
});
```

## Common GSAP Easing Functions

```
none           - Linear
power1.out     - Gentle ease
power2.out     - Medium ease
power3.out     - Strong ease
back.out(1.7)  - Overshoot effect
elastic.out    - Bouncy effect
```

## All Current Sections

| Section | ID | Pin | Animation |
|---------|----|----|-------|
| Hero | `hero-section` | No | Parallax fade |
| Service | `service-section` | Desktop only | Cards fly in |
| ProgressRing | `progress-ring-section` | Yes | SVG arcs, starfield |
| Featured | `featured` | No | Stagger reveal |
| Footer | `footer-section` | No | Static |

## Tips

1. **Always use unique `sectionId`** - prevents conflicts
2. **Position 0 syncs with progress** - animations run with scroll
3. **Use `stagger` for multiple elements** - creates sequence
4. **Test with `markers: true`** - visualize scroll ranges
5. **Keep animations simple** - better performance
6. **Use classes for targeting** - more flexible than IDs

## Getting Timeline Instance

If you need direct access to the timeline:

```jsx
import { useScrollTimeline } from '../../hooks/useScrollTimeline';

const { getSectionTimeline } = useScrollTimeline();
const timeline = getSectionTimeline('my-section-id');
```

## Troubleshooting

**Progress bar not animating?**
- Check that `progressRef` is passed
- Verify ref is on the fill element, not the container

**Animations not working?**
- Check element selectors in `onAnimationSetup`
- Enable `markers: true` to verify scroll range
- Console.log `sectionEl` to debug

**Section not pinning?**
- Set `pin: true`
- Adjust `end` value for longer pin duration
- Check for CSS positioning conflicts

**Elements jumping?**
- Use `from` instead of `to` for initial state
- Set initial CSS state to match animation start
