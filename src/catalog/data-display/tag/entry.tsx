import { defineComponent } from "../../../lib/registry";
import { TagList } from "./Tag";
import reactSource from "./Tag.tsx?raw";
import svelteSource from "./Tag.svelte?raw";

export default defineComponent({
  id: "tag",
  name: "Tag",
  category: "data-display",
  description:
    "Pill-style chips with color variants and an optional removable button that drops the tag.",
  tags: ["chip", "pill", "removable", "interactive"],
  Preview: () => <TagList />,
  react: [{ filename: "Tag.tsx", language: "tsx", source: reactSource }],
  svelte: [{ filename: "Tag.svelte", language: "svelte", source: svelteSource }],
});
