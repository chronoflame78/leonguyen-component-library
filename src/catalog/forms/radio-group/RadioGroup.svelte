<script lang="ts">
  export interface RadioOption {
    value: string;
    label: string;
    description?: string;
  }

  export let options: RadioOption[] = [];
  export let name: string = "radio-group";
  export let selected: string = options[0]?.value;

  function select(value: string) {
    selected = value;
  }
</script>

<div role="radiogroup" class="radio-group">
  {#each options as option (option.value)}
    <label class="radio-option" class:checked={option.value === selected}>
      <input
        type="radio"
        {name}
        value={option.value}
        checked={option.value === selected}
        on:change={() => select(option.value)}
        class="radio-input"
      />
      <span class="radio-dot" class:checked={option.value === selected} aria-hidden="true">
        <span class="radio-dot__inner"></span>
      </span>
      <span class="radio-text">
        <span class="radio-label">{option.label}</span>
        {#if option.description}
          <span class="radio-description">{option.description}</span>
        {/if}
      </span>
    </label>
  {/each}
</div>

<style>
  .radio-group {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 0.625rem;
  }

  .radio-option {
    display: flex;
    cursor: pointer;
    align-items: flex-start;
    gap: 0.75rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    padding: 0.75rem;
    transition: border-color 0.18s ease, background 0.18s ease;
  }

  .radio-option:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  .radio-option.checked {
    border-color: rgba(129, 140, 248, 0.7);
    background: rgba(99, 102, 241, 0.1);
  }

  .radio-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .radio-dot {
    display: flex;
    margin-top: 0.125rem;
    height: 1.25rem;
    width: 1.25rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: border-color 0.18s ease;
  }

  .radio-dot.checked {
    border-color: #818cf8;
  }

  .radio-dot__inner {
    height: 0.625rem;
    width: 0.625rem;
    border-radius: 9999px;
    background: linear-gradient(135deg, #818cf8, #e879f9);
    transform: scale(0);
    transition: transform 0.15s ease;
  }

  .radio-dot.checked .radio-dot__inner {
    transform: scale(1);
  }

  .radio-text {
    display: flex;
    flex-direction: column;
  }

  .radio-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #f8f8fc;
  }

  .radio-description {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
  }
</style>
