import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import "./TiltCard.css";

interface TiltCardProps {
  title?: string;
  subtitle?: string;
  /** Maximum tilt in degrees at the card edges. */
  maxTilt?: number;
}

export function TiltCard({
  title = "Tilt Card",
  subtitle = "Move your cursor across me",
  maxTilt = 14,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 2 * maxTilt;
    const rotateX = (0.5 - py) * 2 * maxTilt;
    setStyle({
      transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg)`,
      "--glare-x": `${(px * 100).toFixed(1)}%`,
      "--glare-y": `${(py * 100).toFixed(1)}%`,
    } as CSSProperties);
  }

  function reset() {
    setActive(false);
    setStyle({ transform: "rotateX(0deg) rotateY(0deg)" });
  }

  return (
    <div className="tilt-card-scene">
      <div
        ref={ref}
        className={`tilt-card${active ? " is-active" : ""}`}
        style={style}
        onPointerMove={handleMove}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={reset}
      >
        <div className="tilt-card-glare" />
        <div className="tilt-card-content">
          <span className="tilt-card-badge">3D</span>
          <h3 className="tilt-card-title">{title}</h3>
          <p className="tilt-card-subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
