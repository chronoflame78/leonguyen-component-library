import { defineComponent } from "../../../lib/registry";
import { RippleButton } from "./RippleButton";
import reactSource from "./RippleButton.tsx?raw";
import cssSource from "./RippleButton.css?raw";
import svelteSource from "./RippleButton.svelte?raw";

export default defineComponent({
  id: "ripple-button",
  name: "Ripple Button",
  category: "buttons",
  description:
    "A button that emits a Material-style ripple expanding from the click point.",
  tags: ["material", "ripple", "animated"],
  Preview: () => <RippleButton>Click Me</RippleButton>,
  react: [
    { filename: "RippleButton.tsx", language: "tsx", source: reactSource },
    { filename: "RippleButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "RippleButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
