<script lang="ts">
  import { onDestroy } from "svelte";

  interface ToastItem {
    id: number;
    message: string;
  }

  const DISMISS_MS = 3000;

  let toasts: ToastItem[] = [];
  let nextId = 0;
  const timers = new Map<number, ReturnType<typeof setTimeout>>();

  function dismiss(id: number) {
    const timer = timers.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.delete(id);
    }
    toasts = toasts.filter((toast) => toast.id !== id);
  }

  function push() {
    const id = nextId++;
    toasts = [...toasts, { id, message: "Changes saved successfully" }];
    timers.set(
      id,
      setTimeout(() => dismiss(id), DISMISS_MS)
    );
  }

  onDestroy(() => {
    timers.forEach((timer) => clearTimeout(timer));
    timers.clear();
  });
</script>

<div class="toast-demo">
  <button class="toast-trigger" on:click={push}>Show toast</button>

  <div class="toast-stack" aria-live="polite">
    {#each toasts as toast (toast.id)}
      <div role="status" class="toast">
        <span class="toast-icon" aria-hidden="true">✓</span>
        <span class="toast-message">{toast.message}</span>
        <button
          class="toast-close"
          aria-label="Dismiss"
          on:click={() => dismiss(toast.id)}
        >
          ×
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  .toast-demo {
    display: flex;
    justify-content: center;
  }

  .toast-trigger {
    border: none;
    border-radius: 0.6rem;
    padding: 0.65rem 1.4rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: #6366f1;
    transition: background 0.15s ease, transform 0.15s ease;
  }

  .toast-trigger:hover {
    background: #4f46e5;
    transform: translateY(-1px);
  }

  .toast-stack {
    position: fixed;
    top: 1.25rem;
    right: 1.25rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    pointer-events: none;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    min-width: 16rem;
    max-width: 22rem;
    border-radius: 0.7rem;
    padding: 0.75rem 0.9rem;
    color: #e5e7eb;
    background: #16161f;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.7);
    pointer-events: auto;
    animation: toast-slide-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .toast-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.4rem;
    height: 1.4rem;
    flex-shrink: 0;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 700;
    color: #fff;
    background: #22c55e;
  }

  .toast-message {
    flex: 1;
    font-size: 0.875rem;
    line-height: 1.3;
  }

  .toast-close {
    flex-shrink: 0;
    border: none;
    background: transparent;
    color: #9ca3af;
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    transition: color 0.15s ease;
  }

  .toast-close:hover {
    color: #fff;
  }

  @keyframes toast-slide-in {
    from {
      opacity: 0;
      transform: translateX(120%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .toast {
      animation: none;
    }
  }
</style>
