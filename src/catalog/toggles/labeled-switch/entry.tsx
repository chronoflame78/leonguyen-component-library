import { defineComponent } from "../../../lib/registry";
import { LabeledSwitch } from "./LabeledSwitch";
import reactSource from "./LabeledSwitch.tsx?raw";
import cssSource from "./LabeledSwitch.css?raw";
import svelteSource from "./LabeledSwitch.svelte?raw";

export default defineComponent({
  id: "labeled-switch",
  name: "Labeled Switch",
  category: "toggles",
  description:
    "An iOS-style switch with check and cross icons inside the track that swap as the knob slides.",
  tags: ["switch", "icons", "accessible"],
  Preview: () => <LabeledSwitch defaultChecked label="Enable feature" />,
  react: [
    { filename: "LabeledSwitch.tsx", language: "tsx", source: reactSource },
    { filename: "LabeledSwitch.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "LabeledSwitch.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
