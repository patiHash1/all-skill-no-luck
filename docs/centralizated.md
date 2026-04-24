# Centralized Asset Management (Short Guide)

> Updated: 2026-03-14

## 1. Purpose

We store all locale-specific media paths in JSON files so they can be accessed easily across all components and swapped per language.

## 2. JSON Structure

Media paths live in `public/media/`:

```json
// public/media/en.media.json
{
  "criticalImages": [
    "/images/landing/bomb_layer.png",
    "/images/services/game_dev.png"
  ],
  "images": {
    "spaceship1": "/images/assets/space_ship.png",
    "game_dev": "/images/services/game_dev.png"
  },
  "videos": {
    "hero": "/videos/hero.mp4"
  }
}
```

Text strings live in `public/locales/`:

```json
// public/locales/en.json
{
  "navbar": { "logo_text": "patiHash", "items": [...] },
  "services": { "title": "SERVICES WE PROVIDE" },
  "footer": { "cta_highlight": "EPIC", "contact_email": "..." }
}
```

## 3. Accessing Assets via Context

```jsx
import { useLocale } from "../context/LocaleContext";

export default function Example() {
  const { texts, media } = useLocale();

  return (
    <>
      <h2>{texts?.services?.title}</h2>
      <img src={media?.images?.spaceship1} alt="Ship" />
    </>
  );
}
```

## 4. How to Add New Assets

1. Put the file inside `/public` (e.g. `/public/images/new_asset.png`).
2. Add its path to `public/media/en.media.json` (and other language files).
3. Access it via `media.images.keyName` in your component.

## 5. How to Change Language

➡️ [Change Localized Files](./change_localized_files.md)
