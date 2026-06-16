import { defineComponent } from "../../../lib/registry";
import { Splitter } from "./Splitter";
import reactSource from "./Splitter.tsx?raw";
import cssSource from "./Splitter.css?raw";
import svelteSource from "./Splitter.svelte?raw";

const paneStyle: React.CSSProperties = {
  height: "100%",
  padding: "1rem",
  color: "#e2e8f0",
  fontSize: "0.85rem",
  lineHeight: 1.5,
};

export default defineComponent({
  id: "splitter",
  name: "Splitter",
  category: "layout",
  description:
    "Two resizable panes separated by a draggable handle, clamped to a min and max width.",
  tags: ["resizable", "panes", "drag"],
  Preview: () => (
    <div style={{ width: "26rem", maxWidth: "100%", height: "10rem" }}>
      <Splitter
        start={
          <div style={paneStyle}>
            <strong>Left</strong>
            <p style={{ margin: "0.5rem 0 0" }}>Drag the handle to resize.</p>
          </div>
        }
        end={
          <div style={paneStyle}>
            <strong>Right</strong>
            <p style={{ margin: "0.5rem 0 0" }}>Panes clamp between 15% and 85%.</p>
          </div>
        }
      />
    </div>
  ),
  react: [
    { filename: "Splitter.tsx", language: "tsx", source: reactSource },
    { filename: "Splitter.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "Splitter.svelte", language: "svelte", source: svelteSource },
  ],
});
