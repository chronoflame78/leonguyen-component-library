import { defineComponent } from "../../../lib/registry";
import { ArticleCard } from "./ArticleCard";
import reactSource from "./ArticleCard.tsx?raw";
import svelteSource from "./ArticleCard.svelte?raw";

export default defineComponent({
  id: "article-card",
  name: "Article Card",
  category: "cards",
  description:
    "A blog post card with a gradient cover, category badge, excerpt and an author footer.",
  tags: ["article", "blog", "preview", "author"],
  Preview: () => (
    <div className="w-full max-w-sm">
      <ArticleCard />
    </div>
  ),
  react: [
    { filename: "ArticleCard.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    { filename: "ArticleCard.svelte", language: "svelte", source: svelteSource },
  ],
});
