interface Crumb {
  label: string;
  href?: string;
}

const CRUMBS: Crumb[] = [
  { label: "Home", href: "#" },
  { label: "Library", href: "#" },
  { label: "Components", href: "#" },
  { label: "Buttons" },
];

function Chevron() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {CRUMBS.map((crumb, i) => {
          const isLast = i === CRUMBS.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="font-medium text-white" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <a
                  href={crumb.href}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {crumb.label}
                </a>
              )}
              {!isLast && <Chevron />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
