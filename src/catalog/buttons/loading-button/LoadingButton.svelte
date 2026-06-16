<script lang="ts">
  export let label: string = "Submit";
  export let loading: boolean = false;
</script>

<button
  class="loading-button"
  disabled={loading}
  aria-busy={loading}
  on:click
>
  {#if loading}
    <span class="loading-button__spinner" aria-hidden="true"></span>
  {/if}
  <span class="loading-button__label">{loading ? "Loading…" : label}</span>
</button>

<style>
  .loading-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    border-radius: 0.625rem;
    padding: 0.75rem 2rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: #10b981;
    transition: background 0.15s ease, opacity 0.15s ease;
    box-shadow: 0 6px 20px -6px rgba(16, 185, 129, 0.6);
  }

  .loading-button:hover:not(:disabled) {
    background: #34d399;
  }

  .loading-button:disabled {
    cursor: not-allowed;
    opacity: 0.75;
  }

  .loading-button__label {
    position: relative;
    z-index: 1;
  }

  .loading-button__spinner {
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    border: 2px solid rgba(255, 255, 255, 0.35);
    border-top-color: #fff;
    animation: loading-button-spin 0.7s linear infinite;
  }

  @keyframes loading-button-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .loading-button__spinner {
      animation-duration: 1.5s;
    }
  }
</style>
