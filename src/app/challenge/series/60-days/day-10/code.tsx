"use client";
import { useState } from "react";
import CodePreview from "@/components/ui/code-preview";
import Code from "@/components/ui/code";
import { series, type Series, type Code as CodeType } from "@/contants/60day-series";
import { Bell } from "lucide-react";
import Notifications from "@/components/ui/notifications";
import cn from "@/utils/ClassName";

export default function Day5Page() {
  const [showCode, setShowCode] = useState(false);
  return (
    <section className=" py-4 relative">
      <CodePreview showCode={showCode} setShowCode={setShowCode} />
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full h-[calc(100vh-5rem)] justify-center items-center">
        {showCode ? (
          <Code
            code={
              series.find((s: Series) => s.title === "Day 10")?.code as
                | CodeType
                | CodeType[]
            }
          />
        ) : (
          <Day10 />
        )}
      </div>
    </section>
  );
}

export function Day10() {
 const [open, setOpen] = useState(false);
  return (
    <section className="max-w-7xl w-96 relative flex items-center justify-end h-12 mt-16">
      <span><Bell className={cn("cursor-pointer hover:fill-foreground ", open && "fill-foreground")} onClick={() => setOpen(!open)} size={24}/></span>
      <Notifications open={open} setOpen={setOpen} />
    </section>
  );
}
