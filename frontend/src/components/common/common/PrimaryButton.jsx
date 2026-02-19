import { Button } from "react-bootstrap";

const PrimaryButton = ({
  children,
  onClick,
  size = "md",
  className = "",
  ...props
}) => {
  const sizeClasses =
    size === "lg"
      ? "px-6 py-3 text-base"
      : size === "sm"
      ? "px-3 py-1.5 text-sm"
      : "px-5 py-2.5 text-sm";

  return (
    <Button
      onClick={onClick}
      className={`
        ${sizeClasses}
        relative
        font-medium
        tracking-wide
        text-white
        rounded-xl
        border-0
        bg-gradient-to-br
        from-blue-600
        via-blue-700
        to-blue-800
        shadow-[0_4px_14px_rgba(37,99,235,0.35)]
        transition-all
        duration-300
        ease-out
        hover:-translate-y-0.5
        hover:shadow-[0_6px_18px_rgba(37,99,235,0.45)]
        active:translate-y-0
        active:shadow-[0_3px_10px_rgba(37,99,235,0.35)]
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400/50
        ${className}
      `}
      {...props}
    >
      {/* Inner highlight layer (marble shine effect) */}
      <span className="absolute inset-0 rounded-xl bg-white/10 pointer-events-none"></span>

      <span className="relative z-10">
        {children}
      </span>
    </Button>
  );
};

export default PrimaryButton;
