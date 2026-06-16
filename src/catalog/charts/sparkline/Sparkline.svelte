<script lang="ts">
  export let data: number[] = [12, 18, 9, 24, 16, 30, 22, 38, 28, 44, 36, 52];
  export let label: string = "Revenue";
  export let color: string = "#38bdf8";
  export let width: number = 180;
  export let height: number = 48;
  export let area: boolean = true;

  const pad = 3;
  $: w = width - pad * 2;
  $: h = height - pad * 2;

  $: max = Math.max(...data);
  $: min = Math.min(...data);
  $: span = max - min || 1;
  $: step = data.length > 1 ? w / (data.length - 1) : 0;

  $: points = data.map((value, i) => {
    const x = pad + i * step;
    const y = pad + h - ((value - min) / span) * h;
    return [x, y] as const;
  });

  $: line = points.map(([x, y]) => `${x},${y}`).join(" ");
  $: fill = `${pad},${pad + h} ${line} ${pad + w},${pad + h}`;

  $: last = data[data.length - 1];
  $: up = last >= data[0];
  $: gradientId = `spark-grad-${label.replace(/\s+/g, "-")}`;
</script>

<div class="sparkline">
  <svg
    {width}
    {height}
    viewBox={`0 0 ${width} ${height}`}
    role="img"
    aria-label={`${label} sparkline`}
  >
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color={color} stop-opacity="0.35" />
        <stop offset="100%" stop-color={color} stop-opacity="0" />
      </linearGradient>
    </defs>
    {#if area}
      <polygon points={fill} fill={`url(#${gradientId})`} />
    {/if}
    <polyline
      points={line}
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      cx={points[points.length - 1][0]}
      cy={points[points.length - 1][1]}
      r="2.5"
      fill={color}
    />
  </svg>
  <div class="sparkline__meta">
    <span class="sparkline__label">{label}</span>
    <span class="sparkline__value">
      {last}
      <span class="sparkline__delta" class:up class:down={!up}>
        {up ? "▲" : "▼"}
      </span>
    </span>
  </div>
</div>

<style>
  .sparkline {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    color: #e5e7eb;
    font-family: system-ui, sans-serif;
  }

  .sparkline__meta {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .sparkline__label {
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .sparkline__value {
    font-size: 1.05rem;
    font-weight: 600;
  }

  .sparkline__delta {
    margin-left: 0.35rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .sparkline__delta.up {
    color: #4ade80;
  }

  .sparkline__delta.down {
    color: #f87171;
  }
</style>
