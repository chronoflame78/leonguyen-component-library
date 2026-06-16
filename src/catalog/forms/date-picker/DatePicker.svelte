<script lang="ts">
  import { onDestroy } from "svelte";

  export let value: Date | null = null;
  export let placeholder: string = "Pick a date";

  const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let open = false;
  let rootEl: HTMLDivElement;

  const initial = value ?? new Date();
  let viewYear = initial.getFullYear();
  let viewMonth = initial.getMonth();

  const today = new Date();

  function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function isSameDay(a: Date, b: Date): boolean {
    return startOfDay(a).getTime() === startOfDay(b).getTime();
  }

  function formatField(date: Date | null): string {
    if (!date) return "";
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  function buildGrid(year: number, month: number): Date[] {
    const firstOfMonth = new Date(year, month, 1);
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(1 - firstOfMonth.getDay());
    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(gridStart);
      day.setDate(gridStart.getDate() + i);
      cells.push(day);
    }
    return cells;
  }

  $: grid = buildGrid(viewYear, viewMonth);

  function goToMonth(delta: number) {
    const next = new Date(viewYear, viewMonth + delta, 1);
    viewYear = next.getFullYear();
    viewMonth = next.getMonth();
  }

  function choose(day: Date) {
    value = day;
    viewYear = day.getFullYear();
    viewMonth = day.getMonth();
    open = false;
  }

  function onPointerDown(event: MouseEvent) {
    if (rootEl && !rootEl.contains(event.target as Node)) {
      open = false;
    }
  }
  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") open = false;
  }

  function setListeners(active: boolean) {
    if (active) {
      document.addEventListener("mousedown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    }
  }

  $: setListeners(open);

  onDestroy(() => setListeners(false));
</script>

<div bind:this={rootEl} class="dp">
  <button
    type="button"
    aria-haspopup="dialog"
    aria-expanded={open}
    class="dp__field"
    on:click={() => (open = !open)}
  >
    <span class="dp__value" class:placeholder={!value}>
      {value ? formatField(value) : placeholder}
    </span>
    <svg
      class="dp__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  </button>

  {#if open}
    <div role="dialog" aria-label="Choose a date" class="dp__popover">
      <div class="dp__header">
        <button
          type="button"
          aria-label="Previous month"
          class="dp__nav"
          on:click={() => goToMonth(-1)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span class="dp__title">{MONTHS[viewMonth]} {viewYear}</span>
        <button
          type="button"
          aria-label="Next month"
          class="dp__nav"
          on:click={() => goToMonth(1)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div class="dp__weekdays">
        {#each WEEKDAYS as day}
          <span class="dp__weekday">{day}</span>
        {/each}
      </div>

      <div class="dp__grid">
        {#each grid as day (day.toISOString())}
          <button
            type="button"
            aria-label={formatField(day)}
            aria-selected={value ? isSameDay(day, value) : false}
            class="dp__day"
            class:selected={value ? isSameDay(day, value) : false}
            class:today={isSameDay(day, today) &&
              !(value && isSameDay(day, value))}
            class:outside={day.getMonth() !== viewMonth}
            on:click={() => choose(day)}
          >
            {day.getDate()}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .dp {
    position: relative;
    width: 100%;
  }

  .dp__field {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    padding: 0.625rem 0.875rem;
    text-align: left;
    font-size: 0.875rem;
    color: #f8f8fc;
    cursor: pointer;
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .dp__field:focus-visible {
    border-color: #818cf8;
    box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.25);
  }

  .dp__value.placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .dp__icon {
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.5);
  }

  .dp__popover {
    position: absolute;
    z-index: 10;
    margin-top: 0.5rem;
    width: 18rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #15151f;
    padding: 0.75rem;
    box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .dp__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .dp__nav {
    display: flex;
    height: 2rem;
    width: 2rem;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 0.375rem;
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .dp__nav:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  .dp__nav svg {
    height: 1rem;
    width: 1rem;
  }

  .dp__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #f8f8fc;
  }

  .dp__weekdays,
  .dp__grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.25rem;
  }

  .dp__weekdays {
    margin-bottom: 0.25rem;
  }

  .dp__weekday {
    display: flex;
    height: 2rem;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.4);
  }

  .dp__day {
    display: flex;
    height: 2rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 0.375rem;
    background: transparent;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .dp__day:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .dp__day.outside {
    color: rgba(255, 255, 255, 0.3);
  }

  .dp__day.outside:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .dp__day.today {
    border: 1px solid rgba(129, 140, 248, 0.6);
    color: #f8f8fc;
  }

  .dp__day.selected {
    background: linear-gradient(135deg, #6366f1, #d946ef);
    font-weight: 600;
    color: #fff;
  }
</style>
