<script lang="ts">
  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 1;
  export let value: number = 50;
  export let label: string = "Volume";

  $: percent = ((value - min) / (max - min)) * 100;
</script>

<div class="slider">
  <div class="slider__header">
    <span class="slider__label">{label}</span>
    <span class="slider__value">{value}</span>
  </div>
  <div class="slider__track-wrap">
    <div class="slider__track"></div>
    <div class="slider__fill" style="width: {percent}%"></div>
    <div class="slider__bubble" style="left: {percent}%" aria-hidden="true">
      {value}
    </div>
    <input
      type="range"
      class="slider__input"
      {min}
      {max}
      {step}
      bind:value
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
    />
  </div>
</div>

<style>
  .slider {
    --slider-h: 6px;
    --thumb: 20px;
    --accent1: #6366f1;
    --accent2: #a855f7;
    width: 100%;
    color: #f8f8fc;
  }

  .slider__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
  }

  .slider__label {
    color: rgba(255, 255, 255, 0.7);
  }

  .slider__value {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    color: #f8f8fc;
  }

  .slider__track-wrap {
    position: relative;
    height: var(--thumb);
    display: flex;
    align-items: center;
  }

  .slider__track {
    position: absolute;
    left: 0;
    right: 0;
    height: var(--slider-h);
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.12);
  }

  .slider__fill {
    position: absolute;
    left: 0;
    height: var(--slider-h);
    border-radius: 9999px;
    background: linear-gradient(90deg, var(--accent1), var(--accent2));
    pointer-events: none;
  }

  .slider__bubble {
    position: absolute;
    bottom: calc(100% + 0.5rem);
    transform: translateX(-50%);
    padding: 0.15rem 0.5rem;
    border-radius: 0.375rem;
    background: linear-gradient(135deg, var(--accent1), var(--accent2));
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    pointer-events: none;
    box-shadow: 0 4px 12px -2px rgba(99, 102, 241, 0.5);
  }

  .slider__bubble::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: var(--accent2);
  }

  .slider__input {
    position: relative;
    width: 100%;
    height: var(--thumb);
    margin: 0;
    background: transparent;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
  }

  .slider__input:focus {
    outline: none;
  }

  .slider__input::-webkit-slider-runnable-track {
    height: var(--slider-h);
    background: transparent;
    border-radius: 9999px;
  }

  .slider__input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--thumb);
    height: var(--thumb);
    margin-top: calc((var(--slider-h) - var(--thumb)) / 2);
    border-radius: 9999px;
    background: #fff;
    border: 2px solid var(--accent2);
    box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.5);
    transition: transform 0.12s ease, box-shadow 0.12s ease;
  }

  .slider__input:hover::-webkit-slider-thumb {
    transform: scale(1.1);
  }

  .slider__input:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.4);
  }

  .slider__input::-moz-range-track {
    height: var(--slider-h);
    background: transparent;
    border-radius: 9999px;
  }

  .slider__input::-moz-range-thumb {
    width: var(--thumb);
    height: var(--thumb);
    border-radius: 9999px;
    background: #fff;
    border: 2px solid var(--accent2);
    box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.5);
    transition: transform 0.12s ease, box-shadow 0.12s ease;
  }

  .slider__input:hover::-moz-range-thumb {
    transform: scale(1.1);
  }

  .slider__input:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.4);
  }
</style>
