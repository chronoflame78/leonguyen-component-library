import { useState } from "react";

type Brand = "visa" | "mastercard" | "amex" | "discover" | "unknown";

interface BrandSpec {
  /** Max number of digits the brand allows. */
  maxDigits: number;
  /** Digit-group sizes used to space the formatted value. */
  groups: number[];
}

const SPECS: Record<Brand, BrandSpec> = {
  visa: { maxDigits: 16, groups: [4, 4, 4, 4] },
  mastercard: { maxDigits: 16, groups: [4, 4, 4, 4] },
  discover: { maxDigits: 16, groups: [4, 4, 4, 4] },
  amex: { maxDigits: 15, groups: [4, 6, 5] },
  unknown: { maxDigits: 16, groups: [4, 4, 4, 4] },
};

/** Detects the card brand from the leading digits. */
function detectBrand(digits: string): Brand {
  if (/^4/.test(digits)) return "visa";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^6(?:011|5)/.test(digits)) return "discover";
  if (/^5[1-5]/.test(digits)) return "mastercard";
  const head = Number(digits.slice(0, 4));
  if (digits.length >= 4 && head >= 2221 && head <= 2720) return "mastercard";
  return "unknown";
}

/** Groups digits into the brand's spacing pattern. */
function formatDigits(digits: string, groups: number[]): string {
  const out: string[] = [];
  let i = 0;
  for (const size of groups) {
    if (i >= digits.length) break;
    out.push(digits.slice(i, i + size));
    i += size;
  }
  if (i < digits.length) out.push(digits.slice(i));
  return out.join(" ");
}

function BrandBadge({ brand }: { brand: Brand }) {
  const base = "flex h-6 w-9 items-center justify-center rounded text-[10px] font-bold tracking-wide";
  if (brand === "visa")
    return (
      <span className={`${base} bg-[#1a1f71] text-white italic`}>VISA</span>
    );
  if (brand === "mastercard")
    return (
      <span className={`${base} bg-white`} aria-label="Mastercard">
        <svg viewBox="0 0 36 24" className="h-4 w-6" aria-hidden="true">
          <circle cx="14" cy="12" r="8" fill="#eb001b" />
          <circle cx="22" cy="12" r="8" fill="#f79e1b" fillOpacity="0.85" />
        </svg>
      </span>
    );
  if (brand === "amex")
    return (
      <span className={`${base} bg-[#2e77bb] text-white text-[8px]`}>AMEX</span>
    );
  if (brand === "discover")
    return (
      <span className={`${base} bg-[#f3f4f6] text-[#231f20] text-[7px]`}>
        DISCOVER
      </span>
    );
  return (
    <svg
      className="h-6 w-9 text-white/30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

interface CreditCardInputProps {
  placeholder?: string;
  onValueChange?: (digits: string, brand: string) => void;
}

export function CreditCardInput({
  placeholder = "1234 5678 9012 3456",
  onValueChange,
}: CreditCardInputProps) {
  const [digits, setDigits] = useState("");
  const brand = detectBrand(digits);
  const spec = SPECS[brand];
  const formatted = formatDigits(digits, spec.groups);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value.replace(/\D/g, "");
    // Re-detect on the freshly typed digits so the cap follows the brand.
    const nextBrand = detectBrand(raw);
    const capped = raw.slice(0, SPECS[nextBrand].maxDigits);
    setDigits(capped);
    onValueChange?.(capped, nextBrand);
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        aria-label="Card number"
        value={formatted}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-3.5 pr-14 font-mono text-sm tracking-wider text-[#f8f8fc] placeholder:font-sans placeholder:text-white/40 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25"
      />
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <BrandBadge brand={brand} />
      </div>
    </div>
  );
}
