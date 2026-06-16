import { defineComponent } from "../../../lib/registry";
import { ImageCarousel } from "./ImageCarousel";
import reactSource from "./ImageCarousel.tsx?raw";
import cssSource from "./ImageCarousel.css?raw";
import svelteSource from "./ImageCarousel.svelte?raw";

export default defineComponent({
  id: "image-carousel",
  name: "Image Carousel",
  category: "carousel",
  description:
    "A sliding carousel with arrow controls and clickable dots that wrap around at the ends.",
  tags: ["slider", "gallery", "interactive"],
  Preview: () => (
    <div style={{ width: "100%", maxWidth: "32rem", margin: "0 auto" }}>
      <ImageCarousel />
    </div>
  ),
  react: [
    { filename: "ImageCarousel.tsx", language: "tsx", source: reactSource },
    { filename: "ImageCarousel.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "ImageCarousel.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
