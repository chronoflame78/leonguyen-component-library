import { defineComponent } from "../../../lib/registry";
import { CharLimitInput } from "./CharLimitInput";
import reactSource from "./CharLimitInput.tsx?raw";
import cssSource from "./CharLimitInput.css?raw";
import svelteSource from "./CharLimitInput.svelte?raw";

export default defineComponent({
  id: "char-limit-input",
  name: "Char Limit Input",
  category: "inputs",
  description:
    "A length-capped text input with a circular SVG progress ring that fills and changes color as you near the limit.",
  tags: ["limit", "progress", "counter"],
  Preview: () => (
    <div className="w-72">
      <CharLimitInput maxLength={50} defaultValue="Hello there" />
    </div>
  ),
  react: [
    { filename: "CharLimitInput.tsx", language: "tsx", source: reactSource },
    { filename: "CharLimitInput.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "CharLimitInput.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
