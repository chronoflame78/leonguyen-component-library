import "./UnderlineInput.css";
import type { InputHTMLAttributes } from "react";

interface UnderlineInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function UnderlineInput({
  label,
  id = "underline-input",
  ...props
}: UnderlineInputProps) {
  return (
    <div className="underline-input">
      <input
        id={id}
        className="underline-input__field"
        placeholder={label}
        {...props}
      />
      <label htmlFor={id} className="underline-input__label">
        {label}
      </label>
      <span className="underline-input__bar" aria-hidden="true" />
    </div>
  );
}
