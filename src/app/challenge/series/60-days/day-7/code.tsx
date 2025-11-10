"use client";
import { useState } from "react";
import CodePreview from "@/components/ui/code-preview";
import Code from "@/components/ui/code";
import { series, type Series, type Code as CodeType } from "@/contants/60day-series";
import TiltImage from "@/components/ui/tilt-image";

export default function Day5Page() {
  const [showCode, setShowCode] = useState(false);
  return (
    <section className=" py-4 relative">
      <CodePreview showCode={showCode} setShowCode={setShowCode} />
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full h-[calc(100vh-5rem)] justify-center items-center">
        {showCode ? (
          <Code
            code={
              series.find((s: Series) => s.title === "Day 7")?.code as
                | CodeType
                | CodeType[]
            }
          />
        ) : (
          <Day7 />
        )}
      </div>
    </section>
  );
}

export function Day7() {
  return (
    <section className="h-[120vh] flex justify-center items-center">
      <TiltImage src="https://framerusercontent.com/images/acwvRTzMz1hmvXG7peXbTrcbGnM.webp?scale-down-to=2048" />
    </section>
  );
}
