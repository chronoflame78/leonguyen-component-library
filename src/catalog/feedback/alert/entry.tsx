import { defineComponent } from "../../../lib/registry";
import { Alert } from "./Alert";
import reactSource from "./Alert.tsx?raw";
import svelteSource from "./Alert.svelte?raw";

function AlertPreview() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert
        variant="success"
        title="Payment successful"
        message="Your subscription has been renewed for another year."
      />
      <Alert
        variant="error"
        title="Something went wrong"
        message="We couldn't process your request. Please try again."
      />
    </div>
  );
}

export default defineComponent({
  id: "alert",
  name: "Alert",
  category: "feedback",
  description:
    "A dismissible alert banner with info, success, warning and error variants, each with its own icon.",
  tags: ["alert", "banner", "dismissible"],
  Preview: AlertPreview,
  react: [{ filename: "Alert.tsx", language: "tsx", source: reactSource }],
  svelte: [{ filename: "Alert.svelte", language: "svelte", source: svelteSource }],
});
