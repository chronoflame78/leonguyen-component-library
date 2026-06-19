import { defineComponent } from "../../../lib/registry";
import { SegmentedToggle } from "./SegmentedToggle";
import reactSource from "./SegmentedToggle.tsx?raw";
import cssSource from "./SegmentedToggle.css?raw";
import svelteSource from "./SegmentedToggle.svelte?raw";

export default defineComponent({
  id: "segmented-toggle",
  name: "Segmented Toggle",
  category: "toggles",
  description:
    "A segmented control with a gradient highlight pill that glides under the active option.",
  tags: ["segmented", "radiogroup", "animated"],
  Preview: () => (
    <SegmentedToggle
      options={["Monthly", "Yearly"]}
      defaultIndex={1}
      label="Billing period"
    />
  ),
  react: [
    { filename: "SegmentedToggle.tsx", language: "tsx", source: reactSource },
    { filename: "SegmentedToggle.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "SegmentedToggle.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
