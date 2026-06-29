<script lang="ts">
  export let label: string = "Monthly revenue";
  export let value: string = "$48,260";
  export let change: number = 12.5;
  export let data: number[] = [12, 18, 14, 22, 19, 28, 24, 34, 30, 42];

  const width = 120;
  const height = 40;

  $: up = change >= 0;
  $: stroke = up ? "#34d399" : "#f87171";

  $: paths = (() => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const step = width / (data.length - 1);
    const points = data.map((d, i) => {
      const x = i * step;
      const y = height - ((d - min) / range) * height;
      return [x, y] as [number, number];
    });
    const line = points
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" ");
    const area = `${line} L${width},${height} L0,${height} Z`;
    return { line, area };
  })();
</script>

<div class="stats-card">
  <div class="top">
    <span class="label">{label}</span>
    <span class="badge" class:down={!up}>
      <svg viewBox="0 0 12 12" class="arrow" class:flip={!up} fill="currentColor" aria-hidden="true">
        <path d="M6 2.5 10 8H2z" />
      </svg>
      {Math.abs(change)}%
    </span>
  </div>

  <div class="value">{value}</div>

  <svg viewBox="0 0 {width} {height}" class="spark" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="stats-card-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color={stroke} stop-opacity="0.35" />
        <stop offset="100%" stop-color={stroke} stop-opacity="0" />
      </linearGradient>
    </defs>
    <path d={paths.area} fill="url(#stats-card-fill)" />
    <path
      d={paths.line}
      fill="none"
      stroke={stroke}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</div>

<style>
  .stats-card {
    width: 100%;
    max-width: 20rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    padding: 1.25rem;
    text-align: left;
    color: #fff;
    font-family: inherit;
  }

  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 9999px;
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    background: rgba(16, 185, 129, 0.15);
    color: #6ee7b7;
  }

  .badge.down {
    background: rgba(244, 63, 94, 0.15);
    color: #fda4af;
  }

  .arrow {
    height: 0.75rem;
    width: 0.75rem;
  }

  .arrow.flip {
    transform: rotate(180deg);
  }

  .value {
    margin-top: 0.5rem;
    font-size: 1.875rem;
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  .spark {
    margin-top: 1rem;
    height: 3rem;
    width: 100%;
  }
</style>
