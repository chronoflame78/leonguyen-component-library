import { defineComponent } from "../../../lib/registry";
import { UnderlineInput } from "./UnderlineInput";
import reactSource from "./UnderlineInput.tsx?raw";
import cssSource from "./UnderlineInput.css?raw";
import svelteSource from "./UnderlineInput.svelte?raw";

export default defineComponent({
  id: "underline-input",
  name: "Underline Input",
  category: "inputs",
  description:
    "A minimal Material-style field with a floating label and an underline that expands from the center on focus.",
  tags: ["material", "underline", "animated"],
  Preview: () => (
    <div className="w-72">
      <UnderlineInput label="Full name" />
    </div>
  ),
  react: [
    { filename: "UnderlineInput.tsx", language: "tsx", source: reactSource },
    { filename: "UnderlineInput.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "UnderlineInput.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
