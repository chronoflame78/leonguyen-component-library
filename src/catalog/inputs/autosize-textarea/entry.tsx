import { defineComponent } from "../../../lib/registry";
import { AutosizeTextarea } from "./AutosizeTextarea";
import reactSource from "./AutosizeTextarea.tsx?raw";
import svelteSource from "./AutosizeTextarea.svelte?raw";

export default defineComponent({
  id: "autosize-textarea",
  name: "Autosize Textarea",
  category: "inputs",
  description:
    "A textarea that grows to fit its content up to a max height, with a live character counter.",
  tags: ["textarea", "autosize", "counter"],
  Preview: () => (
    <div className="w-80">
      <AutosizeTextarea
        defaultValue="This textarea grows as you type — try adding a few more lines."
        maxLength={280}
      />
    </div>
  ),
  react: [
    {
      filename: "AutosizeTextarea.tsx",
      language: "tsx",
      source: reactSource,
    },
  ],
  svelte: [
    {
      filename: "AutosizeTextarea.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
