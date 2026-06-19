<script lang="ts">
  export let onChange: ((files: File[]) => void) | undefined = undefined;

  let files: File[] = [];
  let dragging = false;
  let inputEl: HTMLInputElement | null = null;

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    files = [...files, ...Array.from(list)];
    onChange?.(files);
  }

  function removeFile(index: number) {
    files = files.filter((_, i) => i !== index);
    onChange?.(files);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragging = false;
    addFiles(e.dataTransfer?.files ?? null);
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    addFiles(target.files);
    target.value = "";
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputEl?.click();
    }
  }

  $: totalBytes = files.reduce((sum, f) => sum + f.size, 0);
</script>

<div class="dz">
  <div
    role="button"
    tabindex="0"
    class="dz__zone"
    class:dz__zone--active={dragging}
    on:click={() => inputEl?.click()}
    on:keydown={handleKeyDown}
    on:dragenter|preventDefault={() => (dragging = true)}
    on:dragover|preventDefault={() => (dragging = true)}
    on:dragleave|preventDefault={() => (dragging = false)}
    on:drop={handleDrop}
  >
    <svg
      class="dz__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
    <p class="dz__title">
      <span class="dz__accent">Click to browse</span> or drag files here
    </p>
    <p class="dz__hint">Anything goes — nothing is uploaded</p>
    <input
      bind:this={inputEl}
      type="file"
      multiple
      class="dz__input"
      on:change={handleInput}
    />
  </div>

  {#if files.length > 0}
    <ul class="dz__list">
      {#each files as file, i (`${file.name}-${i}`)}
        <li class="dz__item">
          <span class="dz__name">{file.name}</span>
          <span class="dz__size">{formatBytes(file.size)}</span>
          <button
            type="button"
            aria-label={`Remove ${file.name}`}
            on:click={() => removeFile(i)}
            class="dz__remove"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </li>
      {/each}
      <li class="dz__total">
        {files.length} file{files.length > 1 ? "s" : ""} · {formatBytes(totalBytes)}
      </li>
    </ul>
  {/if}
</div>

<style>
  .dz {
    width: 100%;
  }

  .dz__zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 0.75rem;
    border: 2px dashed rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.02);
    padding: 2rem 1.5rem;
    text-align: center;
    cursor: pointer;
    outline: none;
    transition: border-color 0.18s ease, background-color 0.18s ease;
  }

  .dz__zone:hover {
    border-color: rgba(255, 255, 255, 0.25);
    background-color: rgba(255, 255, 255, 0.04);
  }

  .dz__zone:focus-visible {
    border-color: #818cf8;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
  }

  .dz__zone--active {
    border-color: #818cf8;
    background-color: rgba(99, 102, 241, 0.1);
  }

  .dz__icon {
    height: 2rem;
    width: 2rem;
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.18s ease;
  }

  .dz__zone--active .dz__icon {
    color: #a5b4fc;
  }

  .dz__title {
    font-size: 0.875rem;
    color: #f8f8fc;
  }

  .dz__accent {
    font-weight: 500;
    color: #a5b4fc;
  }

  .dz__hint {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .dz__input {
    display: none;
  }

  .dz__list {
    margin-top: 0.75rem;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .dz__item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.03);
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }

  .dz__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #f8f8fc;
  }

  .dz__size {
    margin-left: auto;
    flex-shrink: 0;
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    color: rgba(255, 255, 255, 0.4);
  }

  .dz__remove {
    display: flex;
    height: 1.25rem;
    width: 1.25rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 9999px;
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .dz__remove:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  .dz__remove svg {
    height: 0.75rem;
    width: 0.75rem;
  }

  .dz__total {
    padding: 0.25rem 0.25rem 0;
    text-align: right;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
  }
</style>
