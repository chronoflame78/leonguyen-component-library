import "./BorderGradientButton.css";

type BorderGradientButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function BorderGradientButton({
  children = "Explore",
  ...props
}: BorderGradientButtonProps) {
  return (
    <button className="border-gradient-button" {...props}>
      <span className="border-gradient-button__label">{children}</span>
    </button>
  );
}
