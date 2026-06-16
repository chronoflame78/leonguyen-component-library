import { defineComponent } from "../../../lib/registry";
import { Accordion } from "./Accordion";
import reactSource from "./Accordion.tsx?raw";
import cssSource from "./Accordion.css?raw";
import svelteSource from "./Accordion.svelte?raw";

export default defineComponent({
  id: "accordion",
  name: "Accordion",
  category: "data-display",
  description:
    "Expandable sections with a smooth height/opacity transition and a rotating chevron.",
  tags: ["collapsible", "animated", "interactive"],
  Preview: () => (
    <div className="w-full max-w-md">
      <Accordion />
    </div>
  ),
  react: [
    { filename: "Accordion.tsx", language: "tsx", source: reactSource },
    { filename: "Accordion.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "Accordion.svelte", language: "svelte", source: svelteSource },
  ],
});
