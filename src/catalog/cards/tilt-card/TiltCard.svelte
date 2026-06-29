<script lang="ts">
  export let title: string = "Tilt Card";
  export let subtitle: string = "Move your cursor across me";
  export let maxTilt: number = 14;

  let card: HTMLDivElement;
  let active = false;
  let transform = "rotateX(0deg) rotateY(0deg)";
  let glareX = "50%";
  let glareY = "50%";

  function handleMove(e: PointerEvent) {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 2 * maxTilt;
    const rotateX = (0.5 - py) * 2 * maxTilt;
    transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    glareX = `${(px * 100).toFixed(1)}%`;
    glareY = `${(py * 100).toFixed(1)}%`;
  }

  function reset() {
    active = false;
    transform = "rotateX(0deg) rotateY(0deg)";
  }
</script>

<div class="tilt-card-scene">
  <div
    bind:this={card}
    class="tilt-card"
    class:is-active={active}
    style="transform: {transform}; --glare-x: {glareX}; --glare-y: {glareY};"
    on:pointermove={handleMove}
    on:pointerenter={() => (active = true)}
    on:pointerleave={reset}
  >
    <div class="tilt-card-glare"></div>
    <div class="tilt-card-content">
      <span class="tilt-card-badge">3D</span>
      <h3 class="tilt-card-title">{title}</h3>
      <p class="tilt-card-subtitle">{subtitle}</p>
    </div>
  </div>
</div>

<style>
  .tilt-card-scene {
    perspective: 900px;
  }

  .tilt-card {
    position: relative;
    width: 18rem;
    height: 11rem;
    border-radius: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: linear-gradient(135deg, #4f46e5, #c026d3);
    box-shadow: 0 30px 60px -25px rgba(99, 102, 241, 0.7);
    overflow: hidden;
    transform-style: preserve-3d;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    cursor: pointer;
    --glare-x: 50%;
    --glare-y: 50%;
  }

  .tilt-card.is-active {
    transition: transform 0.05s linear;
  }

  .tilt-card-glare {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--glare-x) var(--glare-y),
      rgba(255, 255, 255, 0.45),
      transparent 45%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .tilt-card.is-active .tilt-card-glare {
    opacity: 1;
  }

  .tilt-card-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.25rem;
    padding: 1.25rem;
    color: #fff;
    transform: translateZ(40px);
  }

  .tilt-card-badge {
    align-self: flex-start;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.625rem;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    backdrop-filter: blur(4px);
  }

  .tilt-card-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .tilt-card-subtitle {
    margin: 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
</style>
