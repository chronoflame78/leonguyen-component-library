import { defineComponent } from "../../../lib/registry";
import { LikeToggle } from "./LikeToggle";
import reactSource from "./LikeToggle.tsx?raw";
import cssSource from "./LikeToggle.css?raw";
import svelteSource from "./LikeToggle.svelte?raw";

export default defineComponent({
  id: "like-toggle",
  name: "Like Toggle",
  category: "toggles",
  description:
    "A heart favorite button that pops, pulses a ring and bursts particles when liked.",
  tags: ["heart", "favorite", "animated"],
  Preview: () => <LikeToggle label="Add to favorites" />,
  react: [
    { filename: "LikeToggle.tsx", language: "tsx", source: reactSource },
    { filename: "LikeToggle.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "LikeToggle.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
