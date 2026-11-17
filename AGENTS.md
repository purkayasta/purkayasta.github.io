# Repository instructions

## Project

This is Pritom Purkayasta’s personal portfolio: a static React 19 + TypeScript site built with Vite 8 and Tailwind CSS v4, deployed to GitHub Pages. No backend, API keys, routing library, or animation library is required.

## Commands

Use Node.js 22.12+ and npm; preserve `package-lock.json`.

```bash
npm ci
npm run dev       # http://127.0.0.1:5173, loopback only
npm run build     # TypeScript checks + production build to dist/
npm run lint      # oxlint
npm test          # node:test regression checks
npm audit         # dependency advisories
npm run preview   # preview the production build
```

Do not start a server for documentation-only changes. Reuse an existing server when previewing. Do not expose it to the network unless requested.

## Source map

- `src/data/portfolio.ts`: profile, experience, projects, skills, education, certifications, writing, and contact data. Prefer content edits here. Some introduction copy is currently in `src/App.tsx`.
- `src/App.tsx`: scrolling layout, introduction, vertical social column, project list, expanded career timeline, and writing toggle.
- `src/hooks/useTheme.ts`: pure `resolveTheme` function and date-based theme hook.
- `src/components/ThemePicker.tsx`: small labeled color circles; no dropdown or visible Auto option.
- `src/components/SpaceWindow.tsx`: illustrated desk, wall-mounted light switch, and seasonal scene details.
- `src/components/MovingManhattan.tsx`: layered skyline, clouds, river, and ferry.
- `src/components/ChristmasDecor.tsx`: decorative string lights.
- `src/components/DoomsdayCast.tsx`: Marvel-inspired illustrations, shown only in Doomsday mode.
- `src/components/SocialIcon.tsx`: inline SVG social icons.
- `src/index.css`: layout, typography, lighting, themes, responsive rules, and CSS animations. Tailwind v4 is configured through CSS and the Vite plugin.
- `scripts/test.mjs`: theme-date, manual-override, and portable career-date regression checks.
- `public/sw.js`: production-only service worker, registered by `src/main.tsx`.

## Design constraints

Preserve the simple, elegant desk-and-window concept. One natural interaction—the wall light switch—anchors the scene. Keep the moving Manhattan view drawn in SVG, not a photograph. Avoid introducing terminal interfaces or large control panels without a request.

- Use the system font for content, system monospace for the personal tagline, and Cormorant Garamond from Google Fonts for the name. Bold only the first name.
- Body copy is intentionally compact at 11px. Do not change global typography sizes without a request.
- The introduction and vertical social links sit beside the illustration on desktop; preserve usable mobile layouts.
- Experience is a connected timeline. Every job description is expanded by default.
- Use CSS/SVG for these code-native illustrations. Do not add dependencies for simple icons or animations.
- Respect `prefers-reduced-motion`; controls must remain keyboard accessible and expose their state.
- Seasonal decorations must not shift the introduction when themes change.

## Lighting and scene coordinates

The wall switch updates the registered root `--light` property (`0` off, `1` on). Lights-off is pure black. Page colors interpolate using `--lit`; each theme supplies its accent through `--theme-accent`.

Projected lamp light belongs only on the tabletop. Do not restore the beam, wall glow, window reflection, or page-wide light projection without a request. The lamp itself has a slight yellow warmth.

The desk SVG uses a `420 × 440` viewBox. Its objects are grouped with `translate(0 80)`. Window, wall switch, and steam overlays use corresponding percentage coordinates. Keep the viewBox, aspect ratio, and overlays aligned at all breakpoints.

## Automatic themes

Use the visitor’s local calendar date:

1. December 18–19, **2026 only**: Doomsday.
2. Other December dates: Christmas.
3. November: Thanksgiving.
4. Otherwise: Default.

There is no visible Auto option. Each visit begins with automatic selection; a color-circle click manually overrides it until reload or the next local date. The hook checks once per minute and on visibility changes. Manual preferences are not persisted. Theme changes must also update interface accents.

When changing this schedule, update `resolveTheme`, tests, and README together. Keep date parsing explicit; do not rely on browser parsing of strings such as `Feb 2018`.

## Security and offline behavior

- Keep dependency changes compatible and update the lockfile. Review `npm audit` after dependency edits; do not use forced major upgrades blindly.
- Keep development/preview hosts on loopback by default.
- External links opened in a new tab use `rel="noreferrer"`.
- Do not introduce raw HTML injection, runtime credentials, or unnecessary remote services.
- The service worker may cache only successful same-origin navigation and built assets. Do not cache third-party requests or error responses.
- Cache cleanup must target this app’s `pp-` caches only.

## Validation and scope

Run `npm test`, `npm run build`, and `npm run lint` for implementation changes. Use `git diff --check` for whitespace issues. Documentation-only edits need documentation checks, not a production rebuild.

For layout or interaction changes, verify desktop/mobile, theme transitions, light-switch behavior, expanded timeline content, and reduced-motion behavior in a browser when available. Build success is not visual verification; report the limitation when browser testing is unavailable.

Keep changes focused and preserve unrelated user edits. Consolidate existing styles rather than accumulating contradictory overrides. Do not commit generated `dist/` output, credentials, or dependency folders.

Deployment is defined in `.github/workflows/deploy.yml`: pushes to `main` and manual dispatch build and publish `dist/` to GitHub Pages. Vite uses root base path `/`. Do not push or deploy merely to validate a local change.
