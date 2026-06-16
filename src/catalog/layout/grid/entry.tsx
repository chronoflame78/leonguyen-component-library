import { defineComponent } from "../../../lib/registry";
import { Grid } from "./Grid";
import reactSource from "./Grid.tsx?raw";
import cssSource from "./Grid.css?raw";
import svelteSource from "./Grid.svelte?raw";

const tiles = [
  { label: "Aurora", background: "linear-gradient(135deg, #6366f1, #a855f7)" },
  { label: "Sunset", background: "linear-gradient(135deg, #ec4899, #f97316)" },
  { label: "Lagoon", background: "linear-gradient(135deg, #06b6d4, #22c55e)" },
  { label: "Nebula", background: "linear-gradient(135deg, #f43f5e, #8b5cf6)" },
  { label: "Ember", background: "linear-gradient(135deg, #f59e0b, #ef4444)" },
  { label: "Frost", background: "linear-gradient(135deg, #38bdf8, #818cf8)" },
];

export default defineComponent({
  id: "grid",
  name: "Grid",
  category: "layout",
  description:
    "A responsive auto-fitting card grid that reflows columns by available width.",
  tags: ["responsive", "grid", "auto-fill"],
  Preview: () => (
    <div style={{ width: "26rem", maxWidth: "100%" }}>
      <Grid minColumnWidth="7rem">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            style={{
              background: tile.background,
              borderRadius: "0.75rem",
              height: "5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            {tile.label}
          </div>
        ))}
      </Grid>
    </div>
  ),
  react: [
    { filename: "Grid.tsx", language: "tsx", source: reactSource },
    { filename: "Grid.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "Grid.svelte", language: "svelte", source: svelteSource },
  ],
});
