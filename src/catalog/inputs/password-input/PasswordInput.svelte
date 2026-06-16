<script lang="ts">
  export let value: string = "";
  export let placeholder: string = "Password";

  let visible = false;
</script>

<div class="relative w-full">
  {#if visible}
    <input
      type="text"
      bind:value
      {placeholder}
      class="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-3.5 pr-11 text-sm text-[#f8f8fc] placeholder:text-white/40 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25"
    />
  {:else}
    <input
      type="password"
      bind:value
      {placeholder}
      class="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-3.5 pr-11 text-sm text-[#f8f8fc] placeholder:text-white/40 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25"
    />
  {/if}
  <button
    type="button"
    on:click={() => (visible = !visible)}
    aria-label={visible ? "Hide password" : "Show password"}
    aria-pressed={visible}
    class="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-white/50 transition hover:bg-white/10 hover:text-white"
  >
    {#if visible}
      <svg
        class="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    {:else}
      <svg
        class="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    {/if}
  </button>
</div>
