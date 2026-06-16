<script lang="ts">
  import { onDestroy } from "svelte";

  export interface SelectOption {
    value: string;
    label: string;
  }

  export let options: SelectOption[] = [];
  export let value: string = "";
  export let placeholder: string = "Select an option";

  let open = false;
  let rootEl: HTMLDivElement;

  $: selected = options.find((o) => o.value === value);

  function onPointerDown(event: MouseEvent) {
    if (rootEl && !rootEl.contains(event.target as Node)) {
      open = false;
    }
  }
  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") open = false;
  }

  function setListeners(active: boolean) {
    if (active) {
      document.addEventListener("mousedown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    }
  }

  $: setListeners(open);

  function choose(option: SelectOption) {
    value = option.value;
    open = false;
  }

  onDestroy(() => setListeners(false));
</script>

<div bind:this={rootEl} class="select">
  <button
    type="button"
    aria-haspopup="listbox"
    aria-expanded={open}
    class="select__trigger"
    on:click={() => (open = !open)}
  >
    <span class="select__value" class:placeholder={!selected}>
      {selected ? selected.label : placeholder}
    </span>
    <svg
      class="select__chevron"
      class:open
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </button>

  {#if open}
    <ul role="listbox" class="select__list">
      {#each options as option (option.value)}
        <li role="option" aria-selected={option.value === value}>
          <button
            type="button"
            class="select__option"
            class:selected={option.value === value}
            on:click={() => choose(option)}
          >
            <span>{option.label}</span>
            {#if option.value === value}
              <svg
                class="select__check"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            {/if}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .select {
    position: relative;
    width: 100%;
  }

  .select__trigger {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    padding: 0.625rem 0.875rem;
    text-align: left;
    font-size: 0.875rem;
    color: #f8f8fc;
    cursor: pointer;
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .select__trigger:focus-visible {
    border-color: #818cf8;
    box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.25);
  }

  .select__value.placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .select__chevron {
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.5);
    transition: transform 0.2s ease;
  }

  .select__chevron.open {
    transform: rotate(180deg);
  }

  .select__list {
    position: absolute;
    z-index: 10;
    margin-top: 0.5rem;
    max-height: 15rem;
    width: 100%;
    overflow: auto;
    list-style: none;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #15151f;
    padding: 0.25rem;
    margin-block: 0.5rem 0;
    box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .select__option {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    border: none;
    border-radius: 0.375rem;
    background: transparent;
    padding: 0.5rem 0.75rem;
    text-align: left;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .select__option:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .select__option.selected {
    background: rgba(99, 102, 241, 0.2);
    color: #f8f8fc;
  }

  .select__check {
    height: 1rem;
    width: 1rem;
    color: #a5b4fc;
  }
</style>
