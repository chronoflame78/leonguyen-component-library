import { defineComponent } from "../../../lib/registry";
import { Checkbox } from "./Checkbox";
import reactSource from "./Checkbox.tsx?raw";
import cssSource from "./Checkbox.css?raw";
import svelteSource from "./Checkbox.svelte?raw";

export default defineComponent({
  id: "checkbox",
  name: "Checkbox",
  category: "forms",
  description:
    "A custom-styled checkbox with an animated checkmark and checked, unchecked and indeterminate states.",
  tags: ["accessible", "animated", "form"],
  Preview: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Subscribe to newsletter" defaultChecked />
      <Checkbox label="Enable two-factor auth" />
      <Checkbox label="Some items selected" indeterminate />
      <Checkbox label="Unavailable option" disabled />
    </div>
  ),
  react: [
    { filename: "Checkbox.tsx", language: "tsx", source: reactSource },
    { filename: "Checkbox.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "Checkbox.svelte", language: "svelte", source: svelteSource },
  ],
});
