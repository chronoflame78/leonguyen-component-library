import { defineComponent } from "../../../lib/registry";
import { ImageGallery } from "./ImageGallery";
import reactSource from "./ImageGallery.tsx?raw";
import cssSource from "./ImageGallery.css?raw";
import svelteSource from "./ImageGallery.svelte?raw";

export default defineComponent({
  id: "image-gallery",
  name: "Image Gallery",
  category: "media",
  description:
    "A thumbnail grid that opens a lightbox with prev/next navigation and a close button.",
  tags: ["lightbox", "grid", "interactive"],
  Preview: () => (
    <div style={{ width: "100%", maxWidth: 440 }}>
      <ImageGallery />
    </div>
  ),
  react: [
    { filename: "ImageGallery.tsx", language: "tsx", source: reactSource },
    { filename: "ImageGallery.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "ImageGallery.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
