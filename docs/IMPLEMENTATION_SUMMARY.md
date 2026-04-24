# Implementation Summary

> Project: All Skill No Luck — FIFA 2026 World Cup Prophecy Game
> Updated: 2026-04-24

---

## What Was Built

A mobile-first, 4-tab FIFA 2026 World Cup online prediction game. Users pick match results (Home Win / Draw / Away Win) for all 72 group stage matches across 12 groups, join a leaderboard, and review their prophecies.

---

## App Boot Sequence

```
index.html
  └─▶ src/main.jsx
        1. Waits 1200ms minimum (loader gate)
        2. Shows <Loader /> (FIFA-themed boot screen)
        3. Mounts:
            <PredictionProvider>     ← global state + localStorage
              <Navbar />             ← 4-tab nav (desktop top / mobile bottom)
              <main>
                {activeTab === 'home'}        → <Hero />
                {activeTab === 'predict'}     → <Predict />
                {activeTab === 'leaderboard'} → <Leaderboard />
                {activeTab === 'results'}     → <Results />
              </main>
            </PredictionProvider>
```

Tab state (`activeTab`) lives in `App` inside `main.jsx` and is passed down to `Navbar` via props.

---

## Section Implementations

### 🏠 Home (`sections/Home.jsx`)
| Aspect | Detail |
|---|---|
| Live countdown | `useEffect` + `setInterval` targeting June 11 2026 00:00 UTC |
| Stats strip | Reads `predictionCount` from `usePredictions()` — live "0 prophecies" counter |
| CTA | Calls `onPredict()` prop → sets `activeTab = 'predict'` in parent |
| Decorative orbs | Two absolutely-positioned blurred radial gradient divs (`hero-orb-1/2`) |
| No scroll animations | Simple static layout; no GSAP or Framer Motion |

### ⚽ Predict (`sections/Predict.jsx`)
| Aspect | Detail |
|---|---|
| Group selector | Horizontally-scrollable tab strip (A–L), active = red underline (FotMob style) |
| Match cards | 6 per group, generated from `MATCHES_BY_GROUP[activeGroup]` |
| Pick buttons | 3-way: Home Win / Draw / Away Win — stored as `'home' \| 'draw' \| 'away'` |
| Group header | UEFA royal blue banner showing group name + teams + count |
| Progress bar | `predictionCount / 72 * 100%` width |
| State | `setPrediction(matchId, result)` from `usePredictions()` |

### 🏆 Leaderboard (`sections/Leaderboard.jsx`)
| Aspect | Detail |
|---|---|
| Username | Stored in `PredictionContext` + localStorage; shown in a top-accent card |
| Ranking | `MOCK_USERS` + current user sorted by `.score` desc |
| Podium rows | Top 3 rows get CSS classes `podium-row-1/2/3` for accent tinting |
| Score | `userScore` is a random value set once on first load (mock until real results) |
| Score bar | Width = `(score / 72) * 100%` |

### 🔮 Prophecies (`sections/Results.jsx`)
| Aspect | Detail |
|---|---|
| Empty state | Shown when `predictionCount === 0` with prompt to go to Prophesy tab |
| Summary cards | Prophecies Given / Remaining / Complete % / Score (pending) |
| Group breakdown | Iterates `GROUPS`, filters `predictions` per group, renders prophecy rows |
| Chip colors | Home = UEFA blue, Draw = grey, Away = Goal.com red |
| Clear button | `clearPredictions()` with confirm dialog |

---

## PredictionContext State

```js
// Stored shape in localStorage key: 'fifa2026_predictions'
{
  "A-0": "home",   // matchId → 'home' | 'draw' | 'away'
  "B-3": "draw",
  ...
}

// Hook API
const {
  predictions,        // { [matchId]: 'home'|'draw'|'away' }
  setPrediction,      // (matchId, result) => void
  clearPredictions,   // () => void
  predictionCount,    // number of keys in predictions
  username,           // string (localStorage)
  setUsername,        // (name: string) => void
  userScore,          // random mock score (20–50)
} = usePredictions();
```

---

## CSS Architecture

`src/index.css` is the single entry point:
```css
@import "tailwindcss";          /* Tailwind v4 — via @tailwindcss/vite plugin */
@import "./styles/globals.css"; /* @theme tokens, body resets, scrollbar */
@import "./styles/navbar.css";  /* .navbar, .bottom-nav, .nav-tab-btn */
@import "./styles/components.css"; /* all component styles */
```

| File | Contents |
|---|---|
| `globals.css` | Tailwind `@theme` tokens (colors, fonts), body reset, `::selection` |
| `navbar.css` | Top nav with 3px red bottom stripe; bottom nav with red top indicator |
| `components.css` | Cards, match cards, pick buttons, group tabs, leaderboard, hero, countdown, stats, results, chips, progress bar |

### Design Tokens (from `globals.css`)
| Token | Value | Origin |
|---|---|---|
| `--color-bg` | `#111111` | Goal.com |
| `--color-accent` | `#f34f36` | Goal.com orange-red |
| `--color-blue` | `#003da5` | UEFA royal blue |
| `--color-cyan` | `#00b2f3` | UEFA cyan |
| `--color-green` | `#00a650` | FotMob live green |
| `--font-heading` | Bebas Neue | — |
| `--font-body` | Inter | — |

---

## Adding a New Section (Tab)

1. Create `src/sections/MySection.jsx`
2. Add to `TABS` array in `src/components/Navbar.jsx`: `{ id: 'my-section', icon: '🎯', label: '🎯 My Section', shortLabel: 'My Tab' }`
3. Import and render in `src/main.jsx`: `{activeTab === 'my-section' && <MySection />}`
4. Add any section-specific styles to `src/styles/components.css`

---

## Extending to Knockout Stage

The data layer only has group stage (72 matches). To add knockout:
1. Add `src/data/knockout.js` with Round of 32, QF, SF, Final match data
2. Create `src/sections/Knockout.jsx` following the same pattern as `Predict.jsx`
3. Add a "Knockout" tab

---

## Backend / Real Leaderboard

Currently all state is `localStorage` only. To add real multi-user leaderboard:
- Replace `MOCK_USERS` in `matches.js` with a Supabase/Firebase fetch
- Replace `userScore` random value with a calculated score from an API
- Store predictions server-side on each `setPrediction` call
