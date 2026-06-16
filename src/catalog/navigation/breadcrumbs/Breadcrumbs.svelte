<script lang="ts">
  interface Crumb {
    label: string;
    href?: string;
  }

  const crumbs: Crumb[] = [
    { label: "Home", href: "#" },
    { label: "Library", href: "#" },
    { label: "Components", href: "#" },
    { label: "Buttons" },
  ];
</script>

<nav aria-label="Breadcrumb">
  <ol class="flex flex-wrap items-center gap-1.5 text-sm">
    {#each crumbs as crumb, i}
      <li class="flex items-center gap-1.5">
        {#if i === crumbs.length - 1}
          <span class="font-medium text-white" aria-current="page">
            {crumb.label}
          </span>
        {:else}
          <a
            href={crumb.href}
            class="text-slate-400 transition-colors hover:text-white"
          >
            {crumb.label}
          </a>
          <svg
            class="h-4 w-4 shrink-0 text-slate-600"
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
        {/if}
      </li>
    {/each}
  </ol>
</nav>
