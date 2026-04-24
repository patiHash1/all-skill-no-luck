# All Skill No Luck — Docs Index

> Updated: 2026-04-24
> Project: FIFA 2026 World Cup Prophecy Game

Welcome to the project documentation. This folder covers the architecture, state management, data layer, and design system for the **All Skill No Luck** FIFA 2026 online prediction game.

---

## 📚 Documentation Files

### 1. **IMPLEMENTATION_SUMMARY.md** — Start Here
**Best for:** Project overview, what was built, current file structure

**Contains:**
- App boot sequence and tab routing
- Section implementations (Home, Prophesy, Leaderboard, Prophecies)
- PredictionContext state management pattern
- CSS architecture and design system notes
- Maintenance and extension notes

---

### 2. **ARCHITECTURE_DIAGRAM.md** — Visual Guide
**Best for:** Visual learners, understanding component hierarchy and data flow

**Contains:**
- Component hierarchy diagram
- Data flow visualization (state → UI)
- File organization tree
- Context / hooks dependency graph

---

### 3. **data_layer.md** — Data & State Guide
**Best for:** Understanding match data structure and prediction state

**Contains:**
- `groups.js` structure (12 groups × 4 teams)
- `matches.js` auto-generation logic (72 matches)
- `PredictionContext` API (setPrediction, clearPredictions, usePredictions)
- localStorage persistence pattern
- How to extend to knockout stage

---

### 4. **design_system.md** — Design & CSS Guide
**Best for:** Adding new components, maintaining visual consistency

**Contains:**
- Color palette tokens (Goal.com + UEFA + FotMob inspired)
- Typography scale (Bebas Neue headings + Inter body)
- Component class reference (cards, chips, buttons, badges)
- Mobile-first breakpoint strategy
- How to add a new CSS module

---

## 🎯 Quick Navigation

### I want to...

| Goal | Go to |
|---|---|
| Understand what was built | `IMPLEMENTATION_SUMMARY.md` |
| See how components connect | `ARCHITECTURE_DIAGRAM.md` |
| Add a new group or match | `data_layer.md` → "Extending Match Data" |
| Add a new tab/section | `IMPLEMENTATION_SUMMARY.md` → "Adding a Section" |
| Change colors or typography | `design_system.md` → "Color Tokens" |
| Add backend / real leaderboard | `data_layer.md` → "Backend Integration" |
| Understand prediction state | `data_layer.md` → "PredictionContext API" |

---

## 📖 Reading Order

### For New Developers
1. `IMPLEMENTATION_SUMMARY.md` — Understand the project end-to-end
2. `ARCHITECTURE_DIAGRAM.md` — See how it's structured visually
3. `data_layer.md` — Understand state and data
4. `design_system.md` — Learn the design language

### For Quick Tasks
- Adding a match/group → `data_layer.md`
- Fixing a style → `design_system.md`
- Adding a tab → `IMPLEMENTATION_SUMMARY.md`

---

## 🔑 Current Project Structure

```
all-skill-no-luck/
├── index.html                  # Entry HTML — fonts, root mount, mobile meta
├── vite.config.js              # Vite 6 + Tailwind v4 Vite plugin
├── package.json                # React 19, Vite, Tailwind v4
├── .gitignore
├── README.md
│
├── public/
│   └── favicon.svg             # Football emoji favicon
│
├── docs/                       # ← YOU ARE HERE
│   ├── DOCS_INDEX.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── ARCHITECTURE_DIAGRAM.md
│   ├── data_layer.md
│   └── design_system.md
│
└── src/
    ├── main.jsx                # App entry — loader gate, tab routing, providers
    ├── index.css               # Master CSS (imports all from styles/)
    │
    ├── utils/                  # Design tokens (outside styles)
    │   └── colors.css          # @theme design tokens (colors + fonts)
    │
    ├── styles/                 # Modular CSS (one file per concern)
    │   ├── globals.css         # Body resets, scrollbar, base elements
    │   ├── navbar.css          # Top nav + mobile bottom nav
    │   └── components.css      # All component styles
    │
    ├── sections/               # One file per tab
    │   ├── Home.jsx            # Home tab — countdown, stats, CTA
    │   ├── Predict.jsx         # Prophesy tab — group picker + match cards
    │   ├── Leaderboard.jsx     # Leaderboard tab — ranked table
    │   └── Results.jsx         # Prophecies tab — prediction summary
    │
    ├── components/             # Shared reusable components
    │   ├── Navbar.jsx          # 4-tab nav (desktop top + mobile bottom)
    │   └── Loader.jsx          # Boot screen (1.2s gate)
    │
    ├── context/
    │   └── PredictionContext.jsx  # Global state + localStorage persistence
    │
    └── data/
        ├── groups.js           # 12 groups, 48 teams, flag emoji map
        └── matches.js          # Auto-generated 72 matches + mock leaderboard
```

---

## 🔗 External Resources

- **React 19:** https://react.dev/
- **Vite 6:** https://vitejs.dev/
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **Goal.com (design reference):** https://www.goal.com
- **UEFA.com (design reference):** https://www.uefa.com
- **FotMob (design reference):** https://www.fotmob.com
