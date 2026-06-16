import { defineComponent } from "../../../lib/registry";
import { FloatingLabelInput } from "./FloatingLabelInput";
import reactSource from "./FloatingLabelInput.tsx?raw";
import cssSource from "./FloatingLabelInput.css?raw";
import svelteSource from "./FloatingLabelInput.svelte?raw";

export default defineComponent({
  id: "floating-label-input",
  name: "Floating Label Input",
  category: "inputs",
  description:
    "A text input whose label floats above the field when focused or filled.",
  tags: ["animated", "label", "form"],
  Preview: () => (
    <div className="w-72">
      <FloatingLabelInput label="Email address" type="email" />
    </div>
  ),
  react: [
    {
      filename: "FloatingLabelInput.tsx",
      language: "tsx",
      source: reactSource,
    },
    {
      filename: "FloatingLabelInput.css",
      language: "css",
      source: cssSource,
    },
  ],
  svelte: [
    {
      filename: "FloatingLabelInput.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
