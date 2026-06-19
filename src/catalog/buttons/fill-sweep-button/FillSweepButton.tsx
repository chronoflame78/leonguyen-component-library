import "./FillSweepButton.css";

type FillSweepButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function FillSweepButton({
  children = "Explore",
  ...props
}: FillSweepButtonProps) {
  return (
    <button className="fill-sweep-button" {...props}>
      <span className="fill-sweep-button__label">{children}</span>
    </button>
  );
}
