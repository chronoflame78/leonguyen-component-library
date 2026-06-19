<script lang="ts">
  export let tags: string[] = [];
  export let placeholder: string = "Add a tag…";
  export let onChange: ((tags: string[]) => void) | undefined = undefined;

  let draft = "";
  let inputEl: HTMLInputElement | null = null;

  function commit() {
    tags = [...tags];
    onChange?.(tags);
  }

  function addTag(raw: string) {
    const value = raw.trim().replace(/,$/, "").trim();
    if (!value || tags.includes(value)) {
      draft = "";
      return;
    }
    tags.push(value);
    commit();
    draft = "";
  }

  function removeTag(index: number) {
    tags.splice(index, 1);
    commit();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
      e.preventDefault();
      removeTag(tags.length - 1);
    }
  }
</script>

<div class="tag-input" on:click={() => inputEl?.focus()}>
  {#each tags as tag, i (tag)}
    <span class="tag-input__chip">
      {tag}
      <button
        type="button"
        aria-label={`Remove ${tag}`}
        on:click|stopPropagation={() => removeTag(i)}
        class="tag-input__remove"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </span>
  {/each}
  <input
    bind:this={inputEl}
    type="text"
    bind:value={draft}
    placeholder={tags.length === 0 ? placeholder : ""}
    on:keydown={handleKeyDown}
    on:blur={() => addTag(draft)}
    class="tag-input__field"
  />
</div>

<style>
  .tag-input {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.03);
    padding: 0.5rem;
    font-size: 0.875rem;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .tag-input:focus-within {
    border-color: #818cf8;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
  }

  .tag-input__chip {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 0.375rem;
    background-color: rgba(99, 102, 241, 0.2);
    padding: 0.25rem 0.25rem 0.25rem 0.625rem;
    color: #c7d2fe;
    box-shadow: inset 0 0 0 1px rgba(129, 140, 248, 0.3);
  }

  .tag-input__remove {
    display: flex;
    height: 1rem;
    width: 1rem;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 9999px;
    background: transparent;
    color: rgba(199, 210, 254, 0.7);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .tag-input__remove:hover {
    background-color: rgba(129, 140, 248, 0.3);
    color: #fff;
  }

  .tag-input__remove svg {
    height: 0.625rem;
    width: 0.625rem;
  }

  .tag-input__field {
    min-width: 6rem;
    flex: 1 1 0%;
    background: transparent;
    color: #f8f8fc;
    border: none;
    outline: none;
  }

  .tag-input__field::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
</style>
