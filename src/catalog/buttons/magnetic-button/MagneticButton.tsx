import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import "./MagneticButton.css";

type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const MAX_OFFSET = 10;

const clamp = (value: number, limit: number) =>
  Math.max(-limit, Math.min(limit, value));

export function MagneticButton({
  children = "Magnetic",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    setOffset({
      x: clamp(relX * 0.4, MAX_OFFSET),
      y: clamp(relY * 0.4, MAX_OFFSET),
    });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <button
      ref={ref}
      className="magnetic-button"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="magnetic-button__label">{children}</span>
    </button>
  );
}
