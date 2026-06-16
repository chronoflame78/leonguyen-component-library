# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is

A component-library web app: a browsable storage of UI components, each with a
**React** and a **Svelte** version. The app itself is a React SPA. The live
preview always renders the React version; the Svelte version is shown only as
copyable source (there is no Svelte runtime in the app).

Stack: React 19 + TypeScript, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`),
react-router-dom, prism-react-renderer.

## Commands

```bash
npm run dev      # http://localhost:5173
npm run build    # tsc -b (strict type-check) + vite build — run this to verify
npm run preview  # serve the production build
```

There is no test suite. **`npm run build` is the verification gate** — it
type-checks the whole project under strict mode before bundling.

## Architecture

- `src/lib/registry.ts` — `ComponentEntry` type, `CategoryId` union, the
  `categories` array, and the `defineComponent()` helper.
- `src/catalog/index.ts` — auto-discovers every `entry.tsx` via
  `import.meta.glob("./**/entry.tsx", { eager: true })`. **No manual
  registration exists or is needed.** Sidebar, search, category pages, and
  routing all derive from this.
- `src/catalog/<category>/<id>/` — one folder per component (see below).
- `src/components/layout/` — `Sidebar`, `RootLayout`.
- `src/components/showcase/` — `ComponentShowcase` (preview + React/Svelte code
  tabs), `CodeBlock`, `CopyButton`, `ComponentCard`.
- `src/pages/` — `HomePage`, `CategoryPage`, `ComponentPage`, `NotFoundPage`.
- `src/router.tsx` — routes: `/`, `/category/:categoryId`, `/component/:componentId`.

## Adding a component (the core workflow)

Create `src/catalog/<category>/<id>/` containing exactly these files. Mirror
`src/catalog/buttons/gradient-button/` — it is the canonical reference.

1. `Name.tsx` — React version, **named export** `export function Name(...)`.
2. `Name.css` — custom CSS for the React version, **only if needed** (imported
   at the top of the `.tsx`). Omit the file for pure-Tailwind components.
3. `Name.svelte` — Svelte version, with custom CSS inline in a `<style>` block.
4. `entry.tsx` — default-exports `defineComponent({...})`, imports the component
   for the live `Preview`, and imports each source file with `?raw` to populate
   the `react` / `svelte` `CodeFile[]` arrays.

`id` must be a unique kebab-case slug matching the folder name. `category` must
be a member of the `CategoryId` union. Set a one-sentence `description` and 2–4
`tags`.

### CSS conventions (non-negotiable — the user asked for these specifically)

- **React version:** custom CSS goes in a **separate `.css` file** imported into
  the `.tsx`. Prefer Tailwind utility classes; reserve the CSS file for what
  Tailwind can't express (keyframes, ripples, complex transitions).
- **Svelte version:** custom CSS goes **inside the component** in a `<style>`
  block. Svelte has no Tailwind here, so translate the visual look into plain
  CSS so the `.svelte` file is self-contained and copy-pasteable on its own.

### Adding a category

Extend the `CategoryId` union and the `categories` array in
`src/lib/registry.ts`. Everything else follows automatically.

## Conventions & gotchas

- **TypeScript is strict**: `noUnusedLocals`, `noUnusedParameters`,
  `verbatimModuleSyntax`, `erasableSyntaxOnly`. Consequences:
  - Use `import type { ... }` for type-only imports.
  - No `enum`s, no `namespace`s, no parameter properties (erasable syntax only).
  - No unused variables or parameters (prefix intentionally-unused params
    with `_`).
- **React 19 + react-jsx runtime**: do **not** `import React`. Import hooks
  directly (`import { useState } from "react"`).
- **`?raw` imports** are what make the code tabs show the real source — never
  hand-duplicate source into strings; always import the file with `?raw` so the
  displayed code stays in sync with what runs.
- **`.svelte` and `.css` source files are only displayed as text** (loaded via
  `?raw`). There is no Svelte compiler in the build — `.svelte` files are never
  compiled, so they need no tooling, but they must be correct, idiomatic,
  copy-pasteable source.
- **Self-contained previews**: previews render on a dark background
  (`#0d0d14`). Use light text and visible focus/active states. Overlay
  components (modal/toast) use `position: fixed` + high z-index rather than React
  portals, to keep each component self-contained and copy-pasteable. Clean up
  timers and event listeners in `useEffect`/`onDestroy`.
- **Dark/light mode (app chrome only)**: class-based via Tailwind's
  `@custom-variant dark` in `src/index.css` — a `.dark` class on `<html>`
  toggles the theme. The state lives in `src/lib/theme.ts` (a `useSyncExternalStore`
  store; `useTheme()` / `toggleTheme()`); the initial class is set FOUC-free by
  an inline script in `index.html`. **App chrome** (sidebar, pages, cards, code
  blocks, search) must use light defaults + `dark:` variants
  (e.g. `bg-white dark:bg-[#0d0d14]`, `text-gray-900 dark:text-white`,
  `border-black/10 dark:border-white/10`). **Component preview stages stay dark
  in both themes** (the `from-[#16161f] to-[#0d0d14]` panels in
  `ComponentShowcase`/`ComponentCard`) — do not theme them — because the 42
  components are tuned for a dark background. Individual catalog components are
  NOT theme-aware; keep building them dark-tuned.
- **Decided defaults** (change only if the user asks): React 19, Tailwind v4,
  Vite SPA (no SSR), no Svelte runtime in-app, class-based dark mode with the
  preview stage always dark.
