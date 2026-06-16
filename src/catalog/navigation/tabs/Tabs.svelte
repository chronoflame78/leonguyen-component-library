<script lang="ts">
  interface TabItem {
    id: string;
    label: string;
    content: string;
  }

  const tabs: TabItem[] = [
    {
      id: "overview",
      label: "Overview",
      content: "A quick summary of everything you need to get started.",
    },
    {
      id: "features",
      label: "Features",
      content: "Animated underline, keyboard-free clicks and swappable panels.",
    },
    {
      id: "pricing",
      label: "Pricing",
      content: "Simple, transparent plans that scale with your team.",
    },
  ];

  let active = 0;
  let listEl: HTMLDivElement;
  let indicator = "";

  $: if (listEl) {
    const button = listEl.children[active] as HTMLElement | undefined;
    indicator = button
      ? `width:${button.offsetWidth}px;transform:translateX(${button.offsetLeft}px);`
      : "";
  }
</script>

<div class="tabs">
  <div class="tabs__list" bind:this={listEl} role="tablist">
    {#each tabs as tab, i}
      <button
        role="tab"
        aria-selected={i === active}
        class="tabs__tab"
        class:tabs__tab--active={i === active}
        on:click={() => (active = i)}
      >
        {tab.label}
      </button>
    {/each}
    <span class="tabs__indicator" style={indicator}></span>
  </div>
  <div class="tabs__panel" role="tabpanel">
    {tabs[active].content}
  </div>
</div>

<style>
  .tabs {
    width: 100%;
    max-width: 26rem;
    color: #e5e7eb;
  }

  .tabs__list {
    position: relative;
    display: flex;
    gap: 0.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .tabs__tab {
    position: relative;
    border: none;
    background: transparent;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .tabs__tab:hover {
    color: #d1d5db;
  }

  .tabs__tab--active {
    color: #fff;
  }

  .tabs__indicator {
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 2px;
    border-radius: 9999px;
    background: linear-gradient(90deg, #6366f1, #a855f7);
    transition: transform 0.3s ease, width 0.3s ease;
  }

  .tabs__panel {
    margin-top: 1rem;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #cbd5e1;
  }

  @media (prefers-reduced-motion: reduce) {
    .tabs__indicator {
      transition: none;
    }
  }
</style>
