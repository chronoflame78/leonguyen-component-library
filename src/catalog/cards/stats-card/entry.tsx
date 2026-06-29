import { defineComponent } from "../../../lib/registry";
import { StatsCard } from "./StatsCard";
import reactSource from "./StatsCard.tsx?raw";
import svelteSource from "./StatsCard.svelte?raw";

export default defineComponent({
  id: "stats-card",
  name: "Stats Card",
  category: "cards",
  description:
    "A KPI card with a metric, a trend pill and an inline SVG sparkline of the series.",
  tags: ["stats", "kpi", "sparkline", "dashboard"],
  Preview: () => (
    <div className="w-full max-w-xs">
      <StatsCard />
    </div>
  ),
  react: [{ filename: "StatsCard.tsx", language: "tsx", source: reactSource }],
  svelte: [
    { filename: "StatsCard.svelte", language: "svelte", source: svelteSource },
  ],
});
