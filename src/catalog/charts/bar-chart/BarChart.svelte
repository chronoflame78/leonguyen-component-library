<script lang="ts">
  type Datum = { label: string; value: number };

  export let data: Datum[] = [
    { label: "Mon", value: 32 },
    { label: "Tue", value: 54 },
    { label: "Wed", value: 41 },
    { label: "Thu", value: 68 },
    { label: "Fri", value: 50 },
    { label: "Sat", value: 76 },
  ];
  export let color: string = "#a855f7";
  export let width: number = 320;
  export let height: number = 180;

  const padX = 8;
  const padTop = 18;
  const padBottom = 22;
  $: plotW = width - padX * 2;
  $: plotH = height - padTop - padBottom;
  $: baseY = padTop + plotH;

  $: max = Math.max(...data.map((d) => d.value)) || 1;
  $: slot = plotW / data.length;
  $: barW = slot * 0.6;
</script>

<svg
  class="bar-chart"
  {width}
  {height}
  viewBox={`0 0 ${width} ${height}`}
  role="img"
  aria-label="Bar chart"
>
  <!-- axis baseline -->
  <line
    x1={padX}
    y1={baseY}
    x2={width - padX}
    y2={baseY}
    stroke="#374151"
    stroke-width="1"
  />
  {#each data as d, i (d.label)}
    {@const barH = (d.value / max) * plotH}
    {@const x = padX + i * slot + (slot - barW) / 2}
    {@const y = baseY - barH}
    <g>
      <rect
        class="bar-chart__bar"
        {x}
        {y}
        width={barW}
        height={barH}
        rx="3"
        fill={color}
        style={`animation-delay: ${i * 80}ms`}
      />
      <!-- value label -->
      <text
        x={x + barW / 2}
        y={y - 5}
        text-anchor="middle"
        font-size="10"
        fill="#e5e7eb"
      >
        {d.value}
      </text>
      <!-- axis label -->
      <text
        x={x + barW / 2}
        y={baseY + 14}
        text-anchor="middle"
        font-size="10"
        fill="#9ca3af"
      >
        {d.label}
      </text>
    </g>
  {/each}
</svg>

<style>
  .bar-chart {
    font-family: system-ui, sans-serif;
    color: #e5e7eb;
  }

  .bar-chart__bar {
    transform-origin: bottom;
    transform: scaleY(0);
    animation: bar-chart-grow 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes bar-chart-grow {
    to {
      transform: scaleY(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bar-chart__bar {
      animation: none;
      transform: scaleY(1);
    }
  }
</style>
