# Data Layer Guide

> Project: All Skill No Luck — FIFA 2026 World Cup Prophecy Game
> Updated: 2026-04-24

---

## Overview

All match and group data is statically defined in `src/data/`. There is no live API — data is hardcoded for the FIFA 2026 group stage. Prediction state is stored in `PredictionContext` and persisted to `localStorage`.

---

## `src/data/groups.js`

### `GROUPS` array
```js
export const GROUPS = [
  { id: 'A', teams: ['United States', 'Brazil', 'Germany', 'Morocco'] },
  { id: 'B', teams: ['England', 'France', 'Argentina', 'Portugal'] },
  // ... 12 groups total (A–L), 4 teams each = 48 teams
];
```

### `FLAG_MAP` object
Maps each team name to its emoji flag:
```js
export const FLAG_MAP = {
  'United States': '🇺🇸',
  'Brazil': '🇧🇷',
  // ... all 48 teams
};
```

To add a team or fix a flag: edit `FLAG_MAP` in `groups.js`.

---

## `src/data/matches.js`

### Auto-generated matches
```js
// Every team plays every other team in their group once
// Group of 4 → 6 matches (C(4,2) combinations)
// 12 groups × 6 matches = 72 total

export const ALL_MATCHES = generateMatches();
// Shape: [{ id: 'A-0', groupId: 'A', home: 'United States', away: 'Brazil' }, ...]

export const MATCHES_BY_GROUP = {
  'A': [ /* 6 matches */ ],
  'B': [ /* 6 matches */ ],
  // ...
};
```

### Match ID format
`"{groupId}-{matchIndex}"` — e.g. `"A-0"` is Group A's first match (teams[0] vs teams[1]).

### `MOCK_USERS` (leaderboard)
```js
export const MOCK_USERS = [
  { name: 'CristianoFan7', avatar: '🇵🇹', score: 58 },
  // ... 8 mock users with hardcoded scores
];
```

These are static placeholders until a real backend is connected.

---

## `PredictionContext` API

### Provider
Wrap your app (or `main.jsx`) with `<PredictionProvider>`.

### Hook
```js
import { usePredictions } from '../context/PredictionContext';

const {
  predictions,      // { [matchId: string]: 'home' | 'draw' | 'away' }
  setPrediction,    // (matchId: string, result: 'home'|'draw'|'away') => void
  clearPredictions, // () => void — clears all + removes from localStorage
  predictionCount,  // number — live count of picks made
  username,         // string — player name
  setUsername,      // (name: string) => void
  userScore,        // number — mock score (random 20–50)
} = usePredictions();
```

### localStorage keys
| Key | Value |
|---|---|
| `fifa2026_predictions` | JSON stringified predictions object |
| `fifa2026_username` | Plain string username |

---

## Extending Match Data

### Data Sources

The application uses static hardcoded lists for standard definitions:

- **`groups.js`**: Defines the 12 groups (A-L), team compositions, and the `FLAG_MAP` for unicode emoji flags.
- **`matches.js`**: Generates all 72 group stage matches dynamically from the `GROUPS` array on load, ensuring consistent `id` assignments (e.g., `A-0`, `D-2`).
- **`highlights.js`**: Contains static mock data for historical World Cup highlights shown on the Home page.

## Live Match Simulation

To demonstrate real-time locking mechanics, the application includes a **Live Match Simulation**:
- Managed by `LiveMatchContext.jsx`.
- Automatically selects a "Live Match" (e.g., Group A: United States vs Brazil).
- Sets a dynamic `kickoffTime` 15 minutes in the future upon initial load.
- Exposes an `isLocked` state that becomes `true` exactly 10 minutes prior to `kickoffTime`.
- When locked, prediction buttons for this specific match are disabled globally (on both Home and Predict tabs) to simulate real-world betting/prediction constraints.

### Add knockout stage
1. Create `src/data/knockout.js` with structured round data:
```js
export const KNOCKOUT_ROUNDS = [
  {
    id: 'r32',
    label: 'Round of 32',
    matches: [
      { id: 'r32-0', home: 'TBD', away: 'TBD' },
      // ...
    ]
  },
  // QF, SF, Final...
];
```
2. Create `src/sections/Knockout.jsx` — reuse `MatchCard` from `Predict.jsx`
3. Add tab to `Navbar.jsx` TABS array

---

## Backend Integration (Future)

To replace localStorage with a real backend:

1. **Supabase (recommended for quick setup)**
   - Create a `predictions` table: `(user_id, match_id, result, created_at)`
   - Replace `localStorage.setItem` in `PredictionContext` with `supabase.from('predictions').upsert(...)`

2. **Firebase Firestore**
   - Collection: `predictions/{userId}/picks/{matchId}` → `{ result: 'home' }`

3. **Score calculation**
   - Add a `results` table/collection with official match results
   - Calculate score: count of `predictions` where `result === results[matchId]`
   - Points: +3 correct win, +1 correct draw

---

## Updating Mock Results / Teams

When official FIFA 2026 group assignments are finalized, update `src/data/groups.js`:
```js
// Replace placeholder teams with official qualified teams
{ id: 'A', teams: ['OfficialTeam1', 'OfficialTeam2', 'OfficialTeam3', 'OfficialTeam4'] },
```

All 72 matches will auto-regenerate from `generateMatches()`.
