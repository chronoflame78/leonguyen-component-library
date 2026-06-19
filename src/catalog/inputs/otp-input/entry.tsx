import { useState } from "react";
import { defineComponent } from "../../../lib/registry";
import { OtpInput } from "./OtpInput";
import reactSource from "./OtpInput.tsx?raw";
import svelteSource from "./OtpInput.svelte?raw";

function OtpInputPreview() {
  const [code, setCode] = useState("");
  return (
    <div className="flex flex-col items-center gap-4">
      <OtpInput length={6} onChange={setCode} />
      <p className="text-sm text-white/50">
        Code:{" "}
        <span className="font-mono tracking-widest text-[#f8f8fc]">
          {code || "______"}
        </span>
      </p>
    </div>
  );
}

export default defineComponent({
  id: "otp-input",
  name: "OTP Input",
  category: "inputs",
  description:
    "A segmented one-time-code field that auto-advances, supports backspace navigation, and distributes pasted codes.",
  tags: ["otp", "verification", "interactive"],
  Preview: OtpInputPreview,
  react: [{ filename: "OtpInput.tsx", language: "tsx", source: reactSource }],
  svelte: [
    { filename: "OtpInput.svelte", language: "svelte", source: svelteSource },
  ],
});
