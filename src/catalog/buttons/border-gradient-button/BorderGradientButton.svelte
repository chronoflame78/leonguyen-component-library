<script lang="ts">
  export let label: string = "Explore";
</script>

<button class="border-gradient-button" on:click>
  <span class="border-gradient-button__label">{label}</span>
</button>

<style>
  @property --border-gradient-angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  .border-gradient-button {
    --border-gradient-angle: 0deg;
    position: relative;
    isolation: isolate;
    border: none;
    border-radius: 9999px;
    padding: 0.85rem 2.25rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: #0d0d14;
    transition: transform 0.15s ease;
  }

  /* rotating conic gradient border via a padded pseudo-element */
  .border-gradient-button::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    padding: 2px;
    background: conic-gradient(
      from var(--border-gradient-angle),
      #6366f1,
      #ec4899,
      #f59e0b,
      #22d3ee,
      #6366f1
    );
    /* show only the border ring by masking out the interior */
    -webkit-mask: linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: border-gradient-spin 4s linear infinite;
  }

  .border-gradient-button:hover {
    transform: translateY(-1px);
  }

  .border-gradient-button:active {
    transform: translateY(0);
  }

  .border-gradient-button__label {
    position: relative;
    z-index: 1;
  }

  @keyframes border-gradient-spin {
    to {
      --border-gradient-angle: 360deg;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .border-gradient-button::before {
      animation: none;
    }
  }
</style>
