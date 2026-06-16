import { defineComponent } from "../../../lib/registry";
import { Popover } from "./Popover";
import reactSource from "./Popover.tsx?raw";
import cssSource from "./Popover.css?raw";
import svelteSource from "./Popover.svelte?raw";

export default defineComponent({
  id: "popover",
  name: "Popover",
  category: "overlays",
  description:
    "A click-triggered floating panel anchored to its trigger with an arrow, holding arbitrary content and closing on outside click or Escape.",
  tags: ["floating", "anchored", "panel"],
  Preview: () => <Popover />,
  react: [
    { filename: "Popover.tsx", language: "tsx", source: reactSource },
    { filename: "Popover.css", language: "css", source: cssSource },
  ],
  svelte: [{ filename: "Popover.svelte", language: "svelte", source: svelteSource }],
});
