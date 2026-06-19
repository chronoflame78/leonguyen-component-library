<script lang="ts">
  export let checked: boolean = false;
  export let label: string = "Toggle day and night";

  function toggle() {
    checked = !checked;
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label={label}
  class="day-night-toggle"
  on:click={toggle}
>
  <span class="day-night-toggle__sky" />
  <span class="day-night-toggle__stars" aria-hidden="true">
    <i style="top:20%;left:18%" />
    <i style="top:55%;left:30%" />
    <i style="top:32%;left:45%" />
    <i style="top:68%;left:52%" />
  </span>
  <span class="day-night-toggle__clouds" aria-hidden="true">
    <i style="top:60%;left:22%" />
    <i style="top:30%;left:40%" />
  </span>
  <span class="day-night-toggle__knob">
    <span class="day-night-toggle__crater" style="top:22%;left:30%;width:22%;height:22%" />
    <span class="day-night-toggle__crater" style="top:52%;left:55%;width:16%;height:16%" />
    <span class="day-night-toggle__crater" style="top:60%;left:25%;width:12%;height:12%" />
  </span>
</button>

<style>
  .day-night-toggle {
    --track-day: linear-gradient(180deg, #5fb6f7 0%, #9cd4fb 100%);
    --track-night: linear-gradient(180deg, #15182e 0%, #2a2d54 100%);
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 5rem;
    height: 2.5rem;
    padding: 0;
    border: none;
    border-radius: 9999px;
    background: transparent;
    cursor: pointer;
    overflow: hidden;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.45);
  }

  .day-night-toggle:focus-visible {
    outline: 2px solid #a855f7;
    outline-offset: 2px;
  }

  .day-night-toggle__sky {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--track-day);
    transition: opacity 0.5s ease;
  }

  .day-night-toggle__sky::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--track-night);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .day-night-toggle[aria-checked="true"] .day-night-toggle__sky::after {
    opacity: 1;
  }

  .day-night-toggle__stars {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  .day-night-toggle__stars i {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.8);
    animation: day-night-twinkle 2.4s ease-in-out infinite;
  }

  .day-night-toggle__stars i:nth-child(2) {
    animation-delay: 0.6s;
  }
  .day-night-toggle__stars i:nth-child(3) {
    animation-delay: 1.1s;
  }
  .day-night-toggle__stars i:nth-child(4) {
    animation-delay: 1.7s;
  }

  .day-night-toggle[aria-checked="true"] .day-night-toggle__stars {
    opacity: 1;
  }

  .day-night-toggle__clouds {
    position: absolute;
    inset: 0;
    opacity: 1;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  .day-night-toggle__clouds i {
    position: absolute;
    width: 14px;
    height: 6px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 6px -3px 0 -1px rgba(255, 255, 255, 0.7);
  }

  .day-night-toggle[aria-checked="true"] .day-night-toggle__clouds {
    opacity: 0;
  }

  .day-night-toggle__knob {
    position: absolute;
    top: 50%;
    left: 0.3125rem;
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #fff6cf, #ffd83d 60%, #f7b733);
    box-shadow: 0 0 10px 2px rgba(255, 216, 61, 0.8),
      0 2px 4px rgba(0, 0, 0, 0.4);
    transform: translate(0, -50%);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      background 0.5s ease, box-shadow 0.5s ease;
  }

  .day-night-toggle[aria-checked="true"] .day-night-toggle__knob {
    transform: translate(2.5rem, -50%);
    background: radial-gradient(circle at 35% 30%, #f4f4f8, #d7d9e6 60%, #b8bbcf);
    box-shadow: 0 0 10px 2px rgba(200, 205, 230, 0.5),
      0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .day-night-toggle__crater {
    position: absolute;
    border-radius: 50%;
    background: rgba(150, 154, 180, 0.7);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .day-night-toggle[aria-checked="true"] .day-night-toggle__crater {
    opacity: 1;
  }

  @keyframes day-night-twinkle {
    0%,
    100% {
      opacity: 0.4;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .day-night-toggle__sky,
    .day-night-toggle__sky::after,
    .day-night-toggle__stars,
    .day-night-toggle__clouds,
    .day-night-toggle__knob,
    .day-night-toggle__crater {
      transition: none;
    }
    .day-night-toggle__stars i {
      animation: none;
    }
  }
</style>
