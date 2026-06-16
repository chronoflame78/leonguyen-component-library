import { defineComponent } from "../../../lib/registry";
import { PasswordInput } from "./PasswordInput";
import reactSource from "./PasswordInput.tsx?raw";
import svelteSource from "./PasswordInput.svelte?raw";

export default defineComponent({
  id: "password-input",
  name: "Password Input",
  category: "inputs",
  description:
    "A password field with a toggle button that shows or hides the entered text.",
  tags: ["password", "toggle", "form"],
  Preview: () => (
    <div className="w-72">
      <PasswordInput defaultValue="sup3r-s3cret" />
    </div>
  ),
  react: [
    { filename: "PasswordInput.tsx", language: "tsx", source: reactSource },
  ],
  svelte: [
    {
      filename: "PasswordInput.svelte",
      language: "svelte",
      source: svelteSource,
    },
  ],
});
