<script lang="ts">
  export let value: number = 0;
  export let label: string = "Uploading…";
  export let showValue: boolean = true;

  $: clamped = Math.min(100, Math.max(0, Math.round(value)));
</script>

<div class="progress-bar">
  <div class="progress-bar__head">
    <span class="progress-bar__label">{label}</span>
    {#if showValue}
      <span class="progress-bar__value">{clamped}%</span>
    {/if}
  </div>
  <div
    class="progress-bar__track"
    role="progressbar"
    aria-valuenow={clamped}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label={label}
  >
    <div class="progress-bar__fill" style="width: {clamped}%"></div>
  </div>
</div>

<style>
  .progress-bar {
    width: 100%;
  }

  .progress-bar__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .progress-bar__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
  }

  .progress-bar__value {
    font-size: 0.875rem;
    font-variant-numeric: tabular-nums;
    color: rgba(255, 255, 255, 0.6);
  }

  .progress-bar__track {
    position: relative;
    height: 0.625rem;
    width: 100%;
    overflow: hidden;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.1);
  }

  .progress-bar__fill {
    position: relative;
    height: 100%;
    border-radius: 9999px;
    background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .progress-bar__fill::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.35),
      transparent
    );
    transform: translateX(-100%);
    animation: progress-bar-sheen 1.8s ease-in-out infinite;
  }

  @keyframes progress-bar-sheen {
    to {
      transform: translateX(100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .progress-bar__fill {
      transition: none;
    }
    .progress-bar__fill::after {
      animation: none;
    }
  }
</style>
