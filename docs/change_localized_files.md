# Changing Localizations

> Updated: 2026-03-14

Our localization system allows both text and media paths to change based on the selected language.

## 1. Localization Files

Each language has two JSON files:

```
public/
├── locales/         # Text strings
│   ├── en.json
│   └── ja.json
└── media/           # Media paths & critical image list
    ├── en.media.json
    └── ja.media.json
```

### Example `public/locales/en.json`:
```json
{
  "navbar": { "logo_text": "patiHash", "items": [...] },
  "services": { "title": "SERVICES WE PROVIDE" },
  "featured": { "title": "FEATURED WORK", "row_1_title": "Animation & Motion" },
  "footer": { "cta_highlight": "EPIC", "contact_email": "hello@patihash.com" }
}
```

### Example `public/media/en.media.json`:
```json
{
  "criticalImages": ["/images/landing/bomb_layer.png", ...],
  "images": { "spaceship1": "/images/assets/space_ship.png" },
  "videos": { "hero": "/videos/hero.mp4" }
}
```

## 2. Changing Language

Use `setLanguageIndex()` from `useLocale()`:

```jsx
import { useLocale } from "../context/LocaleContext";

const { setLanguageIndex } = useLocale();

// Switch to Japanese (index 1)
setLanguageIndex(1);
```

This automatically updates:
- All text strings (titles, descriptions, labels)
- All media paths (images, videos) if they differ per language

## 3. Accessing Localized Text & Media

Inside any component:

```jsx
const { texts, media } = useLocale();

<h2>{texts?.footer?.cta_highlight}</h2>
<img src={media?.images?.spaceship1} alt="" />
```

## 4. Adding a New Language

1. Add `{ code: "fr", label: "Français" }` to `src/context/languages.js`
2. Create `public/locales/fr.json` — copy `en.json` and translate
3. Create `public/media/fr.media.json` — copy `en.media.json`, update paths if needed
4. Done — the new language loads dynamically when selected