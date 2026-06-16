import { defineComponent } from "../../../lib/registry";
import { Breadcrumbs } from "./Breadcrumbs";
import reactSource from "./Breadcrumbs.tsx?raw";
import svelteSource from "./Breadcrumbs.svelte?raw";

export default defineComponent({
  id: "breadcrumbs",
  name: "Breadcrumbs",
  category: "navigation",
  description:
    "A breadcrumb trail with chevron separators and a non-clickable current page.",
  tags: ["breadcrumbs", "trail", "navigation"],
  Preview: () => <Breadcrumbs />,
  react: [
    {
      filename: "Breadcrumbs.tsx",
      language: "tsx",
      source: reactSource,
    },
  ],
  svelte: [
    {
      filename: "Breadcrumbs.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
