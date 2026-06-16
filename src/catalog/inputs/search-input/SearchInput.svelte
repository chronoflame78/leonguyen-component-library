<script lang="ts">
  export let value: string = "";
  export let placeholder: string = "Search…";

  function clear() {
    value = "";
  }
</script>

<div class="relative w-full">
  <svg
    class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
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
    type="search"
    bind:value
    {placeholder}
    class="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-10 text-sm text-[#f8f8fc] placeholder:text-white/40 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25 [&::-webkit-search-cancel-button]:hidden"
  />
  {#if value.length > 0}
    <button
      type="button"
      on:click={clear}
      aria-label="Clear search"
      class="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
    >
      <svg
        class="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  {/if}
</div>
