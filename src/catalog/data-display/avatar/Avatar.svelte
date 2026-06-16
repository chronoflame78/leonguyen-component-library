<script lang="ts">
  type AvatarSize = "sm" | "md" | "lg" | "xl";

  export let name: string;
  export let size: AvatarSize = "md";
  export let online: boolean | undefined = undefined;

  const palette = [
    "#f43f5e",
    "#f97316",
    "#f59e0b",
    "#10b981",
    "#14b8a6",
    "#0ea5e9",
    "#6366f1",
    "#8b5cf6",
    "#d946ef",
  ];

  function initials(value: string) {
    const parts = value.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  function colorFor(value: string) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }
    return palette[hash % palette.length];
  }

  $: bg = colorFor(name);
  $: text = initials(name);
</script>

<span class="avatar-wrap">
  <span class="avatar avatar--{size}" style="background-color: {bg};" title={name}>
    {text}
  </span>
  {#if online !== undefined}
    <span class="dot dot--{size}" class:dot--online={online}></span>
  {/if}
</span>

<style>
  .avatar-wrap {
    position: relative;
    display: inline-flex;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    font-weight: 600;
    color: #fff;
    user-select: none;
  }

  .avatar--sm {
    height: 2rem;
    width: 2rem;
    font-size: 0.75rem;
  }
  .avatar--md {
    height: 2.5rem;
    width: 2.5rem;
    font-size: 0.875rem;
  }
  .avatar--lg {
    height: 3.5rem;
    width: 3.5rem;
    font-size: 1.125rem;
  }
  .avatar--xl {
    height: 5rem;
    width: 5rem;
    font-size: 1.5rem;
  }

  .dot {
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 9999px;
    background: #64748b;
    box-shadow: 0 0 0 2px #0d0d14;
  }

  .dot--online {
    background: #34d399;
  }

  .dot--sm {
    height: 0.5rem;
    width: 0.5rem;
  }
  .dot--md {
    height: 0.625rem;
    width: 0.625rem;
  }
  .dot--lg {
    height: 0.875rem;
    width: 0.875rem;
  }
  .dot--xl {
    height: 1.25rem;
    width: 1.25rem;
  }
</style>
