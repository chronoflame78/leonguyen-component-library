<script lang="ts">
  export let label: string = "Press Me";
</script>

<button class="push-3d-button" on:click>
  <span class="push-3d-button__shadow" aria-hidden="true"></span>
  <span class="push-3d-button__edge" aria-hidden="true"></span>
  <span class="push-3d-button__face">{label}</span>
</button>

<style>
  .push-3d-button {
    --base: #1b3a2f;
    --edge: #0f8a5f;
    --face-from: #34d399;
    --face-to: #10b981;
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    font-size: 0.95rem;
    font-weight: 700;
  }

  /* soft drop shadow on the ground beneath the button */
  .push-3d-button__shadow {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.4);
    filter: blur(6px);
    transform: translateY(2px);
    transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1);
    will-change: transform;
  }

  /* the colored "base" layer the face presses onto */
  .push-3d-button__edge {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(
      to left,
      var(--base) 0%,
      var(--edge) 8%,
      var(--edge) 92%,
      var(--base) 100%
    );
  }

  /* the raised top face */
  .push-3d-button__face {
    display: block;
    position: relative;
    padding: 0.85rem 2.25rem;
    border-radius: 12px;
    color: #042f1e;
    background: linear-gradient(180deg, var(--face-from), var(--face-to));
    transform: translateY(-6px);
    transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1);
    will-change: transform;
  }

  .push-3d-button:hover .push-3d-button__face {
    transform: translateY(-8px);
  }

  .push-3d-button:hover .push-3d-button__shadow {
    transform: translateY(4px);
  }

  /* press DOWN onto the base */
  .push-3d-button:active .push-3d-button__face {
    transform: translateY(-2px);
    transition: transform 0.04s;
  }

  .push-3d-button:active .push-3d-button__shadow {
    transform: translateY(1px);
    transition: transform 0.04s;
  }

  .push-3d-button:focus-visible {
    outline: 3px solid #a7f3d0;
  }

  @media (prefers-reduced-motion: reduce) {
    .push-3d-button__face,
    .push-3d-button__shadow {
      transition: none;
    }
  }
</style>
