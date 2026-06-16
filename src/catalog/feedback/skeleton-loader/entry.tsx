import { defineComponent } from "../../../lib/registry";
import { SkeletonLoader } from "./SkeletonLoader";
import reactSource from "./SkeletonLoader.tsx?raw";
import cssSource from "./SkeletonLoader.css?raw";
import svelteSource from "./SkeletonLoader.svelte?raw";

function SkeletonLoaderPreview() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-4">
      <SkeletonLoader lines={3} />
    </div>
  );
}

export default defineComponent({
  id: "skeleton-loader",
  name: "Skeleton Loader",
  category: "feedback",
  description:
    "Shimmering placeholder blocks — an avatar circle plus text lines — for loading states.",
  tags: ["skeleton", "loading", "shimmer"],
  Preview: SkeletonLoaderPreview,
  react: [
    { filename: "SkeletonLoader.tsx", language: "tsx", source: reactSource },
    { filename: "SkeletonLoader.css", language: "css", source: cssSource },
  ],
  svelte: [
    {
      filename: "SkeletonLoader.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
