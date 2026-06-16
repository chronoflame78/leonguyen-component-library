import { defineComponent } from "../../../lib/registry";
import { Badge } from "./Badge";
import reactSource from "./Badge.tsx?raw";
import svelteSource from "./Badge.svelte?raw";

function BadgePreview() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="solid" color="blue">
          New
        </Badge>
        <Badge variant="solid" color="green">
          Active
        </Badge>
        <Badge variant="solid" color="amber">
          Pending
        </Badge>
        <Badge variant="solid" color="red">
          Failed
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="soft" color="purple">
          Beta
        </Badge>
        <Badge variant="soft" color="gray">
          Draft
        </Badge>
        <Badge variant="dot" color="green">
          Online
        </Badge>
        <Badge variant="dot" color="red">
          Offline
        </Badge>
      </div>
    </div>
  );
}

export default defineComponent({
  id: "badge",
  name: "Badge",
  category: "feedback",
  description:
    "Small status and count badges with solid, soft and dot variants across several colors.",
  tags: ["badge", "status", "label"],
  Preview: BadgePreview,
  react: [{ filename: "Badge.tsx", language: "tsx", source: reactSource }],
  svelte: [{ filename: "Badge.svelte", language: "svelte", source: svelteSource }],
});
