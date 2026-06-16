import { defineComponent } from "../../../lib/registry";
import { ToggleSwitch } from "./ToggleSwitch";
import reactSource from "./ToggleSwitch.tsx?raw";
import cssSource from "./ToggleSwitch.css?raw";
import svelteSource from "./ToggleSwitch.svelte?raw";

export default defineComponent({
  id: "toggle-switch",
  name: "Toggle Switch",
  category: "toggles",
  description:
    "An animated iOS-style on/off switch with a sliding knob and color-shifting track.",
  tags: ["animated", "switch", "accessible"],
  Preview: () => <ToggleSwitch defaultChecked label="Enable notifications" />,
  react: [
    { filename: "ToggleSwitch.tsx", language: "tsx", source: reactSource },
    { filename: "ToggleSwitch.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "ToggleSwitch.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
