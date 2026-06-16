<script lang="ts">
  export let label: string = "Click Me";

  type Ripple = { id: number; x: number; y: number; size: number };
  let ripples: Ripple[] = [];

  function handleClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLButtonElement;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const id = Date.now();

    ripples = [...ripples, { id, x, y, size }];
    setTimeout(() => {
      ripples = ripples.filter((r) => r.id !== id);
    }, 600);
  }
</script>

<button class="ripple-button" on:click={handleClick}>
  <span class="ripple-button__label">{label}</span>
  {#each ripples as ripple (ripple.id)}
    <span
      class="ripple-button__ripple"
      style="left: {ripple.x}px; top: {ripple.y}px; width: {ripple.size}px; height: {ripple.size}px;"
    ></span>
  {/each}
</button>

<style>
  .ripple-button {
    position: relative;
    overflow: hidden;
    border: none;
    border-radius: 0.625rem;
    padding: 0.75rem 2rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: #4f46e5;
    transition: background 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 6px 20px -6px rgba(79, 70, 229, 0.6);
    -webkit-user-select: none;
    user-select: none;
  }

  .ripple-button:hover {
    background: #6366f1;
  }

  .ripple-button:active {
    background: #4338ca;
  }

  .ripple-button__label {
    position: relative;
    z-index: 1;
  }

  .ripple-button__ripple {
    position: absolute;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.45);
    transform: scale(0);
    pointer-events: none;
    animation: ripple-button-expand 0.6s ease-out;
  }

  @keyframes ripple-button-expand {
    to {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ripple-button__ripple {
      animation-duration: 0.01ms;
    }
  }
</style>
