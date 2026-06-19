import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import "./SparkleButton.css";

type SparkleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Sparkle {
  id: number;
  /** horizontal travel in px */
  dx: number;
  /** vertical travel in px */
  dy: number;
  /** starting position as a percentage of the button box */
  left: number;
  top: number;
  /** rotation in degrees */
  rotate: number;
  scale: number;
}

const SPARKLE_LIFETIME = 700;

export function SparkleButton({
  children = "Make Magic",
  onClick,
  ...props
}: SparkleButtonProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const nextId = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
    };
  }, []);

  function spawnSparkles() {
    const count = 6;
    const created: Sparkle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 26 + Math.random() * 34;
      return {
        id: nextId.current++,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        left: 30 + Math.random() * 40,
        top: 30 + Math.random() * 40,
        rotate: Math.random() * 180 - 90,
        scale: 0.6 + Math.random() * 0.6,
      };
    });

    setSparkles((prev) => [...prev, ...created]);

    const idsToRemove = new Set(created.map((s) => s.id));
    const timer = setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !idsToRemove.has(s.id)));
      timers.current = timers.current.filter((t) => t !== timer);
    }, SPARKLE_LIFETIME);
    timers.current.push(timer);
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    spawnSparkles();
    onClick?.(event);
  }

  return (
    <button className="sparkle-button" onClick={handleClick} {...props}>
      <span className="sparkle-button__label">{children}</span>
      <span className="sparkle-button__sparkles" aria-hidden="true">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="sparkle-button__star"
            style={
              {
                left: `${s.left}%`,
                top: `${s.top}%`,
                "--dx": `${s.dx}px`,
                "--dy": `${s.dy}px`,
                "--rot": `${s.rotate}deg`,
                "--scale": s.scale,
              } as React.CSSProperties
            }
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 0l2.6 8.4L23 12l-8.4 2.6L12 24l-2.6-9.4L1 12l8.4-3.6z" />
            </svg>
          </span>
        ))}
      </span>
    </button>
  );
}
