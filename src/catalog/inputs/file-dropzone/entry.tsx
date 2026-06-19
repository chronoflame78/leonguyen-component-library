import { defineComponent } from "../../../lib/registry";
import { FileDropzone } from "./FileDropzone";
import reactSource from "./FileDropzone.tsx?raw";
import svelteSource from "./FileDropzone.svelte?raw";

export default defineComponent({
  id: "file-dropzone",
  name: "File Dropzone",
  category: "inputs",
  description:
    "A drag-and-drop upload area with click-to-browse that lists chosen files, sizes and a running total.",
  tags: ["file", "drag-drop", "upload"],
  Preview: () => (
    <div className="w-80">
      <FileDropzone />
    </div>
  ),
  react: [
    { filename: "FileDropzone.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    {
      filename: "FileDropzone.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
