# lde-q

Per-question reader for *O Livro dos Espíritos*.

You host the app and the catalog. Readers host their own marks file (favorites, highlights, personal notes). A comment host (Remark42 / Isso) will own discussion and profiles later. No Hypothesis. No Disqus.

## Locales

- **pt-BR** — default UI and content
- **en-US** — switch is visible and **disabled** until an English catalog exists

Unit keys (`1`, `22a`) stay the same across languages.

## Routes

Hash router (works on GitHub Pages with no extra host):

- `#/` home
- `#/q/22` question
- `#/q/22a` lettered unit
- `#/parte/…` part index
- `#/fav` favorites
- `#/marks` highlights

## Marks

Stored in `localStorage` (`lde-q-marks-v1`). Import / export JSON. Drive sync is a later connector on the same file shape.

```json
{
  "v": 1,
  "favs": ["1", "23"],
  "highlights": { "23": [{ "text": "espíritos" }] },
  "notes": { "1": "" }
}
```

## Source

Questions are parsed from `sergioSHKLR/doutrina-content` → `books/md/1-lde/full/1-lde-full.md`.

Skip commentary numbers that are not questions: 59, 100–113, 222, 455, 872.

## Run

Open `index.html` or serve the repo root. No build step.
