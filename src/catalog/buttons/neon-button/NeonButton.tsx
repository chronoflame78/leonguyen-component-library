import "./NeonButton.css";

type NeonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function NeonButton({ children = "Neon", ...props }: NeonButtonProps) {
  return (
    <button className="neon-button" {...props}>
      <span className="neon-button__label">{children}</span>
    </button>
  );
}
