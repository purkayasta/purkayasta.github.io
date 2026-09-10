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

**Theme mechanism**: one theme only — a dark cabin, no light/dark toggle and no accent switcher. The whole palette lives on `:root` in `src/index.css` and every colour is a `color-mix()` on a single registered scalar, `--lit` (`0` = shade down, night cabin; `1` = shade up, daylight), via the `--litp` percentage. `AirplaneWindow.tsx` is the only writer: dragging the centre shade sets `--lit` on `documentElement` frame by frame (proportionally — pull the shade a third of the way down and the cabin dims by a third), a tap toggles it between `0` and `1`, and the airplane-window sky reads `var(--lit)` straight from CSS rather than taking props. `--lit` alone is transitioned over `--theme-ms` so a tap cross-fades the whole palette; while a drag is in progress `html[data-dragging]` kills that transition so nothing lags behind the finger. `useReveal()` (`src/hooks/useReveal.ts`) only handles the staged `text-hidden` fade-in on first paint.

**Palette vars**: the mixed colours are registered with `@property ... syntax: '<color>'`, but they are deliberately *not* transitioned — they recompute for free whenever `--lit` moves. Two consequences to respect: never use `transition-all` on an element that inherits these vars, and the `--w-*` window-sky vars are left unregistered to keep them out of per-frame interpolation (they are mixed in JSX by the `mix()` helper in `AirplaneWindow.tsx`).

**Styling**: Tailwind v4 is configured via the Vite plugin (`@tailwindcss/vite`), not a `tailwind.config.js` — theme tokens and custom variants (e.g. `@custom-variant dark`) live directly in `src/index.css` using `@theme` and `@import 'tailwindcss'`.

**PWA**: `public/sw.js` is a hand-written service worker (no workbox/build-time PWA plugin).
