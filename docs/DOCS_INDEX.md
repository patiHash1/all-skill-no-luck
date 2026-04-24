# Docs — Index & Navigation

> Updated: 2026-03-14

Welcome to the portfolio documentation. This folder covers the scroll timeline system, asset management, and localization.

---

## 📚 Documentation Files

### 1. **IMPLEMENTATION_SUMMARY.md** — Start Here!
**Best for:** Project overview, what was built, current file structure

**Contains:**
- Section implementations and animation strategies
- App boot sequence
- Featured hybrid video preload system
- Modular CSS architecture
- Maintenance notes

---

### 2. **scroll_timeline_quick_reference.md** — For Daily Use
**Best for:** Quick code snippets, common patterns, troubleshooting

**Contains:**
- Quick setup guide for new sections
- Common GSAP animation patterns (copy-paste ready)
- ScrollTrigger position guide
- Debugging tips

---

### 3. **scroll_timeline_system.md** — Deep Dive
**Best for:** Understanding architecture, API details, advanced usage

**Contains:**
- Architecture overview
- `useSectionScrollProgress` hook API reference
- Parameter descriptions and examples
- Performance considerations

---

### 4. **ARCHITECTURE_DIAGRAM.md** — Visual Guide
**Best for:** Visual learners, system architecture understanding

**Contains:**
- Component hierarchy diagrams
- Data flow visualization
- Timeline structure
- File organization tree
- Dependency graph

---

### 5. **centralizated.md** — Asset Management
**Best for:** Understanding centralised asset loading via JSON

**Contains:**
- JSON structure for images, SVGs, GIFs, videos
- How to access assets via `useLocale()` (media object)
- How to add new assets

---

### 6. **change_localized_files.md** — i18n Guide
**Best for:** Adding or changing languages

**Contains:**
- Localization file structure (`public/locales/`, `public/media/`)
- How to switch language via `setLanguageIndex()`
- How to add a new language

---

## 🎯 Quick Navigation

### I want to...

| Goal | Go to |
|------|-------|
| Understand what was built | `IMPLEMENTATION_SUMMARY.md` |
| Add a new section with scroll animations | `scroll_timeline_quick_reference.md` → "Quick Setup" |
| Customize existing animations | `scroll_timeline_quick_reference.md` → "Common Patterns" |
| Understand the architecture | `ARCHITECTURE_DIAGRAM.md` |
| Debug an animation issue | `scroll_timeline_quick_reference.md` → "Troubleshooting" |
| Learn all API options | `scroll_timeline_system.md` → "useSectionScrollProgress Hook" |
| Manage assets | `centralizated.md` |
| Add a language | `change_localized_files.md` |

---

## 📖 Reading Order

### For New Developers
1. `IMPLEMENTATION_SUMMARY.md` — Understand what exists
2. `ARCHITECTURE_DIAGRAM.md` — See how it's structured
3. `scroll_timeline_quick_reference.md` — Start implementing
4. `scroll_timeline_system.md` — Deep dive when needed

### For Quick Implementation
1. `scroll_timeline_quick_reference.md` — Get code snippets
2. `scroll_timeline_system.md` — Reference API when needed

---

## 🔑 Current Project Structure

```
src/
├── main.jsx                  # React root + GSAP plugin registration
├── App.jsx                   # Providers, image preload, section order
├── index.css                 # Master stylesheet (imports from styles/)
│
├── styles/                   # Modular CSS (one file per concern)
│   ├── globals.css
│   ├── navbar.css
│   ├── progress-ring.css
│   ├── aurora.css
│   └── footer.css
│
├── sections/                 # Full-page sections
│   ├── Hero.jsx
│   ├── Service.jsx
│   ├── ProgressRing.jsx
│   ├── UfoGraph.jsx
│   ├── Featured.jsx
│   └── Footer.jsx
│
├── components/               # Shared components
│   ├── Navbar.jsx
│   ├── loader.jsx
│   ├── ProgressBar.jsx
│   └── ui/                   # Magic UI primitives
│
├── context/                  # React contexts
│   ├── LocaleContext.jsx
│   ├── ScrollTimelineProvider.jsx
│   ├── ScrollTimelineContext.js
│   └── languages.js
│
├── hooks/                    # Custom hooks
│   ├── useSectionScrollProgress.js
│   └── useScrollTimeline.js
│
├── data/
│   └── featuredWorks.js
│
├── lib/
│   └── utils.jsx
│
└── utils/
    ├── preloadImage.js
    └── sendReview.js
```

---

## 🔗 External Resources

- **GSAP Documentation:** https://greensock.com/docs/
- **ScrollTrigger Docs:** https://greensock.com/docs/v3/Plugins/ScrollTrigger
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **Lenis Smooth Scroll:** https://github.com/darkroomengineering/lenis
- **React Refs:** https://react.dev/reference/react/useRef
