<script lang="ts">
  type TagColor = "slate" | "indigo" | "emerald" | "amber" | "rose";

  interface TagItem {
    id: number;
    label: string;
    color: TagColor;
  }

  const initialTags: TagItem[] = [
    { id: 1, label: "React", color: "indigo" },
    { id: 2, label: "TypeScript", color: "emerald" },
    { id: 3, label: "Tailwind", color: "amber" },
    { id: 4, label: "Vite", color: "rose" },
  ];

  let tags: TagItem[] = [...initialTags];

  function remove(id: number) {
    tags = tags.filter((t) => t.id !== id);
  }

  function reset() {
    tags = [...initialTags];
  }
</script>

<div class="tag-list">
  {#if tags.length === 0}
    <button type="button" class="reset" on:click={reset}>Reset tags</button>
  {:else}
    {#each tags as tag (tag.id)}
      <span class="tag tag--{tag.color}">
        {tag.label}
        <button
          type="button"
          class="tag__remove"
          aria-label={`Remove ${tag.label}`}
          on:click={() => remove(tag.id)}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path
              d="M1 1l8 8M9 1l-8 8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </span>
    {/each}
  {/if}
</div>

<style>
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    box-shadow: inset 0 0 0 1px var(--ring);
    color: var(--fg);
    background: var(--bg);
  }

  .tag--slate {
    --bg: rgba(100, 116, 139, 0.15);
    --fg: #cbd5e1;
    --ring: rgba(148, 163, 184, 0.2);
  }
  .tag--indigo {
    --bg: rgba(99, 102, 241, 0.15);
    --fg: #a5b4fc;
    --ring: rgba(129, 140, 248, 0.2);
  }
  .tag--emerald {
    --bg: rgba(16, 185, 129, 0.15);
    --fg: #6ee7b7;
    --ring: rgba(52, 211, 153, 0.2);
  }
  .tag--amber {
    --bg: rgba(245, 158, 11, 0.15);
    --fg: #fcd34d;
    --ring: rgba(251, 191, 36, 0.2);
  }
  .tag--rose {
    --bg: rgba(244, 63, 94, 0.15);
    --fg: #fda4af;
    --ring: rgba(251, 113, 133, 0.2);
  }

  .tag__remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 1rem;
    width: 1rem;
    margin-right: -0.25rem;
    border: none;
    padding: 0;
    border-radius: 9999px;
    background: transparent;
    color: currentColor;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .tag__remove:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .reset {
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #94a3b8;
    background: transparent;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
    cursor: pointer;
    transition: color 0.15s ease;
  }

  .reset:hover {
    color: #e2e8f0;
  }
</style>
