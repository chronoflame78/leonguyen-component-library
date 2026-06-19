<script lang="ts">
  export let label: string = "SYSTEM";
</script>

<button class="glitch-button" on:click>
  <span class="glitch-button__text" data-text={label}>{label}</span>
</button>

<style>
  .glitch-button {
    position: relative;
    border: 1px solid #2dd4bf;
    border-radius: 4px;
    padding: 0.8rem 2rem;
    font-family: "Courier New", monospace;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #e2f9f5;
    cursor: pointer;
    background: #0a0f14;
    box-shadow: 0 0 0 1px rgba(45, 212, 191, 0.2),
      inset 0 0 12px rgba(45, 212, 191, 0.15);
    transition: box-shadow 0.2s ease;
  }

  .glitch-button:hover {
    box-shadow: 0 0 18px rgba(45, 212, 191, 0.4),
      inset 0 0 16px rgba(45, 212, 191, 0.25);
  }

  .glitch-button:focus-visible {
    outline: 2px solid #2dd4bf;
    outline-offset: 2px;
  }

  .glitch-button__text {
    position: relative;
    display: inline-block;
  }

  /* the two RGB-split copies, hidden until hover */
  .glitch-button__text::before,
  .glitch-button__text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }

  .glitch-button__text::before {
    color: #ff00c1; /* magenta */
  }

  .glitch-button__text::after {
    color: #00fff9; /* cyan */
  }

  .glitch-button:hover .glitch-button__text::before {
    opacity: 0.85;
    animation: glitch-shift-magenta 0.45s steps(2, end) infinite;
  }

  .glitch-button:hover .glitch-button__text::after {
    opacity: 0.85;
    animation: glitch-shift-cyan 0.45s steps(2, end) infinite;
  }

  @keyframes glitch-shift-magenta {
    0% {
      transform: translate(0, 0);
      clip-path: inset(0 0 70% 0);
    }
    25% {
      transform: translate(-2px, 1px);
      clip-path: inset(60% 0 10% 0);
    }
    50% {
      transform: translate(2px, -1px);
      clip-path: inset(20% 0 50% 0);
    }
    75% {
      transform: translate(-1px, 1px);
      clip-path: inset(80% 0 5% 0);
    }
    100% {
      transform: translate(1px, 0);
      clip-path: inset(0 0 70% 0);
    }
  }

  @keyframes glitch-shift-cyan {
    0% {
      transform: translate(0, 0);
      clip-path: inset(50% 0 20% 0);
    }
    25% {
      transform: translate(2px, -1px);
      clip-path: inset(10% 0 70% 0);
    }
    50% {
      transform: translate(-2px, 1px);
      clip-path: inset(70% 0 5% 0);
    }
    75% {
      transform: translate(1px, -1px);
      clip-path: inset(30% 0 40% 0);
    }
    100% {
      transform: translate(-1px, 0);
      clip-path: inset(50% 0 20% 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .glitch-button:hover .glitch-button__text::before,
    .glitch-button:hover .glitch-button__text::after {
      animation: none;
      opacity: 0;
    }
  }
</style>
