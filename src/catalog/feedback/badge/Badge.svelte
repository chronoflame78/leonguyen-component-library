<script lang="ts">
  type BadgeColor = "gray" | "blue" | "green" | "amber" | "red" | "purple";
  type BadgeVariant = "solid" | "soft" | "dot";

  export let color: BadgeColor = "gray";
  export let variant: BadgeVariant = "soft";
  export let label: string = "";
</script>

<span class="badge badge--{variant} badge--{color}">
  {#if variant === "dot"}
    <span class="badge__dot"></span>
  {/if}
  {label}
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    border-radius: 9999px;
    padding: 0.125rem 0.625rem;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.25rem;
  }

  .badge__dot {
    height: 0.375rem;
    width: 0.375rem;
    border-radius: 9999px;
    background: currentColor;
  }

  /* Solid */
  .badge--solid.badge--gray {
    background: #64748b;
    color: #fff;
  }
  .badge--solid.badge--blue {
    background: #0ea5e9;
    color: #fff;
  }
  .badge--solid.badge--green {
    background: #10b981;
    color: #fff;
  }
  .badge--solid.badge--amber {
    background: #f59e0b;
    color: #0f172a;
  }
  .badge--solid.badge--red {
    background: #f43f5e;
    color: #fff;
  }
  .badge--solid.badge--purple {
    background: #8b5cf6;
    color: #fff;
  }

  /* Soft + dot share the translucent palette */
  .badge--soft.badge--gray,
  .badge--dot.badge--gray {
    background: rgba(100, 116, 139, 0.15);
    color: #cbd5e1;
  }
  .badge--soft.badge--blue,
  .badge--dot.badge--blue {
    background: rgba(14, 165, 233, 0.15);
    color: #7dd3fc;
  }
  .badge--soft.badge--green,
  .badge--dot.badge--green {
    background: rgba(16, 185, 129, 0.15);
    color: #6ee7b7;
  }
  .badge--soft.badge--amber,
  .badge--dot.badge--amber {
    background: rgba(245, 158, 11, 0.15);
    color: #fcd34d;
  }
  .badge--soft.badge--red,
  .badge--dot.badge--red {
    background: rgba(244, 63, 94, 0.15);
    color: #fda4af;
  }
  .badge--soft.badge--purple,
  .badge--dot.badge--purple {
    background: rgba(139, 92, 246, 0.15);
    color: #c4b5fd;
  }

  /* The dot uses currentColor, which matches the soft text tone above. */
</style>
