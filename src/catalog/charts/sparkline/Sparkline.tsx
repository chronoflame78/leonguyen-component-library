type SparklineProps = {
  /** The series of values to plot. */
  data?: number[];
  /** A short caption shown beside the chart. */
  label?: string;
  /** Stroke / fill accent colour. */
  color?: string;
  width?: number;
  height?: number;
  /** Draw a soft gradient area beneath the line. */
  area?: boolean;
};

const DEFAULT_DATA = [12, 18, 9, 24, 16, 30, 22, 38, 28, 44, 36, 52];

export function Sparkline({
  data = DEFAULT_DATA,
  label = "Revenue",
  color = "#38bdf8",
  width = 180,
  height = 48,
  area = true,
}: SparklineProps) {
  const pad = 3;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const step = data.length > 1 ? w / (data.length - 1) : 0;

  const points = data.map((value, i) => {
    const x = pad + i * step;
    const y = pad + h - ((value - min) / span) * h;
    return [x, y] as const;
  });

  const line = points.map(([x, y]) => `${x},${y}`).join(" ");
  const fill = `${pad},${pad + h} ${line} ${pad + w},${pad + h}`;

  const last = data[data.length - 1];
  const first = data[0];
  const up = last >= first;
  const gradientId = `spark-grad-${label.replace(/\s+/g, "-")}`;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        color: "#e5e7eb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${label} sparkline`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {area && <polygon points={fill} fill={`url(#${gradientId})`} />}
        <polyline
          points={line}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={points[points.length - 1][0]}
          cy={points[points.length - 1][1]}
          r={2.5}
          fill={color}
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
        <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{label}</span>
        <span style={{ fontSize: "1.05rem", fontWeight: 600 }}>
          {last}
          <span
            style={{
              marginLeft: "0.35rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: up ? "#4ade80" : "#f87171",
            }}
          >
            {up ? "▲" : "▼"}
          </span>
        </span>
      </div>
    </div>
  );
}
