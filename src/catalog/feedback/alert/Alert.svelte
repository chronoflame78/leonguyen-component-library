<script lang="ts">
  type AlertVariant = "info" | "success" | "warning" | "error";

  export let variant: AlertVariant = "info";
  export let title: string = "Heads up!";
  export let message: string = "This is an alert message with some helpful context.";
  export let dismissible: boolean = true;

  let visible = true;

  function dismiss() {
    visible = false;
  }
</script>

{#if visible}
  <div class="alert alert--{variant}" role="alert">
    <span class="alert__icon">
      {#if variant === "success"}
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4Z"
            clip-rule="evenodd"
          />
        </svg>
      {:else if variant === "warning"}
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M8.5 2.9a1.7 1.7 0 0 1 3 0l6.3 11a1.7 1.7 0 0 1-1.5 2.6H3.7a1.7 1.7 0 0 1-1.5-2.6l6.3-11ZM10 7a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Zm0 7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
            clip-rule="evenodd"
          />
        </svg>
      {:else if variant === "error"}
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM10 6a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V7a1 1 0 0 0-1-1Zm0 7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
            clip-rule="evenodd"
          />
        </svg>
      {:else}
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0 4a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1Z"
            clip-rule="evenodd"
          />
        </svg>
      {/if}
    </span>
    <div class="alert__body">
      <p class="alert__title">{title}</p>
      <p class="alert__message">{message}</p>
    </div>
    {#if dismissible}
      <button class="alert__close" type="button" on:click={dismiss} aria-label="Dismiss">
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            d="M6.3 5a.9.9 0 0 0-1.3 1.3L8.7 10l-3.7 3.7A.9.9 0 1 0 6.3 15L10 11.3l3.7 3.7a.9.9 0 0 0 1.3-1.3L11.3 10 15 6.3A.9.9 0 0 0 13.7 5L10 8.7 6.3 5Z"
          />
        </svg>
      </button>
    {/if}
  </div>
{/if}

<style>
  .alert {
    display: flex;
    width: 100%;
    align-items: flex-start;
    gap: 0.75rem;
    border: 1px solid transparent;
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    box-sizing: border-box;
  }

  .alert__icon svg {
    height: 1.25rem;
    width: 1.25rem;
    flex-shrink: 0;
  }

  .alert__body {
    min-width: 0;
    flex: 1;
  }

  .alert__title {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .alert__message {
    margin: 0.125rem 0 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .alert__close {
    margin: -0.25rem -0.25rem 0 0;
    border: none;
    background: transparent;
    border-radius: 0.375rem;
    padding: 0.25rem;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.5);
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .alert__close svg {
    height: 1rem;
    width: 1rem;
    display: block;
  }

  .alert__close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  .alert--info {
    border-color: rgba(14, 165, 233, 0.3);
    background: rgba(14, 165, 233, 0.1);
  }
  .alert--info .alert__icon {
    color: #38bdf8;
  }
  .alert--info .alert__title {
    color: #bae6fd;
  }

  .alert--success {
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.1);
  }
  .alert--success .alert__icon {
    color: #34d399;
  }
  .alert--success .alert__title {
    color: #a7f3d0;
  }

  .alert--warning {
    border-color: rgba(245, 158, 11, 0.3);
    background: rgba(245, 158, 11, 0.1);
  }
  .alert--warning .alert__icon {
    color: #fbbf24;
  }
  .alert--warning .alert__title {
    color: #fde68a;
  }

  .alert--error {
    border-color: rgba(244, 63, 94, 0.3);
    background: rgba(244, 63, 94, 0.1);
  }
  .alert--error .alert__icon {
    color: #fb7185;
  }
  .alert--error .alert__title {
    color: #fecdd3;
  }
</style>
