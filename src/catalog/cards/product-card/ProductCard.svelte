<script lang="ts">
  export let name: string = "Aurora Wireless Headphones";
  export let category: string = "Audio";
  export let price: number = 149;
  export let oldPrice: number = 199;
  export let rating: number = 4;
  export let imageFrom: string = "#6366f1";
  export let imageTo: string = "#d946ef";

  let added = false;

  $: discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const stars = [0, 1, 2, 3, 4];
</script>

<div class="product-card">
  <div
    class="thumb"
    style="background-image: linear-gradient(135deg, {imageFrom}, {imageTo});"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 24 24"
      class="thumb-icon"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2" y="14" width="4" height="6" rx="1.5" />
      <rect x="18" y="14" width="4" height="6" rx="1.5" />
    </svg>
    {#if discount > 0}
      <span class="discount">-{discount}%</span>
    {/if}
  </div>

  <div class="body">
    <span class="category">{category}</span>
    <h3 class="name">{name}</h3>

    <div class="rating">
      <span class="stars" aria-label="{rating} out of 5">
        {#each stars as i}
          <svg
            viewBox="0 0 20 20"
            class="star"
            class:filled={i < Math.round(rating)}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85z" />
          </svg>
        {/each}
      </span>
      <span class="rating-value">{rating.toFixed(1)}</span>
    </div>

    <div class="footer">
      <div class="prices">
        <span class="price">${price}</span>
        {#if oldPrice && oldPrice > price}
          <span class="old-price">${oldPrice}</span>
        {/if}
      </div>
      <button
        class="add"
        class:added
        aria-pressed={added}
        on:click={() => (added = !added)}
      >
        {added ? "Added ✓" : "Add to cart"}
      </button>
    </div>
  </div>
</div>

<style>
  .product-card {
    width: 100%;
    max-width: 20rem;
    overflow: hidden;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    text-align: left;
    color: #fff;
    font-family: inherit;
    transition: transform 0.2s ease;
  }

  .product-card:hover {
    transform: translateY(-0.25rem);
  }

  .thumb {
    position: relative;
    display: flex;
    height: 10rem;
    align-items: center;
    justify-content: center;
  }

  .thumb-icon {
    height: 4rem;
    width: 4rem;
    color: rgba(255, 255, 255, 0.8);
    transition: transform 0.3s ease;
  }

  .product-card:hover .thumb-icon {
    transform: scale(1.1);
  }

  .discount {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.4);
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
    backdrop-filter: blur(4px);
  }

  .body {
    padding: 1rem;
  }

  .category {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #a5b4fc;
  }

  .name {
    margin: 0.25rem 0 0;
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rating {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stars {
    display: flex;
    align-items: center;
    gap: 0.125rem;
  }

  .star {
    height: 0.875rem;
    width: 0.875rem;
    color: rgba(255, 255, 255, 0.15);
  }

  .star.filled {
    color: #fbbf24;
  }

  .rating-value {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .footer {
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .prices {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  .price {
    font-size: 1.125rem;
    font-weight: 700;
  }

  .old-price {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.4);
    text-decoration: line-through;
  }

  .add {
    border: none;
    border-radius: 0.5rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(to right, #6366f1, #d946ef);
    transition: background-color 0.15s ease, opacity 0.15s ease;
  }

  .add:hover {
    opacity: 0.9;
  }

  .add.added {
    background: rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
    opacity: 1;
  }
</style>
