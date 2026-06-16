import { useState } from "react";
import { defineComponent } from "../../../lib/registry";
import { LoadingButton } from "./LoadingButton";
import reactSource from "./LoadingButton.tsx?raw";
import cssSource from "./LoadingButton.css?raw";
import svelteSource from "./LoadingButton.svelte?raw";

function LoadingButtonPreview() {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1500);
  }

  return (
    <LoadingButton loading={loading} onClick={handleClick}>
      Save Changes
    </LoadingButton>
  );
}

export default defineComponent({
  id: "loading-button",
  name: "Loading Button",
  category: "buttons",
  description:
    "A button that shows an inline spinner and disables itself while loading.",
  tags: ["loading", "spinner", "async"],
  Preview: LoadingButtonPreview,
  react: [
    { filename: "LoadingButton.tsx", language: "tsx", source: reactSource },
    { filename: "LoadingButton.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "LoadingButton.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
