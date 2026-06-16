import { defineComponent } from "../../../lib/registry";
import { RadioGroup } from "./RadioGroup";
import reactSource from "./RadioGroup.tsx?raw";
import svelteSource from "./RadioGroup.svelte?raw";

export default defineComponent({
  id: "radio-group",
  name: "Radio Group",
  category: "forms",
  description:
    "A group of single-select radio options where choosing one deselects the others.",
  tags: ["accessible", "single-select", "form"],
  Preview: () => (
    <div className="w-72">
      <RadioGroup
        name="plan"
        defaultValue="pro"
        options={[
          { value: "free", label: "Free", description: "For hobby projects" },
          { value: "pro", label: "Pro", description: "For growing teams" },
          {
            value: "enterprise",
            label: "Enterprise",
            description: "Custom limits & SSO",
          },
        ]}
      />
    </div>
  ),
  react: [
    { filename: "RadioGroup.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    { filename: "RadioGroup.svelte", language: "svelte", source: svelteSource },
  ],
});
