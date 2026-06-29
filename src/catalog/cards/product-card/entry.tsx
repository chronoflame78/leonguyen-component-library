import { defineComponent } from "../../../lib/registry";
import { ProductCard } from "./ProductCard";
import reactSource from "./ProductCard.tsx?raw";
import svelteSource from "./ProductCard.svelte?raw";

export default defineComponent({
  id: "product-card",
  name: "Product Card",
  category: "cards",
  description:
    "An e-commerce product card with a thumbnail, discount badge, star rating and an add-to-cart toggle.",
  tags: ["product", "ecommerce", "rating", "price"],
  Preview: () => (
    <div className="w-full max-w-xs">
      <ProductCard />
    </div>
  ),
  react: [
    { filename: "ProductCard.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    { filename: "ProductCard.svelte", language: "svelte", source: svelteSource },
  ],
});
