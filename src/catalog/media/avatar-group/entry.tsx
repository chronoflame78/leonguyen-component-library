import { defineComponent } from "../../../lib/registry";
import { AvatarGroup } from "./AvatarGroup";
import reactSource from "./AvatarGroup.tsx?raw";
import svelteSource from "./AvatarGroup.svelte?raw";

export default defineComponent({
  id: "avatar-group",
  name: "Avatar Group",
  category: "media",
  description:
    "A row of overlapping initial avatars with a +N overflow chip past the max shown.",
  tags: ["avatars", "stack", "overflow"],
  Preview: () => <AvatarGroup />,
  react: [{ filename: "AvatarGroup.tsx", language: "tsx", source: reactSource }],
  svelte: [
    { filename: "AvatarGroup.svelte", language: "svelte", source: svelteSource },
  ],
});
