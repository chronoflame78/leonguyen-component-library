import { defineComponent } from "../../../lib/registry";
import { ArrowButton } from "./ArrowButton";
import reactSource from "./ArrowButton.tsx?raw";
import cssSource from "./ArrowButton.css?raw";
import svelteSource from "./ArrowButton.svelte?raw";

export default defineComponent({
  id: "arrow-button",
  name: "Arrow Button",
  category: "buttons",
  description:
    "A clean CTA button whose label shifts and arrow slides forward on hover.",
  tags: ["cta", "hover", "arrow"],
  Preview: () => <ArrowButton />,
  react: [
    { filename: "ArrowButton.tsx", language: "tsx", source: reactSource },
    { filename: "ArrowButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "ArrowButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
