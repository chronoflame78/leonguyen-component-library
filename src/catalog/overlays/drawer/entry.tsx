import { defineComponent } from "../../../lib/registry";
import { Drawer } from "./Drawer";
import reactSource from "./Drawer.tsx?raw";
import cssSource from "./Drawer.css?raw";
import svelteSource from "./Drawer.svelte?raw";

export default defineComponent({
  id: "drawer",
  name: "Drawer",
  category: "overlays",
  description:
    "A slide-in off-canvas panel with a dimmed backdrop that closes on Escape, backdrop click, or a close button.",
  tags: ["off-canvas", "panel", "animated"],
  Preview: () => <Drawer />,
  react: [
    { filename: "Drawer.tsx", language: "tsx", source: reactSource },
    { filename: "Drawer.css", language: "css", source: cssSource },
  ],
  svelte: [{ filename: "Drawer.svelte", language: "svelte", source: svelteSource }],
});
