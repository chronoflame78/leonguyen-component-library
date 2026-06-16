import "./SkeletonLoader.css";

interface SkeletonLoaderProps {
  lines?: number;
  showAvatar?: boolean;
}

export function SkeletonLoader({
  lines = 3,
  showAvatar = true,
}: SkeletonLoaderProps) {
  const count = Math.max(1, lines);

  return (
    <div className="skeleton-loader" aria-hidden="true">
      {showAvatar && <div className="skeleton skeleton--avatar" />}
      <div className="skeleton-loader__lines">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`skeleton skeleton--line${i === 0 ? " is-title" : ""}${
              i === count - 1 && count > 1 ? " is-short" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
