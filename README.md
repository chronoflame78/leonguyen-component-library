# Component Library

A library/storage web app for cool, popular UI components. Each component ships
with a **React** version and a **Svelte** version. Browse components grouped by
type, preview the React version live, and copy the source for either framework.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** (SPA)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **react-router-dom** for routing
- **prism-react-renderer** for syntax-highlighted, copyable code blocks

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check (tsc -b) + production build
npm run preview  # preview the production build
```

## How it works

The live preview always renders the **React** version of a component. The
**Svelte** version is shown as copyable source code (the app does not run a
Svelte runtime). Each component page has a React/Svelte tab switch over the code.

### Project layout

```
src/
├── lib/registry.ts          # ComponentEntry type, categories, defineComponent()
├── catalog/
│   ├── index.ts             # auto-discovers every entry.tsx (import.meta.glob)
│   └── <category>/<id>/      # one folder per component
│       ├── Name.tsx          # React version (named export)
│       ├── Name.css          # custom CSS for the React version (only if needed)
│       ├── Name.svelte       # Svelte version (custom CSS inline in <style>)
│       └── entry.tsx         # registers the component
├── components/
│   ├── layout/              # Sidebar, RootLayout
│   └── showcase/            # CodeBlock, CopyButton, ComponentCard, ComponentShowcase
└── pages/                  # Home, Category, Component, NotFound
```

## Adding a component

1. Create a folder `src/catalog/<category>/<your-id>/`.
2. Write the React version as `YourComponent.tsx` (named export).
   - **If you need custom CSS, put it in a separate `YourComponent.css`** file
     and import it at the top of the `.tsx` (`import "./YourComponent.css";`).
     Prefer Tailwind utility classes; reserve the CSS file for things Tailwind
     can't express (keyframes, complex transitions).
3. Write the Svelte version as `YourComponent.svelte`.
   - **Custom CSS for the Svelte version goes inside the component** in a
     `<style>` block.
4. Add `entry.tsx` that default-exports `defineComponent({...})`, importing the
   live `Preview` component and each source file with the `?raw` suffix. See
   `src/catalog/buttons/gradient-button/entry.tsx` for the canonical example.

That's it — `src/catalog/index.ts` discovers the new `entry.tsx` automatically
via `import.meta.glob`, and the sidebar, category pages, and routing pick it up.

### Adding a category

Add an entry to the `categories` array (and the `CategoryId` union) in
`src/lib/registry.ts`.

## Current catalog

42 components across 14 categories: Buttons, Inputs, Forms, Toggles,
Navigation, Popups, Overlays, Feedback, Data Display, Cards, Carousel, Media,
Layout, Charts.
