import cn from "@/utils/ClassName"
import {type LucideIcon } from "lucide-react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  icon?: LucideIcon
}

export default function Section({
  className,
  icon,
  children
}: Props){
  const Icon = icon as LucideIcon
  
  return (
<div
  className={cn(
    "text-foreground p-1.5 mx-auto mt-12 px-2.5 flex items-center justify-evenly shadow-soft text-xs border border-white w-fit gap-2 rounded-full font-instrument-sans",
    className
  )}
>
  {icon && <Icon className="size-3.5 text-icon" />}
  <p className="flex items-center">
    {children}
  </p>
</div>
  )
}