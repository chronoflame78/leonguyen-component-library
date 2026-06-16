import { defineComponent } from "../../../lib/registry";
import { DataTable } from "./DataTable";
import reactSource from "./DataTable.tsx?raw";
import svelteSource from "./DataTable.svelte?raw";

export default defineComponent({
  id: "data-table",
  name: "Data Table",
  category: "data-display",
  description:
    "A styled table with zebra rows, hover highlight and clickable headers that sort the data.",
  tags: ["table", "sortable", "interactive"],
  Preview: () => (
    <div className="w-full max-w-xl">
      <DataTable />
    </div>
  ),
  react: [{ filename: "DataTable.tsx", language: "tsx", source: reactSource }],
  svelte: [
    { filename: "DataTable.svelte", language: "svelte", source: svelteSource },
  ],
});
