<script lang="ts">
  export let steps: string[] = ["Cart", "Shipping", "Payment", "Done"];

  let active = 0;

  $: lastIndex = steps.length - 1;

  function back() {
    active = Math.max(active - 1, 0);
  }

  function next() {
    active = Math.min(active + 1, lastIndex);
  }
</script>

<div class="stepper">
  <ol class="stepper__list">
    {#each steps as step, i (step)}
      <li class="stepper__item" class:stepper__item--grow={i !== lastIndex}>
        <div class="stepper__node">
          <span
            class="stepper__circle"
            class:stepper__circle--completed={i < active}
            class:stepper__circle--active={i === active}
            aria-current={i === active ? "step" : undefined}
          >
            {#if i < active}
              <svg
                class="stepper__check"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            {:else}
              {i + 1}
            {/if}
          </span>
          <span
            class="stepper__label"
            class:stepper__label--current={i <= active}
          >
            {step}
          </span>
        </div>
        {#if i !== lastIndex}
          <span
            class="stepper__connector"
            class:stepper__connector--filled={i < active}
            aria-hidden="true"
          ></span>
        {/if}
      </li>
    {/each}
  </ol>

  <div class="stepper__controls">
    <button
      type="button"
      class="stepper__btn"
      on:click={back}
      disabled={active === 0}
    >
      Back
    </button>
    <button
      type="button"
      class="stepper__btn stepper__btn--primary"
      on:click={next}
      disabled={active === lastIndex}
    >
      Next
    </button>
  </div>
</div>

<style>
  .stepper {
    width: 100%;
    max-width: 28rem;
  }

  .stepper__list {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .stepper__item {
    display: flex;
    align-items: center;
  }

  .stepper__item--grow {
    flex: 1;
  }

  .stepper__node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .stepper__circle {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.25rem;
    width: 2.25rem;
    border-radius: 9999px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
    box-sizing: border-box;
  }

  .stepper__circle--active {
    border-color: #e879f9;
    background: rgba(217, 70, 239, 0.1);
    color: #f0abfc;
  }

  .stepper__circle--completed {
    border-color: transparent;
    background: linear-gradient(135deg, #6366f1, #d946ef);
    color: #fff;
    box-shadow: 0 10px 20px -8px rgba(217, 70, 239, 0.6);
  }

  .stepper__check {
    height: 1rem;
    width: 1rem;
  }

  .stepper__label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #64748b;
  }

  .stepper__label--current {
    color: #fff;
  }

  .stepper__connector {
    flex: 1;
    height: 2px;
    margin: 0 0.5rem;
    margin-top: -1.5rem;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.15);
  }

  .stepper__connector--filled {
    background: linear-gradient(90deg, #6366f1, #d946ef);
  }

  .stepper__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
  }

  .stepper__btn {
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #cbd5e1;
    background: transparent;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease,
      border-color 0.15s ease, opacity 0.15s ease;
  }

  .stepper__btn:hover:not(:disabled) {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }

  .stepper__btn:disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  .stepper__btn--primary {
    border-color: transparent;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #6366f1, #d946ef);
    box-shadow: 0 10px 20px -8px rgba(217, 70, 239, 0.6);
  }

  .stepper__btn--primary:hover:not(:disabled) {
    opacity: 0.9;
    color: #fff;
    background: linear-gradient(135deg, #6366f1, #d946ef);
  }
</style>
