import { useEffect, useState } from "react";
import { defineComponent } from "../../../lib/registry";
import { ProgressBar } from "./ProgressBar";
import reactSource from "./ProgressBar.tsx?raw";
import cssSource from "./ProgressBar.css?raw";
import svelteSource from "./ProgressBar.svelte?raw";

function ProgressBarPreview() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 2));
    }, 60);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <ProgressBar value={value} label="Uploading files…" />
    </div>
  );
}

export default defineComponent({
  id: "progress-bar",
  name: "Progress Bar",
  category: "feedback",
  description:
    "An animated horizontal progress bar with a label, live percentage and a moving sheen.",
  tags: ["progress", "animated", "loading"],
  Preview: ProgressBarPreview,
  react: [
    { filename: "ProgressBar.tsx", language: "tsx", source: reactSource },
    { filename: "ProgressBar.css", language: "css", source: cssSource },
  ],
  svelte: [
    { filename: "ProgressBar.svelte", language: "svelte", source: svelteSource },
  ],
});
