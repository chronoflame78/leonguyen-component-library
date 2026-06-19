<script lang="ts">
  import { onDestroy } from "svelte";

  export let suggestions: string[] = [];
  export let placeholder: string = "Type a country…";

  let query = "";
  let open = false;
  let activeIndex = 0;
  let rootEl: HTMLDivElement;

  const listId = "autocomplete-" + Math.random().toString(36).slice(2, 8);

  $: filtered = query
    ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : suggestions;

  /** Splits a label around the (case-insensitive) match so the match can be bolded. */
  function splitMatch(label: string, q: string) {
    if (!q) return { before: label, match: "", after: "" };
    const index = label.toLowerCase().indexOf(q.toLowerCase());
    if (index === -1) return { before: label, match: "", after: "" };
    return {
      before: label.slice(0, index),
      match: label.slice(index, index + q.length),
      after: label.slice(index + q.length),
    };
  }

  function choose(value: string) {
    query = value;
    open = false;
  }

  function onPointerDown(event: MouseEvent) {
    if (rootEl && !rootEl.contains(event.target as Node)) {
      open = false;
    }
  }

  function setListeners(active: boolean) {
    if (active) {
      document.addEventListener("mousedown", onPointerDown);
    } else {
      document.removeEventListener("mousedown", onPointerDown);
    }
  }

  $: setListeners(open);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        open = true;
        return;
      }
      if (filtered.length === 0) return;
      activeIndex = (activeIndex + 1) % filtered.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        open = true;
        return;
      }
      if (filtered.length === 0) return;
      activeIndex = (activeIndex - 1 + filtered.length) % filtered.length;
    } else if (event.key === "Enter") {
      if (open && filtered[activeIndex]) {
        event.preventDefault();
        choose(filtered[activeIndex]);
      }
    } else if (event.key === "Escape") {
      open = false;
    }
  }

  onDestroy(() => setListeners(false));
</script>

<div bind:this={rootEl} class="ac">
  <div class="ac__field">
    <svg
      class="ac__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      type="text"
      role="combobox"
      aria-expanded={open}
      aria-controls={listId}
      aria-autocomplete="list"
      aria-activedescendant={open && filtered[activeIndex]
        ? `${listId}-opt-${activeIndex}`
        : undefined}
      class="ac__input"
      bind:value={query}
      {placeholder}
      on:input={() => {
        open = true;
        activeIndex = 0;
      }}
      on:focus={() => (open = true)}
      on:keydown={onKeyDown}
    />
  </div>

  {#if open}
    <ul id={listId} role="listbox" class="ac__list">
      {#if filtered.length === 0}
        <li class="ac__empty">No matches</li>
      {:else}
        {#each filtered as item, index (item)}
          {@const parts = splitMatch(item, query)}
          <li
            id={`${listId}-opt-${index}`}
            role="option"
            aria-selected={index === activeIndex}
            class="ac__option"
            class:active={index === activeIndex}
            on:mouseenter={() => (activeIndex = index)}
            on:mousedown|preventDefault={() => choose(item)}
          >
            {parts.before}{#if parts.match}<span class="ac__match"
                >{parts.match}</span
              >{/if}{parts.after}
          </li>
        {/each}
      {/if}
    </ul>
  {/if}
</div>

<style>
  .ac {
    position: relative;
    width: 100%;
  }

  .ac__field {
    position: relative;
  }

  .ac__icon {
    pointer-events: none;
    position: absolute;
    left: 0.75rem;
    top: 50%;
    height: 1rem;
    width: 1rem;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.4);
  }

  .ac__input {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    padding: 0.625rem 0.75rem 0.625rem 2.5rem;
    font-size: 0.875rem;
    color: #f8f8fc;
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .ac__input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .ac__input:focus {
    border-color: #818cf8;
    box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.25);
  }

  .ac__list {
    position: absolute;
    z-index: 10;
    margin: 0.5rem 0 0;
    max-height: 15rem;
    width: 100%;
    overflow: auto;
    list-style: none;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #15151f;
    padding: 0.25rem;
    box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .ac__empty {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .ac__option {
    cursor: pointer;
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    transition: background 0.15s ease;
  }

  .ac__option.active {
    background: rgba(99, 102, 241, 0.2);
    color: #f8f8fc;
  }

  .ac__match {
    font-weight: 600;
    color: #a5b4fc;
  }
</style>
