import { defineComponent } from "../../../lib/registry";
import { DropdownMenu } from "./DropdownMenu";
import reactSource from "./DropdownMenu.tsx?raw";
import cssSource from "./DropdownMenu.css?raw";
import svelteSource from "./DropdownMenu.svelte?raw";

export default defineComponent({
  id: "dropdown-menu",
  name: "Dropdown Menu",
  category: "overlays",
  description:
    "A button that opens a menu of icon-labelled actions, closing on outside click, Escape, or selection.",
  tags: ["menu", "actions", "popover"],
  Preview: () => <DropdownMenu />,
  react: [
    { filename: "DropdownMenu.tsx", language: "tsx", source: reactSource },
    { filename: "DropdownMenu.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "DropdownMenu.svelte", language: "svelte", source: svelteSource },
  ],
});
