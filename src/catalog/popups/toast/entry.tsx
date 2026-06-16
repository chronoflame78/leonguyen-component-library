import { defineComponent } from "../../../lib/registry";
import { Toast } from "./Toast";
import reactSource from "./Toast.tsx?raw";
import cssSource from "./Toast.css?raw";
import svelteSource from "./Toast.svelte?raw";

export default defineComponent({
  id: "toast",
  name: "Toast",
  category: "popups",
  description:
    "A notification that slides in from the top-right, auto-dismisses after a few seconds, and can be closed manually.",
  tags: ["notification", "animated", "auto-dismiss"],
  Preview: () => <Toast />,
  react: [
    { filename: "Toast.tsx", language: "tsx", source: reactSource },
    { filename: "Toast.css", language: "css", source: cssSource },
  ],
  svelte: [{ filename: "Toast.svelte", language: "svelte", source: svelteSource }],
});
