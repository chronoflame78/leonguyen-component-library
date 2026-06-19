<script lang="ts">
  export let liked: boolean = false;
  export let label: string = "Like";

  function toggle() {
    liked = !liked;
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={liked}
  aria-label={label}
  class="like-toggle"
  on:click={toggle}
>
  <span class="like-toggle__ring" aria-hidden="true" />
  <span class="like-toggle__burst" aria-hidden="true">
    <i style="--a:0deg" />
    <i style="--a:60deg" />
    <i style="--a:120deg" />
    <i style="--a:180deg" />
    <i style="--a:240deg" />
    <i style="--a:300deg" />
  </span>
  <svg
    class="like-toggle__heart"
    viewBox="0 0 24 24"
    width="28"
    height="28"
    aria-hidden="true"
  >
    <path
      d="M12 21s-6.7-4.35-9.33-8.24C.9 9.9 1.78 6.3 4.6 5.2c1.94-.76 4.06-.02 5.4 1.6L12 9l2-2.2c1.34-1.62 3.46-2.36 5.4-1.6 2.82 1.1 3.7 4.7 1.93 7.56C18.7 16.65 12 21 12 21z"
    />
  </svg>
</button>

<style>
  .like-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
  }

  .like-toggle:focus-visible {
    outline: 2px solid #a855f7;
    outline-offset: 2px;
    border-radius: 50%;
  }

  .like-toggle__heart {
    position: relative;
    z-index: 2;
    fill: none;
    stroke: #8a8fa3;
    stroke-width: 2;
    transition: fill 0.2s ease, stroke 0.2s ease, transform 0.2s ease;
  }

  .like-toggle:hover .like-toggle__heart {
    stroke: #f43f6e;
  }

  .like-toggle[aria-checked="true"] .like-toggle__heart {
    fill: #f43f6e;
    stroke: #f43f6e;
    animation: like-pop 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  .like-toggle__ring {
    position: absolute;
    inset: 50%;
    width: 2.5rem;
    height: 2.5rem;
    margin: -1.25rem 0 0 -1.25rem;
    border-radius: 50%;
    border: 2px solid #f43f6e;
    opacity: 0;
    transform: scale(0.2);
    pointer-events: none;
  }

  .like-toggle[aria-checked="true"] .like-toggle__ring {
    animation: like-ring 0.5s ease-out;
  }

  .like-toggle__burst {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .like-toggle__burst i {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    margin: -2.5px 0 0 -2.5px;
    border-radius: 50%;
    background: #f9a8c4;
    opacity: 0;
    transform: rotate(var(--a)) translateX(0);
  }

  .like-toggle__burst i:nth-child(odd) {
    background: #f43f6e;
  }

  .like-toggle[aria-checked="true"] .like-toggle__burst i {
    animation: like-burst 0.55s ease-out;
  }

  @keyframes like-pop {
    0% {
      transform: scale(0.3);
    }
    45% {
      transform: scale(1.25);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes like-ring {
    0% {
      opacity: 0.9;
      transform: scale(0.3);
    }
    100% {
      opacity: 0;
      transform: scale(1.6);
    }
  }

  @keyframes like-burst {
    0% {
      opacity: 1;
      transform: rotate(var(--a)) translateX(6px) scale(1);
    }
    100% {
      opacity: 0;
      transform: rotate(var(--a)) translateX(20px) scale(0.3);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .like-toggle__heart {
      transition: none;
    }
    .like-toggle[aria-checked="true"] .like-toggle__heart,
    .like-toggle[aria-checked="true"] .like-toggle__ring,
    .like-toggle[aria-checked="true"] .like-toggle__burst i {
      animation: none;
    }
  }
</style>
