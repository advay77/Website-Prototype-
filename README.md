# DISCOVER Supply Chain website

Next.js 15 (App Router), exported as a static site and hosted on Vercel.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

To check the production build:

```bash
npm run build
npm start
```

## Pages

| Route | File |
|---|---|
| `/` Home (hero film) | `app/page.tsx` |
| `/summit` Summit 2027 landing page | `app/summit/page.tsx` |
| `/sponsors` For companies | `app/sponsors/page.tsx` |
| `/professionals` For professionals | `app/professionals/page.tsx` |
| `/about` About | `app/about/page.tsx` |

Shared header, footer and interactions live in `components/`. Styles are in
`app/globals.css` (site) and `app/summit/summit.css` (Summit page).

## Media

- `public/assets/video/` hero film (WebM + MP4 + poster)
- `public/assets/summit/` 2026 Summit photos, each at 800 and 1600 px wide
- `public/assets/img`, `logos`, `people` images from the original prototype

The original HTML prototype is kept in `prototype-html/` for reference.
Old `.html` links redirect to the new routes (`vercel.json`).
