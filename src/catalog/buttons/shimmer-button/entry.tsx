import { defineComponent } from "../../../lib/registry";
import { ShimmerButton } from "./ShimmerButton";
import reactSource from "./ShimmerButton.tsx?raw";
import cssSource from "./ShimmerButton.css?raw";
import svelteSource from "./ShimmerButton.svelte?raw";

export default defineComponent({
  id: "shimmer-button",
  name: "Shimmer Button",
  category: "buttons",
  description:
    "A solid dark button with a diagonal light shine that sweeps across it.",
  tags: ["animated", "shine", "shimmer"],
  Preview: () => <ShimmerButton />,
  react: [
    { filename: "ShimmerButton.tsx", language: "tsx", source: reactSource },
    { filename: "ShimmerButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "ShimmerButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
