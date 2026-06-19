<script lang="ts">
  export let maxLength: number = 50;
  export let placeholder: string = "Type here…";
  export let value: string = "";

  const RADIUS = 9;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  $: used = value.length;
  $: remaining = maxLength - used;
  $: ratio = Math.min(used / maxLength, 1);
  $: offset = CIRCUMFERENCE * (1 - ratio);
  $: level =
    remaining <= maxLength * 0.1
      ? "danger"
      : remaining <= maxLength * 0.25
        ? "warning"
        : "ok";
</script>

<div class="char-limit">
  <input
    type="text"
    bind:value
    maxlength={maxLength}
    {placeholder}
    aria-describedby="char-limit-status"
    class="char-limit__field"
  />
  <div
    id="char-limit-status"
    class="char-limit-ring char-limit-ring--{level}"
    role="status"
    aria-label={`${remaining} characters remaining`}
  >
    <svg width="24" height="24" viewBox="0 0 24 24">
      <circle
        class="char-limit-ring__track"
        cx="12"
        cy="12"
        r={RADIUS}
        fill="none"
        stroke-width="2.5"
      />
      <circle
        class="char-limit-ring__progress"
        cx="12"
        cy="12"
        r={RADIUS}
        fill="none"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-dasharray={CIRCUMFERENCE}
        stroke-dashoffset={offset}
        transform="rotate(-90 12 12)"
      />
    </svg>
    {#if remaining <= maxLength * 0.25}
      <span class="char-limit-ring__count">{remaining}</span>
    {/if}
  </div>
</div>

<style>
  .char-limit {
    position: relative;
    width: 100%;
  }

  .char-limit__field {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.03);
    padding: 0.625rem 3rem 0.625rem 0.875rem;
    font-size: 0.875rem;
    color: #f8f8fc;
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .char-limit__field::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .char-limit__field:focus {
    border-color: #818cf8;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
  }

  .char-limit-ring {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    --ring-color: #818cf8;
  }

  .char-limit-ring--warning {
    --ring-color: #fbbf24;
  }

  .char-limit-ring--danger {
    --ring-color: #fb7185;
  }

  .char-limit-ring__track {
    stroke: rgba(255, 255, 255, 0.12);
  }

  .char-limit-ring__progress {
    stroke: var(--ring-color);
    transition: stroke-dashoffset 0.25s ease, stroke 0.25s ease;
  }

  .char-limit-ring__count {
    position: absolute;
    font-size: 0.6rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--ring-color);
    line-height: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .char-limit-ring__progress {
      transition: none;
    }
  }
</style>
