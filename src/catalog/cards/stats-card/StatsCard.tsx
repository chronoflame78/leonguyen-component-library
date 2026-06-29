interface StatsCardProps {
  label?: string;
  value?: string;
  /** Percentage change vs. previous period. Negative renders red/down. */
  change?: number;
  /** Sparkline series. */
  data?: number[];
}

const defaultData = [12, 18, 14, 22, 19, 28, 24, 34, 30, 42];

function buildPaths(data: number[], width: number, height: number) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((d, i) => {
    const x = i * step;
    const y = height - ((d - min) / range) * height;
    return [x, y] as const;
  });
  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area };
}

export function StatsCard({
  label = "Monthly revenue",
  value = "$48,260",
  change = 12.5,
  data = defaultData,
}: StatsCardProps) {
  const up = change >= 0;
  const width = 120;
  const height = 40;
  const { line, area } = buildPaths(data, width, height);
  const stroke = up ? "#34d399" : "#f87171";

  return (
    <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm text-white/50">{label}</span>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
            up
              ? "bg-emerald-500/15 text-emerald-300"
              : "bg-rose-500/15 text-rose-300"
          }`}
        >
          <svg
            viewBox="0 0 12 12"
            className={`h-3 w-3 ${up ? "" : "rotate-180"}`}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 2.5 10 8H2z" />
          </svg>
          {Math.abs(change)}%
        </span>
      </div>

      <div className="mt-2 text-3xl font-bold tracking-tight text-white">
        {value}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-4 h-12 w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="stats-card-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#stats-card-fill)" />
        <path
          d={line}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
