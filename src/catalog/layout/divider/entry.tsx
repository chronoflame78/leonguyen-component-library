import { defineComponent } from "../../../lib/registry";
import { Divider } from "./Divider";
import reactSource from "./Divider.tsx?raw";
import cssSource from "./Divider.css?raw";
import svelteSource from "./Divider.svelte?raw";

export default defineComponent({
  id: "divider",
  name: "Divider",
  category: "layout",
  description:
    "A horizontal or vertical separator line, optionally with a centered label.",
  tags: ["separator", "label", "rule"],
  Preview: () => (
    <div style={{ width: "20rem", color: "#e2e8f0" }}>
      <Divider label="OR" />
    </div>
  ),
  react: [
    { filename: "Divider.tsx", language: "tsx", source: reactSource },
    { filename: "Divider.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "Divider.svelte", language: "svelte", source: svelteSource },
  ],
});
