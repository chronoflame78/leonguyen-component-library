import { defineComponent } from "../../../lib/registry";
import { Push3DButton } from "./Push3DButton";
import reactSource from "./Push3DButton.tsx?raw";
import cssSource from "./Push3DButton.css?raw";
import svelteSource from "./Push3DButton.svelte?raw";

export default defineComponent({
  id: "push-3d-button",
  name: "Push 3D Button",
  category: "buttons",
  description:
    "A chunky 3D button that presses down onto a colored base layer on click.",
  tags: ["3d", "tactile", "press"],
  Preview: () => <Push3DButton />,
  react: [
    { filename: "Push3DButton.tsx", language: "tsx", source: reactSource },
    { filename: "Push3DButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "Push3DButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
