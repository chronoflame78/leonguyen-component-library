import { defineComponent } from "../../../lib/registry";
import { GlitchButton } from "./GlitchButton";
import reactSource from "./GlitchButton.tsx?raw";
import cssSource from "./GlitchButton.css?raw";
import svelteSource from "./GlitchButton.svelte?raw";

export default defineComponent({
  id: "glitch-button",
  name: "Glitch Button",
  category: "buttons",
  description:
    "A cyberpunk button that splits into jittering cyan and magenta copies on hover.",
  tags: ["cyberpunk", "glitch", "hover"],
  Preview: () => <GlitchButton />,
  react: [
    { filename: "GlitchButton.tsx", language: "tsx", source: reactSource },
    { filename: "GlitchButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "GlitchButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
