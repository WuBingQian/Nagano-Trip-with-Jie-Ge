# Nagano Trip with Jie Ge 📷

A personal, mobile-friendly itinerary site for a three-day photography road
trip through Nagano (August 21–23, 2026), built with **React + Vite**.

- Dark mode by default (astrophotography vibes) with a light-mode toggle
- Vertical timeline layout, organized chronologically by day
- Real photographs of every location, hotlinked from Wikimedia Commons,
  with bundled SVG illustrations as automatic fallbacks
- Trip dates + camera gear (Sony A7V · Sigma 24-70mm f/2.8) up top

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deploy to GitHub Pages

The included workflow (`.github/workflows/deploy.yml`) builds and deploys
automatically on every push to `main`:

1. Push this repository to GitHub.
2. In the repo settings, go to **Settings → Pages** and set
   **Source: GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site appears at
   `https://<username>.github.io/<repo>/`.

Because Vite is configured with `base: './'`, all asset paths are relative
and the site works from any Pages URL without changes.

## Using your own photos

Each stop in `src/data/itinerary.js` has:

- `photo` — a real photograph hotlinked from Wikimedia Commons
- `image` — a local SVG illustration in `public/images/`, used as fallback

After the trip, drop your own JPGs into `public/images/` and point the
`photo` field (or `image`, removing the `...commons(...)` line) at them.
