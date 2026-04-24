# Scroll Timeline System Documentation

> Updated: 2026-03-14

## Overview

A centralized, anime.js-inspired timeline-based scrolling system for managing scroll animations across all sections of the portfolio website. This system provides:

- **Main Timeline**: Global scroll progress tracking from top to bottom
- **Section Sub-Timelines**: Individual scroll animations for each section (0-100%)
- **Reusable Components**: Consistent progress bars and animation patterns
- **Centralized Management**: Single source of truth for all scroll animations

## Architecture

```
src/
├── context/
│   ├── ScrollTimelineContext.js       # Context definition
│   └── ScrollTimelineProvider.jsx     # Provider component with timeline registry
├── hooks/
│   ├── useScrollTimeline.js           # Access to timeline context
│   └── useSectionScrollProgress.js    # Reusable section timeline hook
└── components/
    └── ProgressBar.jsx               # Reusable progress bar component
```

## Core Components

### 1. ScrollTimelineContext & Provider

**File**: `src/context/ScrollTimelineContext.js` & `src/context/ScrollTimelineProvider.jsx`

The provider manages:
- Main timeline for overall page scroll
- Registry of all section timelines
- Automatic cleanup on unmount

```jsx
import { ScrollTimelineProvider } from './context/ScrollTimelineProvider';

function App() {
  return (
    <ScrollTimelineProvider>
      {/* Your sections here */}
    </ScrollTimelineProvider>
  );
}
```

### 2. useSectionScrollProgress Hook

**File**: `src/hooks/useSectionScrollProgress.js`

A powerful, reusable hook for creating section-based scroll animations.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sectionId` | string | required | Unique identifier for the section |
| `sectionRef` | RefObject | required | Ref to the section DOM element |
| `progressRef` | RefObject | null | Optional ref to progress bar fill element |
| `start` | string | 'top top' | ScrollTrigger start position |
| `end` | string | '+=150%' | ScrollTrigger end position |
| `pin` | boolean | true | Whether to pin the section during scroll |
| `markers` | boolean | false | Show ScrollTrigger debug markers |
| `scrub` | number | 1 | Scrub smoothness (0 = instant, higher = smoother) |
| `onAnimationSetup` | function | null | Callback to add custom animations to the timeline |
| `onProgress` | function | null | Callback fired on scroll progress updates |

#### Basic Usage

```jsx
import { useRef } from 'react';
import { useSectionScrollProgress } from '../../hooks/useSectionScrollProgress';
import ProgressBar from '../../components/ProgressBar';

function MySection() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);

  useSectionScrollProgress({
    sectionId: 'my-section',
    sectionRef,
    progressRef,
    start: 'top top',
    end: '+=120%',
    pin: false,
  });

  return (
    <section ref={sectionRef}>
      {/* Your content */}
      <ProgressBar ref={progressRef} height={8} fillColor="#3b82f6" />
    </section>
  );
}
```

#### Advanced Usage with Custom Animations

```jsx
useSectionScrollProgress({
  sectionId: 'hero-section',
  sectionRef,
  progressRef,
  start: 'top top',
  end: '+=100%',
  pin: false,
  onAnimationSetup: (timeline, sectionEl) => {
    // Add custom animations to the timeline
    const heading = sectionEl.querySelector('h1');
    const content = sectionEl.querySelector('.content');
    
    // Animations run in parallel with progress bar (position 0)
    timeline.to(heading, {
      opacity: 0.5,
      y: -50,
      ease: 'none',
    }, 0);
    
    // Staggered animations
    timeline.from('.cards', {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out',
    }, 0);
  },
  onProgress: (progress, self) => {
    console.log(`Section progress: ${progress * 100}%`);
  },
});
```

### 3. ProgressBar Component

**File**: `src/components/ProgressBar.jsx`

Reusable progress bar component with customizable styling.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | number | 12 | Height of the progress bar in pixels |
| `rounded` | boolean | true | Use rounded corners |
| `trackColor` | string | 'rgba(209, 213, 219, 0.8)' | Background track color |
| `fillColor` | string | '#ef4444' | Fill color |
| `className` | string | '' | Additional CSS classes |
| `ariaLabel` | string | 'Scroll progress' | Accessibility label |

#### Usage

```jsx
<ProgressBar 
  ref={progressRef} 
  height={8} 
  fillColor="#10b981"
  ariaLabel="Section progress"
/>
```

## Implementation Examples

### Example 1: Hero Section (Fade Out on Scroll)

```jsx
useSectionScrollProgress({
  sectionId: 'hero-section',
  sectionRef,
  progressRef,
  start: 'top top',
  end: '+=100%',
  pin: false,
  onAnimationSetup: (timeline, sectionEl) => {
    const content = sectionEl.querySelector('.hero-content');
    timeline.to(content, {
      opacity: 0.3,
      y: -50,
      ease: 'none',
    }, 0);
  },
});
```

### Example 2: Service Section (Slide-In Animations)

```jsx
useSectionScrollProgress({
  sectionId: 'service-section',
  sectionRef,
  progressRef,
  start: 'top top',
  end: '+=120%',
  pin: false,
  onAnimationSetup: (timeline, sectionEl) => {
    const topCenter = sectionEl.querySelector('.top-center');
    const bottomLeft = sectionEl.querySelector('.bottom-left');
    const bottomRight = sectionEl.querySelector('.bottom-right');
    
    timeline.from(topCenter, { y: -100, opacity: 0, ease: 'power2.out' }, 0);
    timeline.from(bottomLeft, { x: -100, opacity: 0, ease: 'power2.out' }, 0.2);
    timeline.from(bottomRight, { x: 100, opacity: 0, ease: 'power2.out' }, 0.2);
  },
});
```

### Example 3: Progress Ring Section (Stagger Animation)

```jsx
useSectionScrollProgress({
  sectionId: 'progress-ring-section',
  sectionRef,
  progressRef,
  start: 'top center',
  end: 'bottom center',
  pin: false,
  onAnimationSetup: (timeline, sectionEl) => {
    const items = sectionEl.querySelectorAll('.progress-item');
    timeline.from(items, {
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      ease: 'back.out(1.7)',
    }, 0);
  },
});
```

### Example 4: Graph Section (Pinned with Spaceship Animation)

```jsx
useSectionScrollProgress({
  sectionId: 'graph-section',
  sectionRef,
  progressRef,
  start: 'top top',
  end: '+=150%',
  pin: true,  // Section stays in place while scrolling
  markers: false,
});
```

## Current Section Configuration

| Section | ID | Start | End | Pin | Animations |
|---------|----|----|-----|-----|------------|
| Hero | `hero-section` | top top | +=200% | Yes | Arrow fade, image parallax |
| Service | `service-section` | top top | +=2800 (desktop) | Desktop only | Cards fly in, bg morph |
| ProgressRing | `progress-ring-section` | top top | +=350% | Yes | SVG arcs, starfield, sprites |
| Featured | `featured` | — | — | No | GSAP stagger on viewport entry |
| Footer | `footer-section` | — | — | No | Static layout |

## GSAP ScrollTrigger Reference

### Common Start/End Values

- `'top top'` - Section top hits viewport top
- `'top center'` - Section top hits viewport center
- `'top bottom'` - Section top hits viewport bottom
- `'bottom top'` - Section bottom hits viewport top
- `'bottom center'` - Section bottom hits viewport center
- `'bottom bottom'` - Section bottom hits viewport bottom
- `'+=150%'` - Extend scroll range by 150% of viewport height

### Animation Timeline Position

When adding animations to the timeline in `onAnimationSetup`:

```jsx
// Position 0 - runs in sync with progress bar (0-100%)
timeline.to(element, { opacity: 0 }, 0);

// Position 0.2 - starts at 20% of timeline
timeline.from(element, { y: 100 }, 0.2);

// No position (or '+=0') - starts after previous animation
timeline.to(element, { scale: 1.5 });
```

## Benefits

1. **Maintainability**: All scroll animations managed from one system
2. **Consistency**: Same progress tracking across all sections
3. **Flexibility**: Easy to customize per section via callbacks
4. **Performance**: GSAP's optimized ScrollTrigger with proper cleanup
5. **Scalability**: Easy to add new sections with scroll animations
6. **Developer Experience**: Clear, declarative API similar to anime.js

## Adding a New Section

1. Import the hook and ProgressBar:
```jsx
import { useSectionScrollProgress } from '../../../hooks/useSectionScrollProgress';
import ProgressBar from '../4_GraphSection/ProgressBar';
```

2. Create refs:
```jsx
const sectionRef = useRef(null);
const progressRef = useRef(null);
```

3. Setup the timeline:
```jsx
useSectionScrollProgress({
  sectionId: 'new-section',
  sectionRef,
  progressRef,
  start: 'top center',
  end: 'bottom center',
  pin: false,
  onAnimationSetup: (timeline, sectionEl) => {
    // Your animations here
  },
});
```

4. Add refs and ProgressBar to JSX:
```jsx
<section ref={sectionRef}>
  {/* content */}
  <ProgressBar ref={progressRef} height={8} fillColor="#your-color" />
</section>
```

## Debugging

Enable ScrollTrigger markers to see scroll ranges:

```jsx
useSectionScrollProgress({
  // ... other config
  markers: true,  // Shows visual markers for debugging
});
```

## Migration from Old System

The old `usePinnedScrollProgress` hook has been replaced. Update like this:

**Before:**
```jsx
usePinnedScrollProgress({ 
  sectionRef, 
  fillRef: progressFillRef, 
  start: "top top", 
  end: "+=150%", 
  pin: true 
});
```

**After:**
```jsx
useSectionScrollProgress({
  sectionId: 'unique-id',
  sectionRef,
  progressRef: progressFillRef,
  start: 'top top',
  end: '+=150%',
  pin: true,
});
```

## Performance Considerations

- All timelines use `scrub: 1` for smooth 60fps animations
- `force3D: true` ensures GPU acceleration
- Proper cleanup prevents memory leaks
- ScrollTrigger's `invalidateOnRefresh` handles responsive layouts

## Future Enhancements

Potential additions to the system:
- Global scroll progress indicator
- Section navigation based on timeline progress
- Scroll velocity-based effects
- Timeline playback controls (pause/resume)
- Animation presets library
