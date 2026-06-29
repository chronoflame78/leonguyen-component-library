import { defineComponent } from "../../../lib/registry";
import { TiltCard } from "./TiltCard";
import reactSource from "./TiltCard.tsx?raw";
import cssSource from "./TiltCard.css?raw";
import svelteSource from "./TiltCard.svelte?raw";

export default defineComponent({
  id: "tilt-card",
  name: "Tilt Card",
  category: "cards",
  description:
    "An interactive 3D card that tilts toward the cursor with a moving glare highlight.",
  tags: ["3d", "tilt", "interactive", "parallax"],
  Preview: () => <TiltCard />,
  react: [
    { filename: "TiltCard.tsx", language: "tsx", source: reactSource },
    { filename: "TiltCard.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "TiltCard.svelte", language: "svelte", source: svelteSource },
  ],
});
