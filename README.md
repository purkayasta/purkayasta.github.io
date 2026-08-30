# purkayasta.github.io

Personal portfolio site, built as a single-page React app.

**Live:** https://purkayasta.github.io/

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Hand-written service worker for offline/PWA support

## Development

```bash
npm install
npm run dev       # start dev server
npm run build     # typecheck + production build
npm run lint      # oxlint
npm run preview   # preview production build
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes it to GitHub Pages.
