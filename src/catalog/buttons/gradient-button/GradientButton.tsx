import "./GradientButton.css";

type GradientButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function GradientButton({
  children = "Get Started",
  ...props
}: GradientButtonProps) {
  return (
    <button className="gradient-button" {...props}>
      <span className="gradient-button__label">{children}</span>
    </button>
  );
}
