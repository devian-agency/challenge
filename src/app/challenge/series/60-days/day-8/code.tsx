"use client";
import { useState } from "react";
import CodePreview from "@/components/ui/code-preview";
import Code from "@/components/ui/code";
import { series, type Series, type Code as CodeType } from "@/contants/60day-series";
import ListScrolling from "@/components/ui/list-scrolling";

export default function Day5Page() {
  const [showCode, setShowCode] = useState(false);
  return (
    <section className=" py-4 relative">
      <CodePreview showCode={showCode} setShowCode={setShowCode} />
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full h-[calc(100vh-5rem)] justify-center items-center">
        {showCode ? (
          <Code
            code={
              series.find((s: Series) => s.title === "Day 8")?.code as
                | CodeType
                | CodeType[]
            }
          />
        ) : (
          <Day8 />
        )}
      </div>
    </section>
  );
}

export function Day8() {
  return (
    <section className="flex justify-center items-center">
      <ListScrolling />
    </section>
  );
}
