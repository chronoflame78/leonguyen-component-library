import { defineComponent } from "../../../lib/registry";
import { DayNightToggle } from "./DayNightToggle";
import reactSource from "./DayNightToggle.tsx?raw";
import cssSource from "./DayNightToggle.css?raw";
import svelteSource from "./DayNightToggle.svelte?raw";

export default defineComponent({
  id: "day-night-toggle",
  name: "Day / Night Toggle",
  category: "toggles",
  description:
    "A playful sun-to-moon switch whose track cross-fades from a daytime sky to a starry night.",
  tags: ["animated", "switch", "theme"],
  Preview: () => <DayNightToggle defaultChecked label="Toggle day and night" />,
  react: [
    { filename: "DayNightToggle.tsx", language: "tsx", source: reactSource },
    { filename: "DayNightToggle.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "DayNightToggle.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
