import { defineComponent } from "../../../lib/registry";
import { PricingCard } from "./PricingCard";
import reactSource from "./PricingCard.tsx?raw";
import svelteSource from "./PricingCard.svelte?raw";

export default defineComponent({
  id: "pricing-card",
  name: "Pricing Card",
  category: "cards",
  description:
    "A pricing tier card with a headline price, a checklist of features and a call-to-action.",
  tags: ["pricing", "checklist", "cta"],
  Preview: () => (
    <div className="w-full max-w-xs">
      <PricingCard />
    </div>
  ),
  react: [
    { filename: "PricingCard.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    { filename: "PricingCard.svelte", language: "svelte", source: svelteSource },
  ],
});
