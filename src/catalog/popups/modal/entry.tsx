import { defineComponent } from "../../../lib/registry";
import { Modal } from "./Modal";
import reactSource from "./Modal.tsx?raw";
import cssSource from "./Modal.css?raw";
import svelteSource from "./Modal.svelte?raw";

export default defineComponent({
  id: "modal",
  name: "Modal",
  category: "popups",
  description:
    "A dialog with a dimmed backdrop that closes on Escape or backdrop click, with a fade and scale-in animation.",
  tags: ["dialog", "overlay", "animated"],
  Preview: () => <Modal />,
  react: [
    { filename: "Modal.tsx", language: "tsx", source: reactSource },
    { filename: "Modal.css", language: "css", source: cssSource },
  ],
  svelte: [{ filename: "Modal.svelte", language: "svelte", source: svelteSource }],
});
