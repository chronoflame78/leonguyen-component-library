import { defineComponent } from "../../../lib/registry";
import { CreditCardInput } from "./CreditCardInput";
import reactSource from "./CreditCardInput.tsx?raw";
import svelteSource from "./CreditCardInput.svelte?raw";

function CreditCardInputPreview() {
  return (
    <div className="w-80">
      <CreditCardInput />
    </div>
  );
}

export default defineComponent({
  id: "credit-card-input",
  name: "Credit Card Input",
  category: "inputs",
  description:
    "A card-number field that formats digits into groups, detects the brand from the prefix, and shows a live brand badge.",
  tags: ["payment", "formatting", "mask"],
  Preview: CreditCardInputPreview,
  react: [
    {
      filename: "CreditCardInput.tsx",
      language: "tsx",
      source: reactSource,
    },
  ],
  svelte: [
    {
      filename: "CreditCardInput.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
