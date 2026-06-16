import { defineComponent } from "../../../lib/registry";
import { Avatar } from "./Avatar";
import reactSource from "./Avatar.tsx?raw";
import svelteSource from "./Avatar.svelte?raw";

export default defineComponent({
  id: "avatar",
  name: "Avatar",
  category: "data-display",
  description:
    "Initials in a circle with a deterministic color, size variants and an optional online status dot.",
  tags: ["avatar", "initials", "status"],
  Preview: () => (
    <div className="flex items-end gap-5">
      <Avatar name="Ada Lovelace" size="sm" online />
      <Avatar name="Grace Hopper" size="md" online={false} />
      <Avatar name="Alan Turing" size="lg" online />
      <Avatar name="Katherine Johnson" size="xl" />
    </div>
  ),
  react: [{ filename: "Avatar.tsx", language: "tsx", source: reactSource }],
  svelte: [
    { filename: "Avatar.svelte", language: "svelte", source: svelteSource },
  ],
});
