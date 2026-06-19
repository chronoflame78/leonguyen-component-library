import "./ArrowButton.css";

type ArrowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ArrowButton({
  children = "Continue",
  ...props
}: ArrowButtonProps) {
  return (
    <button className="arrow-button" {...props}>
      <span className="arrow-button__label">{children}</span>
      <span className="arrow-button__arrow" aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="12" x2="20" y2="12" />
          <polyline points="13 5 20 12 13 19" />
        </svg>
      </span>
    </button>
  );
}
