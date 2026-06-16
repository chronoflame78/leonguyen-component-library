import { defineComponent } from "../../../lib/registry";
import { BarChart } from "./BarChart";
import reactSource from "./BarChart.tsx?raw";
import cssSource from "./BarChart.css?raw";
import svelteSource from "./BarChart.svelte?raw";

export default defineComponent({
  id: "bar-chart",
  name: "Bar Chart",
  category: "charts",
  description:
    "A simple vertical SVG bar chart with an axis baseline, value labels and a staggered grow-in animation.",
  tags: ["svg", "bars", "animated"],
  Preview: () => (
    <div style={{ width: "100%", maxWidth: 360 }}>
      <BarChart color="#a855f7" />
    </div>
  ),
  react: [
    { filename: "BarChart.tsx", language: "tsx", source: reactSource },
    { filename: "BarChart.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "BarChart.svelte", language: "svelte", source: svelteSource },
  ],
});
