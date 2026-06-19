import "./ShimmerButton.css";

type ShimmerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ShimmerButton({
  children = "Shimmer",
  ...props
}: ShimmerButtonProps) {
  return (
    <button className="shimmer-button" {...props}>
      <span className="shimmer-button__label">{children}</span>
      <span className="shimmer-button__shine" aria-hidden="true" />
    </button>
  );
}
