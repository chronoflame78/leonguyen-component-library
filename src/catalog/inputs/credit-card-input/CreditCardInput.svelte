<script lang="ts">
  export let placeholder: string = "1234 5678 9012 3456";

  type Brand = "visa" | "mastercard" | "amex" | "discover" | "unknown";

  interface BrandSpec {
    maxDigits: number;
    groups: number[];
  }

  const SPECS: Record<Brand, BrandSpec> = {
    visa: { maxDigits: 16, groups: [4, 4, 4, 4] },
    mastercard: { maxDigits: 16, groups: [4, 4, 4, 4] },
    discover: { maxDigits: 16, groups: [4, 4, 4, 4] },
    amex: { maxDigits: 15, groups: [4, 6, 5] },
    unknown: { maxDigits: 16, groups: [4, 4, 4, 4] },
  };

  let digits = "";

  /** Detects the card brand from the leading digits. */
  function detectBrand(d: string): Brand {
    if (/^4/.test(d)) return "visa";
    if (/^3[47]/.test(d)) return "amex";
    if (/^6(?:011|5)/.test(d)) return "discover";
    if (/^5[1-5]/.test(d)) return "mastercard";
    const head = Number(d.slice(0, 4));
    if (d.length >= 4 && head >= 2221 && head <= 2720) return "mastercard";
    return "unknown";
  }

  /** Groups digits into the brand's spacing pattern. */
  function formatDigits(d: string, groups: number[]): string {
    const out: string[] = [];
    let i = 0;
    for (const size of groups) {
      if (i >= d.length) break;
      out.push(d.slice(i, i + size));
      i += size;
    }
    if (i < d.length) out.push(d.slice(i));
    return out.join(" ");
  }

  $: brand = detectBrand(digits);
  $: formatted = formatDigits(digits, SPECS[brand].groups);

  function onInput(event: Event) {
    const raw = (event.target as HTMLInputElement).value.replace(/\D/g, "");
    const nextBrand = detectBrand(raw);
    digits = raw.slice(0, SPECS[nextBrand].maxDigits);
  }
</script>

<div class="cc">
  <input
    type="text"
    inputmode="numeric"
    autocomplete="cc-number"
    aria-label="Card number"
    class="cc__input"
    value={formatted}
    {placeholder}
    on:input={onInput}
  />
  <div class="cc__badge">
    {#if brand === "visa"}
      <span class="cc__brand cc__brand--visa">VISA</span>
    {:else if brand === "mastercard"}
      <span class="cc__brand cc__brand--mc" aria-label="Mastercard">
        <svg viewBox="0 0 36 24" class="cc__mc" aria-hidden="true">
          <circle cx="14" cy="12" r="8" fill="#eb001b" />
          <circle cx="22" cy="12" r="8" fill="#f79e1b" fill-opacity="0.85" />
        </svg>
      </span>
    {:else if brand === "amex"}
      <span class="cc__brand cc__brand--amex">AMEX</span>
    {:else if brand === "discover"}
      <span class="cc__brand cc__brand--discover">DISCOVER</span>
    {:else}
      <svg
        class="cc__placeholder"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    {/if}
  </div>
</div>

<style>
  .cc {
    position: relative;
    width: 100%;
  }

  .cc__input {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    padding: 0.625rem 3.5rem 0.625rem 0.875rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    color: #f8f8fc;
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .cc__input::placeholder {
    font-family: system-ui, sans-serif;
    letter-spacing: normal;
    color: rgba(255, 255, 255, 0.4);
  }

  .cc__input:focus {
    border-color: #818cf8;
    box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.25);
  }

  .cc__badge {
    pointer-events: none;
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .cc__brand {
    display: flex;
    height: 1.5rem;
    width: 2.25rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .cc__brand--visa {
    background: #1a1f71;
    color: #fff;
    font-style: italic;
    font-size: 10px;
  }

  .cc__brand--mc {
    background: #fff;
  }

  .cc__mc {
    height: 1rem;
    width: 1.5rem;
  }

  .cc__brand--amex {
    background: #2e77bb;
    color: #fff;
    font-size: 8px;
  }

  .cc__brand--discover {
    background: #f3f4f6;
    color: #231f20;
    font-size: 7px;
  }

  .cc__placeholder {
    height: 1.5rem;
    width: 2.25rem;
    color: rgba(255, 255, 255, 0.3);
  }
</style>
