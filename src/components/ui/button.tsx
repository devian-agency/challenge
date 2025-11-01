import cn from "@/utils/ClassName";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "dark" | "light" | "primary";
  type?: "submit" | "reset" | "button";
  text: string;
}

export default function Button({
  className,
  text,
  variant = "dark",
  type = "button",
  ...rest
}: Props) {
  const variants = {
    dark: "bg-button text-background shadow-button-dark hover:bg-primary hover:shadow-button-primary",
    light:
      "bg-background text-foreground hover:text-primary shadow-button-light",
    primary: "bg-primary text-white shadow-button-primary",
  };

  return (
    <button
      className={cn(
        "font-instrument-sans font-medium relative bg-button text-background py-1.5 border border-white px-6 rounded-2xl w-fit h-fit overflow-hidden transition-colors cursor-pointer",
        "group",
        variants[variant],
        className
      )}
      type={type}
      {...rest}
    >
      <span className="flex flex-col py-2 relative overflow-hidden">
        <span className="group-hover:-translate-y-2/1 transition-transform">
          {text}
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 translate-y-2/1 group-hover: group-hover:translate-y-0 transition-transform">
          {text}
        </span>
      </span>
    </button>
  );
}
