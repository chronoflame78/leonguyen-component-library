import { defineComponent } from "../../../lib/registry";
import { CommandPalette } from "./CommandPalette";
import reactSource from "./CommandPalette.tsx?raw";
import cssSource from "./CommandPalette.css?raw";
import svelteSource from "./CommandPalette.svelte?raw";

export default defineComponent({
  id: "command-palette",
  name: "Command Palette",
  category: "overlays",
  description:
    "A ⌘K-style centered command menu that filters as you type, with arrow-key navigation, Enter to select, and Escape to close.",
  tags: ["cmdk", "search", "keyboard"],
  Preview: () => <CommandPalette />,
  react: [
    { filename: "CommandPalette.tsx", language: "tsx", source: reactSource },
    { filename: "CommandPalette.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "CommandPalette.svelte", language: "svelte", source: svelteSource },
  ],
});
