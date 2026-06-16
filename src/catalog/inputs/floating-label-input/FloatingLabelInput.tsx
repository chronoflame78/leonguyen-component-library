import "./FloatingLabelInput.css";
import type { InputHTMLAttributes } from "react";

interface FloatingLabelInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FloatingLabelInput({
  label,
  id = "floating-label-input",
  ...props
}: FloatingLabelInputProps) {
  return (
    <div className="floating-label-input">
      <input
        id={id}
        className="floating-label-input__field"
        placeholder={label}
        {...props}
      />
      <label htmlFor={id} className="floating-label-input__label">
        {label}
      </label>
    </div>
  );
}
