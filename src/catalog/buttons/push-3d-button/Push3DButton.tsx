import "./Push3DButton.css";

type Push3DButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Push3DButton({
  children = "Press Me",
  ...props
}: Push3DButtonProps) {
  return (
    <button className="push-3d-button" {...props}>
      <span className="push-3d-button__shadow" aria-hidden="true" />
      <span className="push-3d-button__edge" aria-hidden="true" />
      <span className="push-3d-button__face">{children}</span>
    </button>
  );
}
