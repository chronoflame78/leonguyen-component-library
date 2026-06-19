import { defineComponent } from "../../../lib/registry";
import { SparkleButton } from "./SparkleButton";
import reactSource from "./SparkleButton.tsx?raw";
import cssSource from "./SparkleButton.css?raw";
import svelteSource from "./SparkleButton.svelte?raw";

export default defineComponent({
  id: "sparkle-button",
  name: "Sparkle Button",
  category: "buttons",
  description:
    "An interactive button that bursts little star particles outward on every click.",
  tags: ["interactive", "particles", "sparkle"],
  Preview: () => <SparkleButton />,
  react: [
    { filename: "SparkleButton.tsx", language: "tsx", source: reactSource },
    { filename: "SparkleButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "SparkleButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
