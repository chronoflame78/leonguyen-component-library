import "./Divider.css";

interface DividerProps {
  /** Layout direction of the divider line. */
  orientation?: "horizontal" | "vertical";
  /** Optional label rendered centered within the line. */
  label?: string;
}

export function Divider({ orientation = "horizontal", label }: DividerProps) {
  const className =
    "divider" +
    (orientation === "vertical" ? " divider--vertical" : " divider--horizontal");

  if (label && orientation === "horizontal") {
    return (
      <div className={className} role="separator" aria-orientation="horizontal">
        <span className="divider__line" />
        <span className="divider__label">{label}</span>
        <span className="divider__line" />
      </div>
    );
  }

  return (
    <div
      className={className}
      role="separator"
      aria-orientation={orientation}
    >
      <span className="divider__line" />
    </div>
  );
}
