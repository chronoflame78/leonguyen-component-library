import { defineComponent } from "../../../lib/registry";
import { FillSweepButton } from "./FillSweepButton";
import reactSource from "./FillSweepButton.tsx?raw";
import cssSource from "./FillSweepButton.css?raw";
import svelteSource from "./FillSweepButton.svelte?raw";

export default defineComponent({
  id: "fill-sweep-button",
  name: "Fill Sweep Button",
  category: "buttons",
  description:
    "An outlined button whose solid fill sweeps in from the left as the text flips for contrast.",
  tags: ["outline", "hover", "fill"],
  Preview: () => <FillSweepButton />,
  react: [
    { filename: "FillSweepButton.tsx", language: "tsx", source: reactSource },
    { filename: "FillSweepButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "FillSweepButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
