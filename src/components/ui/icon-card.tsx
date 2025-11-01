import cn from "@/utils/ClassName"
import {type LucideIcon } from "lucide-react"
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon?: LucideIcon;
  heading?: string;
}


export default function IconCard({
  className,
  icon,
  heading,
  children,
  ...rest
}: Props) {
  const Icon = icon as LucideIcon
  return (
    <div className={cn("flex-1 min-w-64 border border-white shadow-card rounded-2xl p-6", className)} {...rest}>
    <div className="flex h-full flex-col justify-between">
      <div className="w-fit p-2 rounded-md bg-card">
        <Icon className="text-background" />
      </div>
      <div className="">
        <h3 className="font-instrument-sans text-xl mt-10 font-medium text-left">{heading}</h3>
        <p className="font-inter sm:text-base text-sm text-card-text mx-auto mt-2">
          {children}
        </p>
      </div>
    </div>
  </div>
  )
}