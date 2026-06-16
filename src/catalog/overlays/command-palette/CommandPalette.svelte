<script lang="ts">
  import { onDestroy } from "svelte";

  interface Command {
    id: string;
    label: string;
    hint: string;
    icon: string;
  }

  const COMMANDS: Command[] = [
    { id: "new-file", label: "New File", hint: "Create", icon: "📄" },
    { id: "new-folder", label: "New Folder", hint: "Create", icon: "📁" },
    { id: "search", label: "Search Everywhere", hint: "Navigate", icon: "🔍" },
    { id: "settings", label: "Open Settings", hint: "Preferences", icon: "⚙️" },
    { id: "theme", label: "Toggle Theme", hint: "Appearance", icon: "🌓" },
    { id: "profile", label: "View Profile", hint: "Account", icon: "👤" },
    { id: "logout", label: "Sign Out", hint: "Account", icon: "🚪" },
  ];

  let open = false;
  let query = "";
  let active = 0;
  let chosen: string | null = null;
  let input: HTMLInputElement;

  $: results = (() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q));
  })();

  // Keep the active index in range as results change.
  $: if (active > results.length - 1) {
    active = Math.max(0, results.length - 1);
  }

  function show() {
    open = true;
    query = "";
    active = 0;
    setTimeout(() => input?.focus(), 0);
  }

  function close() {
    open = false;
  }

  function run(command: Command) {
    chosen = command.label;
    open = false;
  }

  function onShortcut(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      show();
    }
  }

  function onPanelKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      active = results.length ? (active + 1) % results.length : 0;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      active = results.length
        ? (active - 1 + results.length) % results.length
        : 0;
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = results[active];
      if (command) run(command);
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("keydown", onShortcut);
  }

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", onShortcut);
    }
  });
</script>

<div class="cmdk-demo">
  <button class="cmdk-trigger" on:click={show}>
    Search commands
    <kbd class="cmdk-kbd">⌘K</kbd>
  </button>

  {#if chosen}
    <p class="cmdk-result">Ran: {chosen}</p>
  {/if}

  {#if open}
    <div class="cmdk-backdrop" role="presentation" on:click={close}>
      <div
        class="cmdk-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        on:click|stopPropagation
        on:keydown={onPanelKeyDown}
      >
        <div class="cmdk-search">
          <svg
            class="cmdk-search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            bind:this={input}
            class="cmdk-input"
            type="text"
            placeholder="Type a command or search…"
            bind:value={query}
          />
        </div>

        <ul class="cmdk-list">
          {#if results.length === 0}
            <li class="cmdk-empty">No commands found.</li>
          {/if}
          {#each results as command, index (command.id)}
            <li>
              <button
                class="cmdk-item"
                class:cmdk-item--active={index === active}
                on:mouseenter={() => (active = index)}
                on:click={() => run(command)}
              >
                <span class="cmdk-item-icon" aria-hidden="true">{command.icon}</span>
                <span class="cmdk-item-label">{command.label}</span>
                <span class="cmdk-item-hint">{command.hint}</span>
              </button>
            </li>
          {/each}
        </ul>

        <footer class="cmdk-footer">
          <span><kbd class="cmdk-fkbd">↑</kbd><kbd class="cmdk-fkbd">↓</kbd> navigate</span>
          <span><kbd class="cmdk-fkbd">↵</kbd> select</span>
          <span><kbd class="cmdk-fkbd">esc</kbd> close</span>
        </footer>
      </div>
    </div>
  {/if}
</div>

<style>
  .cmdk-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .cmdk-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 0.6rem;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #b6b8c3;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.05);
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .cmdk-trigger:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .cmdk-kbd {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.1rem 0.4rem;
    border-radius: 0.3rem;
    color: #c7d2fe;
    background: rgba(99, 102, 241, 0.25);
  }

  .cmdk-result {
    margin: 0;
    font-size: 0.85rem;
    color: #9ca3af;
  }

  .cmdk-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 12vh 1rem 1rem;
    background: rgba(5, 5, 12, 0.7);
    backdrop-filter: blur(2px);
    animation: cmdk-fade-in 0.18s ease both;
  }

  .cmdk-panel {
    width: 100%;
    max-width: 32rem;
    overflow: hidden;
    border-radius: 0.9rem;
    color: #e5e7eb;
    background: #16161f;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.75);
    animation: cmdk-scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .cmdk-search {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.95rem 1.1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .cmdk-search-icon {
    flex-shrink: 0;
    color: #6b7280;
  }

  .cmdk-input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 1rem;
    color: #e5e7eb;
  }

  .cmdk-input::placeholder {
    color: #6b7280;
  }

  .cmdk-list {
    list-style: none;
    margin: 0;
    padding: 0.4rem;
    max-height: 18rem;
    overflow-y: auto;
  }

  .cmdk-empty {
    padding: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .cmdk-item {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 0.6rem 0.7rem;
    font-size: 0.9rem;
    text-align: left;
    color: #d1d5db;
    cursor: pointer;
    background: transparent;
    transition: background 0.1s ease, color 0.1s ease;
  }

  .cmdk-item--active {
    background: rgba(99, 102, 241, 0.22);
    color: #fff;
  }

  .cmdk-item-icon {
    font-size: 1.05rem;
    line-height: 1;
  }

  .cmdk-item-label {
    flex: 1;
    font-weight: 500;
  }

  .cmdk-item-hint {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #6b7280;
  }

  .cmdk-footer {
    display: flex;
    gap: 1.1rem;
    padding: 0.6rem 1.1rem;
    font-size: 0.72rem;
    color: #6b7280;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .cmdk-fkbd {
    display: inline-block;
    min-width: 1.1rem;
    text-align: center;
    padding: 0.05rem 0.3rem;
    margin-right: 0.15rem;
    border-radius: 0.25rem;
    font-size: 0.7rem;
    color: #b6b8c3;
    background: rgba(255, 255, 255, 0.07);
  }

  @keyframes cmdk-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes cmdk-scale-in {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cmdk-backdrop,
    .cmdk-panel {
      animation: none;
    }
  }
</style>
