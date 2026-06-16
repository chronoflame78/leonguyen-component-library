import { defineComponent } from "../../../lib/registry";
import { Tooltip } from "./Tooltip";
import reactSource from "./Tooltip.tsx?raw";
import cssSource from "./Tooltip.css?raw";
import svelteSource from "./Tooltip.svelte?raw";

export default defineComponent({
  id: "tooltip",
  name: "Tooltip",
  category: "popups",
  description:
    "A tooltip that fades in above a trigger on hover or focus, complete with a small pointing arrow.",
  tags: ["hover", "hint", "overlay"],
  Preview: () => <Tooltip />,
  react: [
    { filename: "Tooltip.tsx", language: "tsx", source: reactSource },
    { filename: "Tooltip.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "Tooltip.svelte", language: "svelte", source: svelteSource },
  ],
});
