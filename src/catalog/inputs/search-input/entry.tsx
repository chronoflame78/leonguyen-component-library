import { useState } from "react";
import { defineComponent } from "../../../lib/registry";
import { SearchInput } from "./SearchInput";
import reactSource from "./SearchInput.tsx?raw";
import svelteSource from "./SearchInput.svelte?raw";

function SearchInputPreview() {
  const [value, setValue] = useState("Wireless headphones");
  return (
    <div className="w-72">
      <SearchInput value={value} onValueChange={setValue} />
    </div>
  );
}

export default defineComponent({
  id: "search-input",
  name: "Search Input",
  category: "inputs",
  description:
    "A search field with a magnifier icon and a clear button that appears when typing.",
  tags: ["search", "icon", "interactive"],
  Preview: SearchInputPreview,
  react: [
    { filename: "SearchInput.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    {
      filename: "SearchInput.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
