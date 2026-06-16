import { defineComponent } from "../../../lib/registry";
import { ProfileCard } from "./ProfileCard";
import reactSource from "./ProfileCard.tsx?raw";
import svelteSource from "./ProfileCard.svelte?raw";

export default defineComponent({
  id: "profile-card",
  name: "Profile Card",
  category: "cards",
  description:
    "A user profile card with an initials avatar, bio, follower stats and a toggling Follow button.",
  tags: ["profile", "avatar", "social", "interactive"],
  Preview: () => (
    <div className="w-full max-w-sm">
      <ProfileCard />
    </div>
  ),
  react: [
    { filename: "ProfileCard.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    { filename: "ProfileCard.svelte", language: "svelte", source: svelteSource },
  ],
});
