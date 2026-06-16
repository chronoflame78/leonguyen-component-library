import { defineComponent } from "../../../lib/registry";
import { Stepper } from "./Stepper";
import reactSource from "./Stepper.tsx?raw";
import svelteSource from "./Stepper.svelte?raw";

export default defineComponent({
  id: "stepper",
  name: "Stepper",
  category: "navigation",
  description:
    "A horizontal multi-step progress indicator with connector lines, checked completed steps and Back/Next controls.",
  tags: ["stepper", "progress", "interactive"],
  Preview: () => (
    <div className="flex justify-center">
      <Stepper />
    </div>
  ),
  react: [{ filename: "Stepper.tsx", language: "tsx", source: reactSource }],
  svelte: [
    { filename: "Stepper.svelte", language: "svelte", source: svelteSource },
  ],
});
