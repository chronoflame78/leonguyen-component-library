import "./RippleButton.css";
import { useState } from "react";
import type { ButtonHTMLAttributes, MouseEvent } from "react";

type Ripple = { id: number; x: number; y: number; size: number };

type RippleButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function RippleButton({
  children = "Click Me",
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y, size }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.(event);
  }

  return (
    <button className="ripple-button" onClick={handleClick} {...props}>
      <span className="ripple-button__label">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-button__ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
}
