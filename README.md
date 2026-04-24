# ⚽ All Skill No Luck — FIFA 2026 Predictor

A FIFA World Cup 2026 online prediction game. Pick match winners across all 12 groups, track your predictions, and compete on the leaderboard.

![FIFA 2026](https://img.shields.io/badge/FIFA-2026-f0a500?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB5PSIuOWVtIiBmb250LXNpemU9IjkwIj7wn6a3PC90ZXh0Pjwvc3ZnPg==)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06b6d4?style=flat-square&logo=tailwindcss)

---

## 🌍 Features

| Tab | Description |
|---|---|
| 🏠 **Home** | Live countdown to the tournament, team/match stats |
| ⚽ **Predict** | Pick winners (Home Win / Draw / Away Win) for all 72 group stage matches |
| 🏆 **Leaderboard** | Enter your name and see how you rank against others |
| 📊 **Results** | Review all your saved predictions with a completion summary |

- **48 teams** across **12 groups** — real FIFA 2026 lineup
- Predictions **persist to localStorage** — your picks survive page refresh
- **Mobile responsive** with hamburger navigation
- Clean dark theme with FIFA gold accent

---

## 🏗 Tech Stack

Following the `SYSTEM_ARCHITECTURE.md` patterns:

| Layer | Tool |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 (Vite plugin) |
| State | React Context API + localStorage |
| Fonts | Bebas Neue (headings) + Inter (body) |

No heavy animation libraries — simple CSS transitions only.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── main.jsx                    # App entry — loader gate + tab routing
├── index.css                   # Master CSS (imports all styles/)
│
├── styles/
│   ├── globals.css             # Tailwind + theme tokens + resets
│   ├── navbar.css              # Glassmorphism nav + tab styles
│   └── components.css          # All component styles
│
├── sections/                   # One file per tab
│   ├── Hero.jsx                # Home — countdown + stats
│   ├── Predict.jsx             # Predict — group tabs + match cards
│   ├── Leaderboard.jsx         # Leaderboard — ranked table
│   └── Results.jsx             # Results — prediction summary
│
├── components/
│   ├── Navbar.jsx              # 4-tab navigation
│   └── Loader.jsx              # Boot screen
│
├── context/
│   └── PredictionContext.jsx   # Global state + localStorage
│
└── data/
    ├── groups.js               # 12 groups × 4 teams + flag emojis
    └── matches.js              # Generated matches + mock leaderboard
```

---

## 🗺 Roadmap

- [ ] Knockout stage predictions (Round of 32, QF, SF, Final)
- [ ] Real-time results via FIFA API integration
- [ ] Backend leaderboard (Firebase / Supabase)
- [ ] Score calculation once matches are played
- [ ] Share predictions as image

---

## 📄 License

MIT © patiHash
