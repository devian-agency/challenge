"use client";
import { useState } from "react";
import CodePreview from "@/components/ui/code-preview";
import Code from "@/components/ui/code";
import {
  series,
  type Series,
  type Code as CodeType,
} from "@/contants/60day-series";
import Heading from "@/components/ui/heading";

export default function Day5Page() {
  const [showCode, setShowCode] = useState(false);
  return (
    <section className=" h-full py-4 relative">
      <CodePreview showCode={showCode} setShowCode={setShowCode} />
      {showCode ? (
        <div className="flex flex-wrap gap-x-4 gap-y-8 w-full h-[calc(100vh-5rem)] justify-center items-center py-4">
          <Code
            code={
              series.find((s: Series) => s.title === "Day 12")?.code as
                | CodeType
                | CodeType[]
            }
          />
        </div>
      ) : (
        <Day12 />
      )}
    </section>
  );
}

export function Day12() {
  return (
    <section className="relative h-full">
      <div className="absolute blur-2xl w-1/3 top-0 left-0 aspect-square rounded-full bg-linear-60 from-[#f124fa] via-[#ed892c] to-[#30faaf] "></div>
      <div className="absolute right-0 blur-3xl bottom-0 w-1/3 aspect-square rounded-full bg-linear-60 from-[#27f627] to-[#1ac1eb]"></div>
      <div className="absolute size-6/7 left-1/2 top-1/2 -translate-1/2 bg-white/10 backdrop-blur-3xl">
        <Heading className="mt-64">
          Welcome to Devian, where you can unleash your creativity and build
          amazing applications with ease!
        </Heading>
      </div>
    </section>
  );
}
