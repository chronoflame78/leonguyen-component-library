import { defineComponent } from "../../../lib/registry";
import { DatePicker } from "./DatePicker";
import reactSource from "./DatePicker.tsx?raw";
import svelteSource from "./DatePicker.svelte?raw";

export default defineComponent({
  id: "date-picker",
  name: "Date Picker",
  category: "forms",
  description:
    "A calendar date picker with a month grid, prev/next navigation, and today and selected-day highlights.",
  tags: ["calendar", "accessible", "form"],
  Preview: () => (
    <div className="w-72">
      <DatePicker />
    </div>
  ),
  react: [
    { filename: "DatePicker.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    { filename: "DatePicker.svelte", language: "svelte", source: svelteSource },
  ],
});
