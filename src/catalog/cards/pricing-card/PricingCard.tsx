interface PricingCardProps {
  plan?: string;
  price?: string;
  period?: string;
  features?: string[];
  cta?: string;
  popular?: boolean;
}

const defaultFeatures = [
  "Unlimited projects",
  "Advanced analytics",
  "Priority support",
  "Custom integrations",
  "Team collaboration",
];

export function PricingCard({
  plan = "Pro",
  price = "$29",
  period = "/month",
  features = defaultFeatures,
  cta = "Get started",
  popular = true,
}: PricingCardProps) {
  return (
    <div
      className={`relative w-full max-w-xs rounded-2xl border p-6 text-left transition-transform hover:-translate-y-1 ${
        popular
          ? "border-indigo-500/60 bg-gradient-to-b from-indigo-500/10 to-fuchsia-500/5 shadow-[0_20px_50px_-20px_rgba(99,102,241,0.7)]"
          : "border-white/10 bg-white/5"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          Most popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-white">{plan}</h3>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="mb-1 text-sm text-white/50">{period}</span>
      </div>

      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-white/80">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.3 3.29 6.8-6.79a1 1 0 0 1 1.4 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`mt-7 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
          popular
            ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
