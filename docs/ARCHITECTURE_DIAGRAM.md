# Architecture Diagram

> Project: All Skill No Luck — FIFA 2026 World Cup Prophecy Game
> Updated: 2026-04-24

---

## Component Hierarchy

```
main.jsx  (App)
│
├── <Loader />                    ← shown for 1.2s on first load
│
├── <PredictionProvider>          ← context/PredictionContext.jsx
│     Provides: predictions, setPrediction, clearPredictions,
│               predictionCount, username, setUsername, userScore
│
│   ├── <Navbar />                ← components/Navbar.jsx
│   │     Props: activeTab, setActiveTab
│   │     Renders:
│   │       [desktop] top nav bar with 4 tab buttons
│   │       [mobile]  fixed bottom nav bar with 4 tab buttons
│   │
│   └── <main>
│         │
│         ├── <Home />            ← sections/Home.jsx (activeTab='home')
│         │     Reads:  usePredictions() → predictionCount
│         │     Emits:  onPredict() → setActiveTab('predict')
│         │     Local:  useCountdown() hook (setInterval)
│         │
│         ├── <Predict />         ← sections/Predict.jsx (activeTab='predict')
│         │     Reads:  usePredictions() → predictions, setPrediction, predictionCount
│         │     Data:   GROUPS, MATCHES_BY_GROUP from src/data/
│         │     Local:  useState(activeGroup) = 'A'
│         │
│         ├── <Leaderboard />     ← sections/Leaderboard.jsx (activeTab='leaderboard')
│         │     Reads:  usePredictions() → username, setUsername, userScore
│         │     Data:   MOCK_USERS from src/data/matches.js
│         │     Local:  useState(draft) for name input
│         │
│         └── <Results />         ← sections/Results.jsx (activeTab='results')
│               Reads:  usePredictions() → predictions, predictionCount, clearPredictions
│               Data:   GROUPS, MATCHES_BY_GROUP, FLAG_MAP from src/data/
```

---

## Data Flow

```
User clicks pick button
        │
        ▼
<Predict /> calls setPrediction(matchId, result)
        │
        ▼
PredictionContext updates predictions state
        │
        ├──▶ localStorage.setItem('fifa2026_predictions', JSON.stringify(predictions))
        │
        └──▶ Re-renders:
               • <Predict />     → pick button highlights gold
               • <Hero />        → predictionCount stat updates live
               • <Results />     → prophecy row appears
               • <Leaderboard /> → (unaffected by predictions directly)
```

---

## State Architecture

```
PredictionContext (localStorage-persisted)
│
├── predictions: Record<matchId, 'home'|'draw'|'away'>
│     Key format:  "{groupId}-{matchIndex}"  e.g. "A-0", "B-3"
│     Persisted:   localStorage key "fifa2026_predictions"
│
├── username: string
│     Persisted:   localStorage key "fifa2026_username"
│
├── userScore: number
│     Not persisted (random 20–50 per session, mock until real results)
│
└── predictionCount: number  (derived: Object.keys(predictions).length)
```

---

## File Organization Tree

```
all-skill-no-luck/
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── README.md
│
├── public/
│   └── favicon.svg
│
├── docs/
│   ├── DOCS_INDEX.md           ← navigation hub
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── ARCHITECTURE_DIAGRAM.md ← this file
│   ├── data_layer.md
│   └── design_system.md
│
└── src/
    ├── main.jsx
    ├── index.css
    │
    ├── utils/
    │   └── colors.css             @theme tokens (colors + fonts)
    │
    ├── styles/
    │   ├── globals.css         resets + body
    │   ├── navbar.css          top + bottom nav
    │   └── components.css      all component styles
    │
    ├── sections/
    │   ├── Home.jsx            tab: home
    │   ├── Predict.jsx         tab: predict
    │   ├── Leaderboard.jsx     tab: leaderboard
    │   └── Results.jsx         tab: results
    │
    ├── components/
    │   ├── Navbar.jsx
    │   └── Loader.jsx
    │
    ├── context/
    │   └── PredictionContext.jsx
    │
    └── data/
        ├── groups.js           GROUPS array, FLAG_MAP
        └── matches.js          ALL_MATCHES, MATCHES_BY_GROUP, MOCK_USERS
```

---

## CSS Dependency Graph

```
src/index.css
  │
  ├── @import "tailwindcss"                   ← Tailwind v4 (via @tailwindcss/vite)
  ├── @import "./utils/colors.css"            ← @theme CSS vars — loaded FIRST
  ├── @import "./styles/globals.css"          ← resets + body; uses token vars
  ├── @import "./styles/navbar.css"           ← uses: --color-accent, --color-bg, --font-heading
  └── @import "./styles/components.css"
        Uses all @theme vars:
          --color-bg, --color-card, --color-card-2
          --color-border, --color-border-2
          --color-accent, --color-accent-2, --color-accent-dim
          --color-blue, --color-cyan
          --color-text, --color-text-2, --color-muted, --color-muted-2
          --font-heading, --font-body
```

---

## Tab Routing (No React Router)

Tab state is managed in `main.jsx` with `useState`:

```
activeTab: 'home' | 'predict' | 'leaderboard' | 'results'
     │
     ├── passed to <Navbar activeTab setActiveTab />
     │         → user clicks tab → setActiveTab(id)
     │
     └── used in <main> to conditionally render section:
           {activeTab === 'home'        && <Hero />}
           {activeTab === 'predict'     && <Predict />}
           {activeTab === 'leaderboard' && <Leaderboard />}
           {activeTab === 'results'     && <Results />}
```
