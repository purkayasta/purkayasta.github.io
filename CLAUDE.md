# Claude Code instructions

Read and follow [AGENTS.md](AGENTS.md), the canonical repository guide shared with Codex. It documents the current architecture, design constraints, lighting coordinates, theme schedule, security expectations, and validation workflow.

## Quick reference

- Stack: React 19, TypeScript, Vite 8, Tailwind CSS v4; static GitHub Pages hosting.
- Content: `src/data/portfolio.ts`; layout: `src/App.tsx`; styles: `src/index.css`.
- Scene: `SpaceWindow.tsx` and `MovingManhattan.tsx`; seasonal decorations are separate components.
- Themes: `src/hooks/useTheme.ts` and `ThemePicker.tsx`. Automatic selection uses local dates; manual selection uses small color circles, not a dropdown.
- November: Thanksgiving. December: Christmas, except December 18–19, 2026, when Doomsday takes precedence.
- The accessible wall switch controls `--light`; off is pure black, and lamp projection stays on the desktop.
- Preserve compact typography, the serif name banner, vertical social links, and expanded job descriptions.

## Commands

```bash
npm ci
npm run dev
npm test
npm run build
npm run lint
npm audit
```

Use Node.js 22.12+. Development and preview servers bind to loopback. Run implementation checks after code changes; use documentation checks for documentation-only edits. Never describe a build check as visual browser testing.

Keep shared instructions in `AGENTS.md` and update this quick reference if it becomes inconsistent. Update README and theme regression tests whenever the automatic schedule changes.
