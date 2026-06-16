<script lang="ts">
  export let totalPages: number = 12;
  /** Number of page buttons shown around the current page. */
  export let siblingCount: number = 1;

  let page = 1;

  type PageItem = number | "ellipsis-left" | "ellipsis-right";

  function getPageItems(
    current: number,
    total: number,
    siblings: number,
  ): PageItem[] {
    const totalNumbers = siblings * 2 + 5;
    if (total <= totalNumbers) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblings, 2);
    const rightSibling = Math.min(current + siblings, total - 1);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < total - 1;

    const items: PageItem[] = [1];

    if (showLeftDots) {
      items.push("ellipsis-left");
    } else {
      for (let p = 2; p < leftSibling; p++) items.push(p);
    }

    for (let p = leftSibling; p <= rightSibling; p++) items.push(p);

    if (showRightDots) {
      items.push("ellipsis-right");
    } else {
      for (let p = rightSibling + 1; p < total; p++) items.push(p);
    }

    items.push(total);
    return items;
  }

  function goTo(next: number) {
    page = Math.min(Math.max(next, 1), totalPages);
  }

  $: items = getPageItems(page, totalPages, siblingCount);
</script>

<nav aria-label="Pagination" class="pagination">
  <button
    type="button"
    class="pagination__nav"
    on:click={() => goTo(page - 1)}
    disabled={page === 1}
    aria-label="Previous page"
  >
    <svg
      class="pagination__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  </button>

  {#each items as item (item)}
    {#if typeof item === "number"}
      <button
        type="button"
        class="pagination__page"
        class:pagination__page--active={item === page}
        aria-current={item === page ? "page" : undefined}
        on:click={() => goTo(item)}
      >
        {item}
      </button>
    {:else}
      <span class="pagination__ellipsis" aria-hidden="true">…</span>
    {/if}
  {/each}

  <button
    type="button"
    class="pagination__nav"
    on:click={() => goTo(page + 1)}
    disabled={page === totalPages}
    aria-label="Next page"
  >
    <svg
      class="pagination__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  </button>
</nav>

<style>
  .pagination {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .pagination__nav,
  .pagination__page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.25rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #cbd5e1;
    background: transparent;
    transition: background-color 0.15s ease, color 0.15s ease,
      border-color 0.15s ease;
  }

  .pagination__nav {
    width: 2.25rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .pagination__nav:hover:not(:disabled) {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }

  .pagination__nav:disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  .pagination__page {
    min-width: 2.25rem;
    padding: 0 0.75rem;
    border: none;
    font-weight: 500;
  }

  .pagination__page:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }

  .pagination__page--active {
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #6366f1, #d946ef);
    box-shadow: 0 10px 20px -8px rgba(217, 70, 239, 0.6);
  }

  .pagination__page--active:hover {
    color: #fff;
    background: linear-gradient(135deg, #6366f1, #d946ef);
  }

  .pagination__ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.25rem;
    width: 2.25rem;
    color: #64748b;
  }

  .pagination__icon {
    height: 1rem;
    width: 1rem;
  }
</style>
