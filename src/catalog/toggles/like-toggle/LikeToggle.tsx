import "./LikeToggle.css";
import { useState } from "react";

interface LikeToggleProps {
  defaultLiked?: boolean;
  label?: string;
  onChange?: (liked: boolean) => void;
}

export function LikeToggle({
  defaultLiked = false,
  label = "Like",
  onChange,
}: LikeToggleProps) {
  const [liked, setLiked] = useState(defaultLiked);

  function toggle() {
    const next = !liked;
    setLiked(next);
    onChange?.(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={liked}
      aria-label={label}
      className="like-toggle"
      onClick={toggle}
    >
      <span className="like-toggle__ring" aria-hidden="true" />
      <span className="like-toggle__burst" aria-hidden="true">
        <i style={{ "--a": "0deg" } as React.CSSProperties} />
        <i style={{ "--a": "60deg" } as React.CSSProperties} />
        <i style={{ "--a": "120deg" } as React.CSSProperties} />
        <i style={{ "--a": "180deg" } as React.CSSProperties} />
        <i style={{ "--a": "240deg" } as React.CSSProperties} />
        <i style={{ "--a": "300deg" } as React.CSSProperties} />
      </span>
      <svg
        className="like-toggle__heart"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        aria-hidden="true"
      >
        <path d="M12 21s-6.7-4.35-9.33-8.24C.9 9.9 1.78 6.3 4.6 5.2c1.94-.76 4.06-.02 5.4 1.6L12 9l2-2.2c1.34-1.62 3.46-2.36 5.4-1.6 2.82 1.1 3.7 4.7 1.93 7.56C18.7 16.65 12 21 12 21z" />
      </svg>
    </button>
  );
}
