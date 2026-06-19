import { defineComponent } from "../../../lib/registry";
import { BorderGradientButton } from "./BorderGradientButton";
import reactSource from "./BorderGradientButton.tsx?raw";
import cssSource from "./BorderGradientButton.css?raw";
import svelteSource from "./BorderGradientButton.svelte?raw";

export default defineComponent({
  id: "border-gradient-button",
  name: "Border Gradient Button",
  category: "buttons",
  description:
    "A dark pill with an animated conic gradient border that rotates around it.",
  tags: ["animated", "gradient", "border"],
  Preview: () => <BorderGradientButton />,
  react: [
    {
      filename: "BorderGradientButton.tsx",
      language: "tsx",
      source: reactSource,
    },
    {
      filename: "BorderGradientButton.css",
      language: "css",
      source: cssSource,
    },
  ],
  svelte: [
    {
      filename: "BorderGradientButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
