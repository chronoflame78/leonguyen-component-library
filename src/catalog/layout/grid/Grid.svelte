<script lang="ts">
  export let minColumnWidth: string = "12rem";
  export let gap: string = "1rem";
</script>

<div
  class="auto-grid"
  style="--grid-min: {minColumnWidth}; --grid-gap: {gap};"
>
  <slot />
</div>

<style>
  .auto-grid {
    --grid-min: 12rem;
    --grid-gap: 1rem;
    display: grid;
    gap: var(--grid-gap);
    /* Reflows automatically by available width: as many columns as fit,
       each at least --grid-min wide, sharing leftover space equally. */
    grid-template-columns: repeat(auto-fill, minmax(var(--grid-min), 1fr));
  }
</style>
