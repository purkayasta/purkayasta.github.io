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

**Theme mechanism**: dark/light mode is not a toggle button — it's driven by `AirplaneWindow.tsx`, the hero component with an airplane-window shade animation. Opening/closing the shade calls `onOpenChange(isOpen, delayMs)` from `App.tsx`, which drives `useTheme()` (`src/hooks/useTheme.ts`). That hook toggles the `dark` and `text-hidden` classes on `document.documentElement` with timed delays (`FADE_MS`) so the theme color transition and content fade are choreographed together with the window-shade animation. Theme CSS variables (`--cream`, `--ink`, `--accent`, etc.) are defined in `src/index.css` under `:root` and overridden under `html.dark`.

**Styling**: Tailwind v4 is configured via the Vite plugin (`@tailwindcss/vite`), not a `tailwind.config.js` — theme tokens and custom variants (e.g. `@custom-variant dark`) live directly in `src/index.css` using `@theme` and `@import 'tailwindcss'`.

**PWA**: `public/sw.js` is a hand-written service worker (no workbox/build-time PWA plugin).
