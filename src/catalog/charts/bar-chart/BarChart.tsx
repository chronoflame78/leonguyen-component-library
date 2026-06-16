import "./BarChart.css";

type Datum = { label: string; value: number };

type BarChartProps = {
  /** Labelled values to plot. */
  data?: Datum[];
  /** Bar fill colour. */
  color?: string;
  width?: number;
  height?: number;
};

const DEFAULT_DATA: Datum[] = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 54 },
  { label: "Wed", value: 41 },
  { label: "Thu", value: 68 },
  { label: "Fri", value: 50 },
  { label: "Sat", value: 76 },
];

export function BarChart({
  data = DEFAULT_DATA,
  color = "#a855f7",
  width = 320,
  height = 180,
}: BarChartProps) {
  const padX = 8;
  const padTop = 18;
  const padBottom = 22;
  const plotW = width - padX * 2;
  const plotH = height - padTop - padBottom;
  const baseY = padTop + plotH;

  const max = Math.max(...data.map((d) => d.value)) || 1;
  const slot = plotW / data.length;
  const barW = slot * 0.6;

  return (
    <svg
      className="bar-chart"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Bar chart"
    >
      {/* axis baseline */}
      <line
        x1={padX}
        y1={baseY}
        x2={width - padX}
        y2={baseY}
        stroke="#374151"
        strokeWidth={1}
      />
      {data.map((d, i) => {
        const barH = (d.value / max) * plotH;
        const x = padX + i * slot + (slot - barW) / 2;
        const y = baseY - barH;
        return (
          <g key={d.label}>
            <rect
              className="bar-chart__bar"
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={3}
              fill={color}
              style={{ animationDelay: `${i * 80}ms` }}
            />
            {/* value label */}
            <text
              x={x + barW / 2}
              y={y - 5}
              textAnchor="middle"
              fontSize={10}
              fill="#e5e7eb"
            >
              {d.value}
            </text>
            {/* axis label */}
            <text
              x={x + barW / 2}
              y={baseY + 14}
              textAnchor="middle"
              fontSize={10}
              fill="#9ca3af"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
