import { defineComponent } from "../../../lib/registry";
import { NeonButton } from "./NeonButton";
import reactSource from "./NeonButton.tsx?raw";
import cssSource from "./NeonButton.css?raw";
import svelteSource from "./NeonButton.svelte?raw";

export default defineComponent({
  id: "neon-button",
  name: "Neon Button",
  category: "buttons",
  description:
    "An outlined button with a glowing neon border and a soft pulsing glow.",
  tags: ["neon", "glow", "outlined"],
  Preview: () => <NeonButton />,
  react: [
    { filename: "NeonButton.tsx", language: "tsx", source: reactSource },
    { filename: "NeonButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "NeonButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
