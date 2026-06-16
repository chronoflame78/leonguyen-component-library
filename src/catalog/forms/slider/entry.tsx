import { defineComponent } from "../../../lib/registry";
import { Slider } from "./Slider";
import reactSource from "./Slider.tsx?raw";
import cssSource from "./Slider.css?raw";
import svelteSource from "./Slider.svelte?raw";

export default defineComponent({
  id: "slider",
  name: "Slider",
  category: "forms",
  description:
    "A range slider with a gradient-filled track, draggable thumb and a value bubble that follows it.",
  tags: ["range", "draggable", "form"],
  Preview: () => (
    <div className="w-72">
      <Slider label="Volume" defaultValue={65} />
    </div>
  ),
  react: [
    { filename: "Slider.tsx", language: "tsx", source: reactSource },
    { filename: "Slider.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "Slider.svelte", language: "svelte", source: svelteSource },
  ],
});
