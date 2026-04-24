# SYSTEM_ARCHITECTURE.md

> Project: **All Skill No Luck**
> Type: FIFA 2026 World Cup Prophecy Game
> Updated: 2026-04-24

---

## Overview

**All Skill No Luck** is a mobile-first, single-page web application where users give "prophecies" (predictions) for all 72 FIFA 2026 group stage matches, compete on a leaderboard, and review their full prophecy breakdown.

The app is intentionally **serverless and offline-capable** — all state persists in `localStorage` with no backend required. A real backend can be added later (see `docs/data_layer.md`).

---

## Technology Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| **UI Framework** | React | 19 | Functional components only, no class components |
| **Build Tool** | Vite | 7 (rolldown) | `@tailwindcss/vite` plugin for CSS |
| **Styling** | Tailwind CSS | v4 | `@theme` tokens, no utility classes in JSX |
| **State** | React Context API | — | `PredictionContext` — no Redux/Zustand |
| **Persistence** | localStorage | — | Predictions + username |
| **Language** | JavaScript (JSX) | ES2022 | No TypeScript |
| **Fonts** | Google Fonts | — | Bebas Neue (headings) + Inter (body) |
| **Icons** | Unicode emoji | — | Flags, sport icons — no icon library |
| **Routing** | None | — | Custom `useState` tab switching in `main.jsx` |
| **Animations** | CSS only | — | No GSAP, Framer Motion, or animation libraries |

---

## Project Structure

```
all-skill-no-luck/
├── index.html                    # Entry point: fonts, viewport, mobile meta, PWA tags
├── vite.config.js                # Vite + @tailwindcss/vite plugin config
├── package.json
├── .gitignore
├── README.md
│
├── public/
│   └── favicon.svg
│
├── docs/                         # Project documentation
│   ├── DOCS_INDEX.md             # Navigation hub
│   ├── IMPLEMENTATION_SUMMARY.md # What was built, boot sequence, sections
│   ├── ARCHITECTURE_DIAGRAM.md   # Component hierarchy, data flow diagrams
│   ├── data_layer.md             # Data structures, context API, backend roadmap
│   └── design_system.md          # Color tokens, typography, component class ref
│
└── src/
    ├── main.jsx                  # App root: loader gate, tab state, providers
    ├── index.css                 # CSS entry: @import chain
    │
    ├── utils/                    # Design tokens
    │   └── colors.css            # @theme tokens: all --color-* and --font-* vars
    │
    ├── styles/                   # Modular CSS — one file per concern
    │   ├── globals.css           # Body resets, scrollbar, base element styles
    │   ├── navbar.css            # Top nav + mobile bottom nav
    │   └── components.css        # All component and section styles
    │
    ├── sections/                 # Full-page tab views
    │   ├── Hero.jsx              # Home — countdown, stats, CTA
    │   ├── Predict.jsx           # Prophesy — group selector + match cards
    │   ├── Leaderboard.jsx       # Leaderboard — ranked table + username join
    │   └── Results.jsx           # Prophecies — full prediction review
    │
    ├── components/               # Shared UI components
    │   ├── Navbar.jsx            # 4-tab navigation (desktop top / mobile bottom)
    │   └── Loader.jsx            # Boot screen (shown during 1.2s gate)
    │
    ├── context/
    │   └── PredictionContext.jsx # Global prediction state + localStorage sync
    │
    └── data/
        ├── groups.js             # GROUPS array (12 groups × 4 teams), FLAG_MAP
        └── matches.js            # ALL_MATCHES, MATCHES_BY_GROUP, MOCK_USERS
```

---

## Architecture Principles

### 1. Modular CSS Only
All CSS lives in `src/styles/`. No inline style objects (except for dynamic values like `width: \`${n}%\``). All colors and fonts use `@theme` CSS variable tokens — never hardcoded hex values outside `globals.css`.

### 2. Single Responsibility Sections
Each tab has exactly one section file in `src/sections/`. Sections only do one thing — they never import other sections.

### 3. Context-Driven State
There is **one** global context: `PredictionContext`. It exposes all cross-section state (`predictions`, `username`, `userScore`, `predictionCount`). Sections access it via `usePredictions()`.

No prop drilling beyond `activeTab`/`setActiveTab` in `Navbar`.

### 4. Static Data
All match data is statically defined. The `generateMatches()` function in `matches.js` produces all 72 matches from `GROUPS` automatically — no hardcoding 72 individual match objects.

### 5. Mobile-First
Default styles target `< 480px`. Desktop enhancements use `@media (min-width: N)`. The bottom navigation bar is hidden on desktop (≥641px) and the top nav bar is hidden on mobile.

### 6. No Heavy Libraries
Only React + Vite + Tailwind v4. No animation libraries, no icon libraries, no utility libraries. CSS transitions and `filter: blur()` provide all visual polish.

### 7. No Router
Tab routing is a single `useState('home')` in `main.jsx`. Conditional rendering is used instead of React Router because there are only 4 views and no URL-driven navigation requirements.

---

## Data Flow

```
src/data/groups.js         → GROUPS, FLAG_MAP
src/data/matches.js        → MATCHES_BY_GROUP, MOCK_USERS
          │
          ▼
PredictionContext.jsx       → predictions{}, username, userScore
          │
          ├── <Hero />       reads: predictionCount
          ├── <Predict />    reads: predictions, setPrediction
          ├── <Leaderboard /> reads: username, setUsername, userScore
          └── <Results />    reads: predictions, clearPredictions
```

---

## CSS Architecture

```
src/index.css
  ├── @import "tailwindcss"                    # Tailwind v4 engine
  ├── @import "./utils/colors.css"             # @theme tokens — loaded FIRST
  ├── @import "./styles/globals.css"           # resets + body — uses token vars
  ├── @import "./styles/navbar.css"            # .navbar, .nav-tab-btn, .bottom-nav*
  └── @import "./styles/components.css"        # Everything else
```

The `@theme` block in `globals.css` makes all design tokens available as CSS custom properties (`--color-accent`, `--font-heading`, etc.) globally.

---

## Design System Summary

Inspired by three professional football platforms:

| Platform | Influence |
|---|---|
| **Goal.com** | True black `#111111` bg, orange-red `#f34f36` accent, sharp 3–6px border-radius, 3px red navbar stripe, uppercase labels |
| **UEFA.com** | Royal blue `#003da5` group headers, cyan `#00b2f3` highlights, authoritative typography |
| **FotMob** | `#0d0d0d` surfaces, FotMob-style tab underlines (not pills), compact data rows, thin dividers |

---

## Mobile-First Navigation

| Viewport | Navigation |
|---|---|
| `≤ 640px` | Fixed bottom tab bar (4 tabs: icon + label) — native app feel |
| `≥ 641px` | Fixed top navbar with horizontal tab buttons |

The bottom nav uses `env(safe-area-inset-bottom)` for iPhone notch/home indicator support. The viewport meta tag includes `viewport-fit=cover` and Apple PWA meta tags so the app can be saved to Home Screen.

---

## Extending the Application

### Add a new tab
1. Create `src/sections/NewSection.jsx`
2. Add `{ id: 'new-tab', icon: '⚡', label: '⚡ Tab', shortLabel: 'Tab' }` to `TABS` in `Navbar.jsx`
3. Add `{activeTab === 'new-tab' && <NewSection />}` in `main.jsx`

### Add knockout stage
See `docs/data_layer.md` → "Extending Match Data"

### Connect a real leaderboard
See `docs/data_layer.md` → "Backend Integration"

### Change the color scheme
Edit CSS variable values in `src/styles/globals.css` `@theme` block only — all other files automatically update.

---

## Running Locally

```bash
npm install
npm run dev          # starts Vite dev server at http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview production build
```

## Deployment

Static site — deploy `dist/` to any static host:
- **Vercel:** `vercel --prod`
- **Netlify:** drag and drop `dist/`
- **GitHub Pages:** use `vite-plugin-gh-pages`
