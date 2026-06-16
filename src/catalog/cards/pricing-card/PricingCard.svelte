<script lang="ts">
  export let plan: string = "Pro";
  export let price: string = "$29";
  export let period: string = "/month";
  export let cta: string = "Get started";
  export let popular: boolean = true;
  export let features: string[] = [
    "Unlimited projects",
    "Advanced analytics",
    "Priority support",
    "Custom integrations",
    "Team collaboration",
  ];
</script>

<div class="pricing-card" class:popular>
  {#if popular}
    <span class="badge">Most popular</span>
  {/if}

  <h3 class="plan">{plan}</h3>

  <div class="price-row">
    <span class="price">{price}</span>
    <span class="period">{period}</span>
  </div>

  <ul class="features">
    {#each features as feature}
      <li class="feature">
        <span class="check">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.3 3.29 6.8-6.79a1 1 0 0 1 1.4 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        {feature}
      </li>
    {/each}
  </ul>

  <button class="cta" class:cta-popular={popular} on:click>{cta}</button>
</div>

<style>
  .pricing-card {
    position: relative;
    width: 100%;
    max-width: 20rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    text-align: left;
    color: #fff;
    font-family: inherit;
    transition: transform 0.15s ease;
  }

  .pricing-card:hover {
    transform: translateY(-0.25rem);
  }

  .pricing-card.popular {
    border-color: rgba(99, 102, 241, 0.6);
    background: linear-gradient(
      to bottom,
      rgba(99, 102, 241, 0.1),
      rgba(217, 70, 239, 0.05)
    );
    box-shadow: 0 20px 50px -20px rgba(99, 102, 241, 0.7);
  }

  .badge {
    position: absolute;
    top: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 9999px;
    background: linear-gradient(to right, #6366f1, #d946ef);
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .plan {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .price-row {
    margin-top: 1rem;
    display: flex;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .price {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1;
  }

  .period {
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .features {
    margin: 1.5rem 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .check {
    display: flex;
    height: 1.25rem;
    width: 1.25rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background: rgba(99, 102, 241, 0.2);
    color: #a5b4fc;
  }

  .check svg {
    height: 0.75rem;
    width: 0.75rem;
  }

  .cta {
    margin-top: 1.75rem;
    width: 100%;
    border: none;
    border-radius: 0.75rem;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    transition: background-color 0.15s ease, opacity 0.15s ease;
  }

  .cta:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .cta.cta-popular {
    background: linear-gradient(to right, #6366f1, #d946ef);
  }

  .cta.cta-popular:hover {
    opacity: 0.9;
  }
</style>
