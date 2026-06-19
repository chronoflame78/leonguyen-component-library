import "./GlitchButton.css";

type GlitchButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function GlitchButton({
  children = "SYSTEM",
  ...props
}: GlitchButtonProps) {
  const text = typeof children === "string" ? children : "SYSTEM";
  return (
    <button className="glitch-button" {...props}>
      <span className="glitch-button__text" data-text={text}>
        {children}
      </span>
    </button>
  );
}
