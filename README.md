# Pritom Purkayasta — Personal Portfolio

A single-page portfolio with an illustrated desk overlooking a moving Manhattan skyline. Projects, writing, and an expanded career timeline sit below the introduction.

**Live site:** [purkayasta.github.io](https://purkayasta.github.io/)

## Design and interactions

- Hand-drawn SVG desk scene with two monitors, hot tea, glasses, and a wall-mounted light switch.
- Layered skyline animation, drifting clouds, river reflections, and a passing ferry.
- The wall switch changes the page lighting; projected lamp light stays on the desktop. Lights-off mode uses a pure black background.
- Responsive layout, keyboard-accessible controls, and reduced-motion support.
- System fonts for content, system monospace for the personal tagline, and Google Fonts’ Cormorant Garamond for the name banner.

## Themes

The site chooses a theme automatically using the visitor’s local date:

| Dates | Theme |
| --- | --- |
| November | Thanksgiving |
| December | Christmas |
| December 18–19, 2026 | Doomsday, overriding Christmas |
| All other dates | Default |

Christmas resumes on December 20, 2026. The Doomsday override applies only in 2026.

Small color circles allow manual selection of any theme. Theme accents and scene decorations change together. Manual selections last until reload or the next local calendar day; they are not saved in browser storage. The date is checked every minute and when tab visibility changes.

Thanksgiving adds autumn colors, falling leaves, and a pumpkin. Christmas adds fairy lights, snow, and a desk tree. The Marvel-inspired Doomsday theme adds green accents, a sky rift, and illustrated characters.

## Stack

- React 19 and TypeScript
- Vite 8 and Tailwind CSS v4
- CSS and SVG animations; no animation library
- Hand-written service worker for offline navigation and built-asset caching
- Static hosting on GitHub Pages; no backend or API keys

## Local development

Use Node.js 22.12+ and npm. The deployment workflow uses Node.js 22.

```bash
npm ci
npm run dev       # development server at http://127.0.0.1:5173
npm run build     # TypeScript checks and production output in dist/
npm run lint      # oxlint
npm test          # theme-date and career-date regression checks
npm run preview   # serve the production build locally
npm audit         # check dependency advisories
```

Development and preview servers bind to loopback by default. The service worker registers only in production builds.

## Editing content and behavior

| File | Purpose |
| --- | --- |
| `src/data/portfolio.ts` | Profile, work history, projects, skills, writing, and contact links |
| `src/App.tsx` | Portfolio layout and theme selector |
| `src/components/ThemePicker.tsx` | Compact theme color-circle selector |
| `src/hooks/useTheme.ts` | Automatic theme dates and manual selection |
| `src/components/SpaceWindow.tsx` | Desk illustration and light switch |
| `src/components/MovingManhattan.tsx` | Animated Manhattan view |
| `src/components/ChristmasDecor.tsx` | Christmas string lights |
| `src/components/DoomsdayCast.tsx` | Marvel-inspired character illustrations |
| `src/components/SocialIcon.tsx` | Social link icons |
| `src/index.css` | Layout, typography, themes, lighting, and animations |
| `public/sw.js` | Same-origin offline caching |

The lamp sets the root `--light` value. Each theme supplies `--theme-accent` for links, timeline markers, borders, focus indicators, and text selection.

## Validation

Run `npm run build`, `npm run lint`, and `npm audit` before publishing. Run `npm test` for theme-boundary, manual-override, and career-date regression checks. For visual changes, check desktop and mobile layouts, light-switch behavior, theme changes, and reduced-motion settings in a browser.

## Deployment

Pushing to `main` triggers [the GitHub Pages workflow](.github/workflows/deploy.yml), which installs locked dependencies, builds the site, and deploys `dist/`. The workflow also supports manual dispatch.

The Vite base path is `/`, intended for the root `purkayasta.github.io` site.
