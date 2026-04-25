# Design System Guide

> Project: All Skill No Luck — FIFA 2026 World Cup Prophecy Game
> Updated: 2026-04-26
> Design Inspiration: Goal.com · UEFA.com · FotMob.com

---

## Design Philosophy

The visual language combines three real football platforms:

| Platform     | What We Borrowed                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------- |
| **Goal.com** | True black `#111` bg, orange-red accent, sharp corners, uppercase bold labels, 3px red nav stripe |
| **UEFA.com** | Royal blue group banners, cyan text highlights, authoritative structured layout                   |
| **FotMob**   | Compact data rows, tab underline (not pill), `#0d0d0d` surfaces, clean dividers, live green       |

---

## Color Tokens

All colors are defined in `src/styles/utils/colors.css` via Tailwind v4 `@theme`:

### Backgrounds & Surfaces

| Token             | Value     | Usage                       |
| ----------------- | --------- | --------------------------- |
| `--color-bg`      | `#111111` | Page background (Goal.com)  |
| `--color-surface` | `#1a1a1a` | Elevated surface            |
| `--color-card`    | `#1e1e1e` | Card background             |
| `--color-card-2`  | `#242424` | Card hover / elevated state |

### Borders

| Token              | Value     | Usage           |
| ------------------ | --------- | --------------- |
| `--color-border`   | `#2a2a2a` | Subtle dividers |
| `--color-border-2` | `#333333` | Visible borders |

### Accent — Goal.com Red

| Token                | Value     | Usage                             |
| -------------------- | --------- | --------------------------------- |
| `--color-accent`     | `#f34f36` | Primary CTA, active states, picks |
| `--color-accent-2`   | `#ff6b50` | Hover state                       |
| `--color-accent-dim` | `#c03c27` | Pressed state                     |

### Secondary — UEFA Blue

| Token            | Value     | Usage                            |
| ---------------- | --------- | -------------------------------- |
| `--color-blue`   | `#003da5` | Group header background          |
| `--color-blue-2` | `#0052cc` | Blue hover                       |
| `--color-cyan`   | `#00b2f3` | Group name text (UEFA highlight) |

### Text Scale

| Token             | Value     | Usage          |
| ----------------- | --------- | -------------- |
| `--color-text`    | `#ffffff` | Primary text   |
| `--color-text-2`  | `#cccccc` | Secondary text |
| `--color-muted`   | `#888888` | Muted labels   |
| `--color-muted-2` | `#aaaaaa` | Dimmed text    |

### Status

| Token           | Value     | Usage                         |
| --------------- | --------- | ----------------------------- |
| `--color-green` | `#00a650` | Live / correct (FotMob green) |
| `--color-red`   | `#e53e3e` | Error states                  |

---

## Typography

### Fonts (loaded in `index.html` via Google Fonts)

| Role     | Font           | Usage                                                                       |
| -------- | -------------- | --------------------------------------------------------------------------- |
| Headings | **Bebas Neue** | All `h1`, `.page-title`, `.hero-title`, `.navbar-brand`, `.countdown-value` |
| Body     | **Inter**      | All body text, labels, buttons                                              |

### Size Scale

| Class            | Size                         | Usage                     |
| ---------------- | ---------------------------- | ------------------------- |
| `.page-title`    | `clamp(2rem, 5vw, 3.5rem)`   | Section headings          |
| `.hero-title`    | `clamp(4.5rem, 15vw, 10rem)` | Hero main title           |
| `.section-label` | `0.6rem + uppercase`         | Small red eyebrow labels  |
| `.team-name`     | `0.68rem + uppercase`        | Team names in match cards |
| `.pick-btn`      | `0.6rem + uppercase`         | Pick button labels        |

---

## Component Classes Reference

### Layout

| Class         | Purpose                                                           |
| ------------- | ----------------------------------------------------------------- |
| `.page`       | Max-width 1200px wrapper, padded for nav bars                     |
| `.hero-page`  | Page wrapper with `position: relative; overflow: hidden` for orbs |
| `.match-grid` | Responsive grid: 1 col mobile, auto-fill 260px+ on desktop        |

### Cards

| Class              | Purpose                                      |
| ------------------ | -------------------------------------------- |
| `.card`            | Generic dark card, 4px sharp border-radius   |
| `.match-card`      | Match card with left red accent bar on hover |
| `.summary-card`    | Results summary card with red top border     |
| `.username-prompt` | Leaderboard username input container         |
| `.group-header`    | UEFA blue group banner                       |

### Navigation

| Class             | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| `.navbar`         | Fixed top bar, `#0d0d0d`, 3px red bottom stripe   |
| `.nav-tab-btn`    | Desktop tab — red bottom underline when `.active` |
| `.bottom-nav`     | Mobile fixed bottom bar (hidden on desktop)       |
| `.bottom-nav-btn` | Mobile tab button — red top bar when `.active`    |

### Match Cards

| Class              | Purpose                                       |
| ------------------ | --------------------------------------------- |
| `.match-teams`     | 3-column grid: team-col / vs-label / team-col |
| `.team-flag`       | Flag emoji `2.1rem`                           |
| `.team-name`       | Uppercase team name `0.68rem`                 |
| `.pick-row`        | 3-column grid for pick buttons                |
| `.pick-btn`        | Unpicked state — grey border                  |
| `.pick-btn.picked` | Picked state — solid red background           |

### Group Tabs

| Class               | Purpose                                     |
| ------------------- | ------------------------------------------- |
| `.group-tabs`       | Horizontally-scrollable strip (no wrapping) |
| `.group-tab`        | FotMob-style: underline active, no pill     |
| `.group-tab.active` | White text + red bottom underline           |

### Leaderboard

| Class                         | Purpose                         |
| ----------------------------- | ------------------------------- |
| `.leaderboard-table`          | Full-width collapsed table      |
| `.rank-badge`                 | Rank number square — red for #1 |
| `.rank-1 / .rank-2 / .rank-3` | Gold / silver / bronze styling  |
| `.podium-row-1/2/3`           | Row background tinting          |
| `.user-row`                   | Logged-in user's row highlight  |
| `.score-bar-track`            | Progress bar track              |
| `.score-bar-fill`             | Red fill bar                    |

### Results

| Class              | Purpose                         |
| ------------------ | ------------------------------- |
| `.prophecy-row`    | FotMob fixture-style result row |
| `.prediction-chip` | Small pill badge on each row    |
| `.chip-home`       | UEFA blue chip                  |
| `.chip-draw`       | Grey chip                       |
| `.chip-away`       | Goal.com red chip               |

### Utility

| Class             | Purpose                                |
| ----------------- | -------------------------------------- |
| `.btn-primary`    | Solid red CTA button, sharp corners    |
| `.text-input`     | Dark input field, red focus border     |
| `.progress-track` | Thin 3px progress bar track            |
| `.progress-fill`  | Red fill, smooth width transition      |
| `.section-label`  | Red uppercase eyebrow with dash prefix |

---

## Border Radius Strategy

Following Goal.com's sharp aesthetic:

- Cards: `3–6px` (almost square)
- Buttons: `3px`
- Inputs: `3px`
- Countdown units: `0 0 3px 3px` (flat top, slight bottom)
- No `rounded-xl` or `rounded-full` anywhere except rank badges

---

## Mobile-First Breakpoints

| Breakpoint       | Value     | What changes                                                   |
| ---------------- | --------- | -------------------------------------------------------------- |
| Mobile (default) | `< 480px` | Single-column match grid, 2-column results grid                |
| Tablet+          | `≥ 480px` | Auto-fill match grid, 4-column results grid                    |
| Desktop          | `≥ 641px` | Top navbar tabs visible, bottom nav hidden; wider page padding |

---

## Adding a New CSS Module

1. Create `src/styles/my-feature.css`
2. Add `@import "./styles/my-feature.css";` at the bottom of `src/index.css`
3. Use the existing `@theme` CSS variables from `utils/colors.css` — do not hardcode color hex values outside that file
