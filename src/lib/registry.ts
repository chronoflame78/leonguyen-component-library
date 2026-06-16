import type { ComponentType } from "react";

/**
 * Every component in the library belongs to exactly one category.
 * Add new categories here; the sidebar and routing pick them up automatically.
 */
export type CategoryId =
  | "buttons"
  | "inputs"
  | "forms"
  | "toggles"
  | "navigation"
  | "popups"
  | "overlays"
  | "feedback"
  | "data-display"
  | "cards"
  | "carousel"
  | "media"
  | "layout"
  | "charts";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "buttons",
    label: "Buttons",
    description: "Clickable actions — from flashy gradients to loading states.",
  },
  {
    id: "inputs",
    label: "Inputs",
    description: "Text fields and form controls for capturing user data.",
  },
  {
    id: "forms",
    label: "Forms",
    description: "Structured controls — checkboxes, radios, selects and sliders.",
  },
  {
    id: "toggles",
    label: "Toggles",
    description: "Switches and on/off controls.",
  },
  {
    id: "navigation",
    label: "Navigation",
    description: "Tabs, breadcrumbs, pagination and steppers for moving around.",
  },
  {
    id: "popups",
    label: "Popups",
    description: "Modals, tooltips and toasts layered above the page.",
  },
  {
    id: "overlays",
    label: "Overlays",
    description: "Drawers, dropdown menus, popovers and command palettes.",
  },
  {
    id: "feedback",
    label: "Feedback",
    description: "Alerts, badges, progress and loading states.",
  },
  {
    id: "data-display",
    label: "Data Display",
    description: "Tables, accordions, avatars and tags for presenting data.",
  },
  {
    id: "cards",
    label: "Cards",
    description: "Self-contained content containers and panels.",
  },
  {
    id: "carousel",
    label: "Carousel",
    description: "Sliders and rotating galleries for showcasing content.",
  },
  {
    id: "media",
    label: "Media",
    description: "Image galleries, comparison sliders and avatar groups.",
  },
  {
    id: "layout",
    label: "Layout",
    description: "Dividers, grids and resizable panels for structuring pages.",
  },
  {
    id: "charts",
    label: "Charts",
    description: "Lightweight SVG data visualizations.",
  },
];

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}

/** A single source file shown in a code tab. */
export interface CodeFile {
  filename: string;
  /** Prism language id, e.g. "tsx", "css", "svelte". */
  language: string;
  source: string;
}

/**
 * A library entry. Each component lives in its own folder under
 * `src/catalog/<category>/<id>/` and exports one of these as default
 * from an `entry.tsx` file. The catalog index discovers them automatically.
 */
export interface ComponentEntry {
  /** Unique, URL-safe slug, e.g. "gradient-button". */
  id: string;
  /** Human-readable name, e.g. "Gradient Button". */
  name: string;
  category: CategoryId;
  description: string;
  tags?: string[];
  /** Live, interactive React preview rendered in the showcase. */
  Preview: ComponentType;
  /** React source files (component + any custom CSS). */
  react: CodeFile[];
  /** Svelte source files (single-file component). */
  svelte: CodeFile[];
}

/** Convenience helper so entry files read declaratively. */
export function defineComponent(entry: ComponentEntry): ComponentEntry {
  return entry;
}
