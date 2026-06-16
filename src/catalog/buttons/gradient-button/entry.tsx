import { defineComponent } from "../../../lib/registry";
import { GradientButton } from "./GradientButton";
import reactSource from "./GradientButton.tsx?raw";
import cssSource from "./GradientButton.css?raw";
import svelteSource from "./GradientButton.svelte?raw";

export default defineComponent({
  id: "gradient-button",
  name: "Gradient Button",
  category: "buttons",
  description: "A pill button with an animated, shifting gradient background.",
  tags: ["animated", "gradient", "cta"],
  Preview: () => <GradientButton />,
  react: [
    { filename: "GradientButton.tsx", language: "tsx", source: reactSource },
    { filename: "GradientButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "GradientButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
