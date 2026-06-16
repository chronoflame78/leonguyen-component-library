import { defineComponent } from "../../../lib/registry";
import { Sparkline } from "./Sparkline";
import reactSource from "./Sparkline.tsx?raw";
import svelteSource from "./Sparkline.svelte?raw";

export default defineComponent({
  id: "sparkline",
  name: "Sparkline",
  category: "charts",
  description:
    "A compact inline SVG line chart with an optional gradient area fill, computed from an array of numbers.",
  tags: ["svg", "line", "inline"],
  Preview: () => (
    <div style={{ width: "100%", maxWidth: 320 }}>
      <Sparkline
        label="Revenue"
        color="#38bdf8"
        data={[12, 18, 9, 24, 16, 30, 22, 38, 28, 44, 36, 52]}
      />
    </div>
  ),
  react: [{ filename: "Sparkline.tsx", language: "tsx", source: reactSource }],
  svelte: [
    { filename: "Sparkline.svelte", language: "svelte", source: svelteSource },
  ],
});
