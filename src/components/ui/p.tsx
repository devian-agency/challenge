import cn from "@/utils/ClassName"

interface Props extends React.HTMLAttributes<HTMLParagraphElement>{
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
}


export default function P({
  className,
  size,
  children,
  ...rest
}: Props
){
  return (
    <p className={cn("font-inter sm:text-lg text-base text-center text-foreground md:max-w-100 mx-auto mt-6", className, size && sizeClasses[size])} {...rest}>
  {children}
</p>
  )
}