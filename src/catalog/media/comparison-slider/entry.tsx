import { defineComponent } from "../../../lib/registry";
import { ComparisonSlider } from "./ComparisonSlider";
import reactSource from "./ComparisonSlider.tsx?raw";
import cssSource from "./ComparisonSlider.css?raw";
import svelteSource from "./ComparisonSlider.svelte?raw";

export default defineComponent({
  id: "comparison-slider",
  name: "Comparison Slider",
  category: "media",
  description:
    "A before/after comparison with a draggable vertical handle that reveals each side.",
  tags: ["before-after", "drag", "interactive"],
  Preview: () => (
    <div style={{ width: "100%", maxWidth: 460 }}>
      <ComparisonSlider />
    </div>
  ),
  react: [
    {
      filename: "ComparisonSlider.tsx",
      language: "tsx",
      source: reactSource,
    },
    {
      filename: "ComparisonSlider.css",
      language: "css",
      source: cssSource,
    },
  ],
  svelte: [
    {
      filename: "ComparisonSlider.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
