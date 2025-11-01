import cn from "@/utils/ClassName";
interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export default function Heading({ as, className, children, ...props }: Props) {
  const Component = as || "h2";
  return (
    <Component
      className={cn(
        "xl:text-[58px] mt-6 md:text-[51px] text-[40px] first-letter:capitalize font-semibold text-center max-w-[400px] md:max-w-[600px] xl:max-w-[700px] mx-auto text-heading tracking-tight leading-16",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
