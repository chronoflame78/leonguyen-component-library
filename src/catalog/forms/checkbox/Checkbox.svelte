<script lang="ts">
  export let label: string = "Accept terms";
  export let checked: boolean = false;
  export let indeterminate: boolean = false;
  export let disabled: boolean = false;

  function toggle() {
    if (disabled) return;
    if (indeterminate) {
      indeterminate = false;
      checked = true;
    } else {
      checked = !checked;
    }
  }

  $: ariaChecked = indeterminate ? "mixed" : checked ? "true" : "false";
</script>

<button
  type="button"
  role="checkbox"
  aria-checked={ariaChecked}
  aria-label={label}
  {disabled}
  class="checkbox"
  on:click={toggle}
>
  <span
    class="checkbox__box"
    class:checked={checked && !indeterminate}
    class:indeterminate
  >
    {#if indeterminate}
      <span class="checkbox__dash" aria-hidden="true"></span>
    {:else}
      <svg
        class="checkbox__check"
        class:show={checked}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    {/if}
  </span>
  <span class="checkbox__label">{label}</span>
</button>

<style>
  .checkbox {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    font-size: 0.95rem;
    color: #f8f8fc;
    user-select: none;
  }

  .checkbox:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .checkbox__box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    border-radius: 0.375rem;
    border: 2px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.03);
    transition: background 0.18s ease, border-color 0.18s ease,
      box-shadow 0.18s ease;
  }

  .checkbox:hover .checkbox__box {
    border-color: rgba(99, 102, 241, 0.7);
  }

  .checkbox:focus-visible {
    outline: none;
  }

  .checkbox:focus-visible .checkbox__box {
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.4);
  }

  .checkbox__box.checked,
  .checkbox__box.indeterminate {
    background: linear-gradient(135deg, #6366f1, #a855f7);
    border-color: transparent;
    color: #fff;
  }

  .checkbox__check {
    width: 0.95rem;
    height: 0.95rem;
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    transition: stroke-dashoffset 0.22s ease 0.02s;
  }

  .checkbox__check.show {
    stroke-dashoffset: 0;
  }

  .checkbox__dash {
    width: 0.6rem;
    height: 2px;
    border-radius: 2px;
    background: #fff;
  }

  @media (prefers-reduced-motion: reduce) {
    .checkbox__check {
      transition: none;
    }
  }
</style>
