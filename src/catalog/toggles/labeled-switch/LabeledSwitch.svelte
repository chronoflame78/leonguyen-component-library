<script lang="ts">
  export let checked: boolean = false;
  export let label: string = "Toggle";

  function toggle() {
    checked = !checked;
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label={label}
  class="labeled-switch"
  on:click={toggle}
>
  <span class="labeled-switch__track" aria-hidden="true">
    <span class="labeled-switch__icon labeled-switch__icon--on">
      <svg viewBox="0 0 24 24" width="13" height="13">
        <path
          d="M5 13l4 4L19 7"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="labeled-switch__icon labeled-switch__icon--off">
      <svg viewBox="0 0 24 24" width="13" height="13">
        <path
          d="M6 6l12 12M18 6L6 18"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </span>
  </span>
  <span class="labeled-switch__knob" aria-hidden="true" />
</button>

<style>
  .labeled-switch {
    --track-off: #3a3a4a;
    --track-on: #22c55e;
    --knob: #ffffff;
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 4rem;
    height: 2rem;
    padding: 0;
    border: none;
    border-radius: 9999px;
    background: var(--track-off);
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.45);
  }

  .labeled-switch[aria-checked="true"] {
    background: var(--track-on);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.25),
      0 0 16px -3px rgba(34, 197, 94, 0.7);
  }

  .labeled-switch:focus-visible {
    outline: 2px solid #a855f7;
    outline-offset: 2px;
  }

  .labeled-switch__track {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.4375rem;
  }

  .labeled-switch__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .labeled-switch__icon--on {
    color: #ffffff;
    opacity: 0;
    transform: translateX(-4px);
  }

  .labeled-switch__icon--off {
    color: #cdd0dd;
    opacity: 1;
    transform: translateX(0);
  }

  .labeled-switch[aria-checked="true"] .labeled-switch__icon--on {
    opacity: 1;
    transform: translateX(0);
  }

  .labeled-switch[aria-checked="true"] .labeled-switch__icon--off {
    opacity: 0;
    transform: translateX(4px);
  }

  .labeled-switch__knob {
    position: absolute;
    top: 50%;
    left: 0.1875rem;
    width: 1.625rem;
    height: 1.625rem;
    border-radius: 50%;
    background: var(--knob);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transform: translate(0, -50%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .labeled-switch[aria-checked="true"] .labeled-switch__knob {
    transform: translate(2rem, -50%);
  }

  @media (prefers-reduced-motion: reduce) {
    .labeled-switch,
    .labeled-switch__icon,
    .labeled-switch__knob {
      transition: none;
    }
  }
</style>
