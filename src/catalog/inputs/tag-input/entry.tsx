import { defineComponent } from "../../../lib/registry";
import { TagInput } from "./TagInput";
import reactSource from "./TagInput.tsx?raw";
import svelteSource from "./TagInput.svelte?raw";

export default defineComponent({
  id: "tag-input",
  name: "Tag Input",
  category: "inputs",
  description:
    "A chips entry field: type and press Enter or comma to add tags, click ✕ or Backspace to remove them.",
  tags: ["tags", "chips", "interactive"],
  Preview: () => (
    <div className="w-80">
      <TagInput defaultTags={["react", "svelte"]} />
    </div>
  ),
  react: [{ filename: "TagInput.tsx", language: "tsx", source: reactSource }],
  svelte: [
    { filename: "TagInput.svelte", language: "svelte", source: svelteSource },
  ],
});
