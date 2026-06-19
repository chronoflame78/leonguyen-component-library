import { defineComponent } from "../../../lib/registry";
import { MagneticButton } from "./MagneticButton";
import reactSource from "./MagneticButton.tsx?raw";
import cssSource from "./MagneticButton.css?raw";
import svelteSource from "./MagneticButton.svelte?raw";

export default defineComponent({
  id: "magnetic-button",
  name: "Magnetic Button",
  category: "buttons",
  description:
    "An interactive button that drifts toward the cursor and springs back on leave.",
  tags: ["interactive", "magnetic", "hover"],
  Preview: () => <MagneticButton />,
  react: [
    { filename: "MagneticButton.tsx", language: "tsx", source: reactSource },
    { filename: "MagneticButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "MagneticButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
