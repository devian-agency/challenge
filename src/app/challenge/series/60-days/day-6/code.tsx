"use client";
import ImageGenerator from "@/lib/og-generator";
import NotFound from "@/app/not-found";
import { useState } from "react";
import CodePreview from "@/components/ui/code-preview";
import Code from "@/components/ui/code";
import { series, type Series, type Code as CodeType } from "@/contants/60day-series";

export default function Day5Page() {
  const [showCode, setShowCode] = useState(false);
  return (
    <section className=" py-4 relative">
      <CodePreview showCode={showCode} setShowCode={setShowCode} />
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full h-[calc(100vh-5rem)] justify-center items-center">
        {showCode ? (
          <Code
            code={
              series.find((s: Series) => s.title === "Day 6")?.code as
                | CodeType
                | CodeType[]
            }
          />
        ) : (
          <GenerateImagePage />
        )}
      </div>
    </section>
  );
}

export function GenerateImagePage() {
  return (
    <section className="flex justify-center items-center h-full">
      <ImageGenerator className="w-fit px-30 shadow-card">
        <NotFound />
        {/* <Day5 /> */}    
      </ImageGenerator>

    </section>
  );
}
