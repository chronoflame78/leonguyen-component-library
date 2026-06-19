<script lang="ts">
  export let label: string = "Shimmer";
</script>

<button class="shimmer-button" on:click>
  <span class="shimmer-button__label">{label}</span>
  <span class="shimmer-button__shine" aria-hidden="true"></span>
</button>

<style>
  .shimmer-button {
    position: relative;
    overflow: hidden;
    border: none;
    border-radius: 0.625rem;
    padding: 0.75rem 2rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(180deg, #1e293b, #0f172a);
    box-shadow: 0 6px 20px -6px rgba(15, 23, 42, 0.8),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .shimmer-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 28px -6px rgba(15, 23, 42, 0.9),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .shimmer-button:active {
    transform: translateY(0);
  }

  .shimmer-button__label {
    position: relative;
    z-index: 1;
  }

  .shimmer-button__shine {
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(
      100deg,
      transparent 0%,
      rgba(255, 255, 255, 0.55) 50%,
      transparent 100%
    );
    transform: skewX(-20deg) translateX(-180%);
    animation: shimmer-button-sweep 3s ease-in-out infinite;
  }

  .shimmer-button:hover .shimmer-button__shine {
    animation-duration: 1.2s;
  }

  @keyframes shimmer-button-sweep {
    0% {
      transform: skewX(-20deg) translateX(-180%);
    }
    60%,
    100% {
      transform: skewX(-20deg) translateX(320%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .shimmer-button__shine {
      animation: none;
      opacity: 0;
    }
  }
</style>
