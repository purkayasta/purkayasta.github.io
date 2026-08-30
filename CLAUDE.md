# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck (`tsc -b`) then production build
- `npm run lint` — oxlint
- `npm run preview` — preview production build

No test suite is configured in this repo.

## Architecture

This is a single-page personal portfolio site (React 19 + TypeScript + Vite + Tailwind CSS v4). There is no routing — `src/App.tsx` renders one long page as a fixed sequence of section components, each wrapped in a `.theme-fade` div with a staggered `--reveal-delay` custom property for the scroll-reveal effect.

**Content vs. presentation split**: all copy — profile, work experience, projects, skills, writing links, contact info — lives in `src/data/portfolio.ts` as plain exported objects/arrays. Components (`src/components/*.tsx`) are purely presentational and import from this file. When asked to update site content (bio, jobs, projects, links), edit `portfolio.ts`, not the components.

**Theme mechanism**: there is no light/dark toggle. The cabin is always dark — the palette lives on `:root` in `src/index.css` and there is no `.dark` class. `AirplaneWindow.tsx` owns the shade state locally: opening the centre shade fades in a radial "lit" pool (`--lit`) over the hero, as if daylight were coming through the window; closing it fades back to full dark. `useReveal()` (`src/hooks/useReveal.ts`) only handles the staged `text-hidden` fade-in on first paint.

**Accent themes**: `AccentSwitch.tsx` sets `data-accent` on `document.documentElement` (persisted to `localStorage`) and `index.css` overrides the whole palette under `html[data-accent='brick']` and `html[data-accent='neon']` — background, ink, glass and the airplane-window sky, not just the accent colour. All palette colours are registered with `@property ... syntax: '<color>'` and transitioned over `--theme-ms`, which is what makes an accent switch cross-fade instead of snapping. Two consequences to respect: never use `transition-all` on an element that inherits these vars (it re-animates every one of them on its own timing), and the `--w-*` window-sky vars are deliberately left *unregistered* to keep them out of that per-frame interpolation.

**Styling**: Tailwind v4 is configured via the Vite plugin (`@tailwindcss/vite`), not a `tailwind.config.js` — theme tokens and custom variants (e.g. `@custom-variant dark`) live directly in `src/index.css` using `@theme` and `@import 'tailwindcss'`.

**PWA**: `public/sw.js` is a hand-written service worker (no workbox/build-time PWA plugin).
