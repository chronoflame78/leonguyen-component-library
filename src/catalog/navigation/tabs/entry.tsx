import { defineComponent } from "../../../lib/registry";
import { Tabs } from "./Tabs";
import reactSource from "./Tabs.tsx?raw";
import cssSource from "./Tabs.css?raw";
import svelteSource from "./Tabs.svelte?raw";

export default defineComponent({
  id: "tabs",
  name: "Tabs",
  category: "navigation",
  description:
    "A horizontal tab bar with an animated sliding underline and swappable panels.",
  tags: ["animated", "tabs", "interactive"],
  Preview: () => <Tabs />,
  react: [
    { filename: "Tabs.tsx", language: "tsx", source: reactSource },
    { filename: "Tabs.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "Tabs.svelte", language: "svelte", source: svelteSource },
  ],
});
