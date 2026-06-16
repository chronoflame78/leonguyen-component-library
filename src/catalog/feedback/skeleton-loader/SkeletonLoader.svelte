<script lang="ts">
  export let lines: number = 3;
  export let showAvatar: boolean = true;

  $: count = Math.max(1, lines);
  $: items = Array.from({ length: count }, (_, i) => i);
</script>

<div class="skeleton-loader" aria-hidden="true">
  {#if showAvatar}
    <div class="skeleton skeleton--avatar"></div>
  {/if}
  <div class="skeleton-loader__lines">
    {#each items as i}
      <div
        class="skeleton skeleton--line"
        class:is-title={i === 0}
        class:is-short={i === count - 1 && count > 1}
      ></div>
    {/each}
  </div>
</div>

<style>
  .skeleton-loader {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 1rem;
  }

  .skeleton-loader__lines {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .skeleton {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.08);
  }

  .skeleton::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.12),
      transparent
    );
    animation: skeleton-shimmer 1.4s ease-in-out infinite;
  }

  .skeleton--avatar {
    height: 3rem;
    width: 3rem;
    flex-shrink: 0;
    border-radius: 9999px;
  }

  .skeleton--line {
    height: 0.75rem;
    border-radius: 0.375rem;
  }

  .skeleton--line.is-title {
    height: 0.9rem;
    width: 55%;
  }

  .skeleton--line.is-short {
    width: 80%;
  }

  @keyframes skeleton-shimmer {
    to {
      transform: translateX(100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton::after {
      animation: none;
    }
  }
</style>
