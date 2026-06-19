<script lang="ts">
  import { tick } from "svelte";

  export let value: string = "";
  export let placeholder: string = "Empty";
  export let onCommit: ((value: string) => void) | undefined = undefined;

  let draft = value;
  let editing = false;
  let inputEl: HTMLInputElement | null = null;

  async function startEditing() {
    draft = value;
    editing = true;
    await tick();
    inputEl?.focus();
    inputEl?.select();
  }

  function save() {
    value = draft.trim();
    editing = false;
    onCommit?.(value);
  }

  function cancel() {
    draft = value;
    editing = false;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      save();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }
  }
</script>

{#if editing}
  <div class="inline-edit__row">
    <input
      bind:this={inputEl}
      type="text"
      bind:value={draft}
      {placeholder}
      on:keydown={handleKeyDown}
      class="inline-edit__field"
    />
    <button type="button" on:click={save} class="inline-edit__save">Save</button>
    <button type="button" on:click={cancel} class="inline-edit__cancel">
      Cancel
    </button>
  </div>
{:else}
  <button type="button" on:click={startEditing} class="inline-edit__display">
    <span class:inline-edit__placeholder={!value}>{value || placeholder}</span>
    <svg
      class="inline-edit__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  </button>
{/if}

<style>
  .inline-edit__row {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.5rem;
  }

  .inline-edit__field {
    min-width: 0;
    flex: 1 1 0%;
    border-radius: 0.375rem;
    border: 1px solid #818cf8;
    background-color: rgba(255, 255, 255, 0.03);
    padding: 0.375rem 0.625rem;
    font-size: 0.875rem;
    color: #f8f8fc;
    outline: none;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
  }

  .inline-edit__save {
    flex-shrink: 0;
    border: none;
    border-radius: 0.375rem;
    background-color: #6366f1;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .inline-edit__save:hover {
    background-color: #818cf8;
  }

  .inline-edit__cancel {
    flex-shrink: 0;
    border: none;
    border-radius: 0.375rem;
    background: transparent;
    padding: 0.375rem 0.625rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .inline-edit__cancel:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  .inline-edit__display {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.5rem;
    border: none;
    border-radius: 0.375rem;
    background: transparent;
    padding: 0.375rem 0.625rem;
    text-align: left;
    font-size: 0.875rem;
    color: #f8f8fc;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .inline-edit__display:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }

  .inline-edit__display:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.4);
  }

  .inline-edit__placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .inline-edit__icon {
    margin-left: auto;
    height: 0.875rem;
    width: 0.875rem;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.3);
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .inline-edit__display:hover .inline-edit__icon {
    opacity: 1;
  }
</style>
