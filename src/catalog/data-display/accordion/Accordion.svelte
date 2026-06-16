<script lang="ts">
  export let allowMultiple = false;

  interface Section {
    title: string;
    content: string;
  }

  const sections: Section[] = [
    {
      title: "What is a component library?",
      content:
        "A curated collection of reusable UI building blocks with consistent styling, ready to drop into your app.",
    },
    {
      title: "Can multiple panels be open?",
      content:
        "Yes. Set allowMultiple to true and each section toggles independently of the others.",
    },
    {
      title: "How are transitions handled?",
      content:
        "Each panel animates its height with a CSS grid-template-rows trick, paired with a rotating chevron.",
    },
  ];

  let open: number[] = [0];

  function toggle(index: number) {
    const isOpen = open.includes(index);
    if (allowMultiple) {
      open = isOpen ? open.filter((i) => i !== index) : [...open, index];
    } else {
      open = isOpen ? [] : [index];
    }
  }
</script>

<div class="accordion">
  {#each sections as section, index (section.title)}
    {@const isOpen = open.includes(index)}
    <div class="accordion__item">
      <button
        type="button"
        class="accordion__header"
        aria-expanded={isOpen}
        on:click={() => toggle(index)}
      >
        <span>{section.title}</span>
        <svg
          class="accordion__chevron"
          class:accordion__chevron--open={isOpen}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="accordion__panel" class:accordion__panel--open={isOpen}>
        <div class="accordion__panel-inner">
          <div class="accordion__body">{section.content}</div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .accordion {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .accordion__item {
    overflow: hidden;
    border-radius: 0.625rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.02);
  }

  .accordion__header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.875rem 1.125rem;
    border: none;
    background: transparent;
    font: inherit;
    font-weight: 600;
    color: #f1f5f9;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .accordion__header:hover {
    background: rgba(255, 255, 255, 0.04);
  }

  .accordion__chevron {
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  .accordion__chevron--open {
    transform: rotate(180deg);
  }

  .accordion__panel {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: grid-template-rows 0.3s ease, opacity 0.3s ease;
  }

  .accordion__panel--open {
    grid-template-rows: 1fr;
    opacity: 1;
  }

  .accordion__panel-inner {
    overflow: hidden;
  }

  .accordion__body {
    padding: 0 1.125rem 1.125rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #94a3b8;
  }

  @media (prefers-reduced-motion: reduce) {
    .accordion__panel,
    .accordion__chevron {
      transition: none;
    }
  }
</style>
