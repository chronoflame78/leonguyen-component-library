import { defineComponent } from "../../../lib/registry";
import { Select } from "./Select";
import reactSource from "./Select.tsx?raw";
import svelteSource from "./Select.svelte?raw";

export default defineComponent({
  id: "select",
  name: "Select",
  category: "forms",
  description:
    "A custom dropdown select that opens a list of options and closes on outside click or Escape.",
  tags: ["dropdown", "accessible", "form"],
  Preview: () => (
    <div className="w-64">
      <Select
        defaultValue="banana"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
          { value: "dragonfruit", label: "Dragonfruit" },
          { value: "elderberry", label: "Elderberry" },
        ]}
      />
    </div>
  ),
  react: [{ filename: "Select.tsx", language: "tsx", source: reactSource }],
  svelte: [
    { filename: "Select.svelte", language: "svelte", source: svelteSource },
  ],
});
