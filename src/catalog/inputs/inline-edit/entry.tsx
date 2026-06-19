import { defineComponent } from "../../../lib/registry";
import { InlineEdit } from "./InlineEdit";
import reactSource from "./InlineEdit.tsx?raw";
import svelteSource from "./InlineEdit.svelte?raw";

export default defineComponent({
  id: "inline-edit",
  name: "Inline Edit",
  category: "inputs",
  description:
    "Click-to-edit text: tap the value to swap in a prefilled input, commit with Enter or Save, revert with Escape or Cancel.",
  tags: ["inline", "edit", "interactive"],
  Preview: () => (
    <div className="w-72">
      <InlineEdit defaultValue="Project Apollo" />
    </div>
  ),
  react: [
    { filename: "InlineEdit.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    { filename: "InlineEdit.svelte", language: "svelte", source: svelteSource },
  ],
});
