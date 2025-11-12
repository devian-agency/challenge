"use client";
import { useState } from "react";
import CodePreview from "@/components/ui/code-preview";
import Code from "@/components/ui/code";
import { series, type Series, type Code as CodeType } from "@/contants/60day-series";
import Card from "@/components/ui/card";

export default function Day5Page() {
  const [showCode, setShowCode] = useState(false);
  return (
    <section className=" py-4 relative">
      <CodePreview showCode={showCode} setShowCode={setShowCode} />
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full h-[calc(100vh-5rem)] justify-center items-center">
        {showCode ? (
          <Code
            code={
              series.find((s: Series) => s.title === "Day 9")?.code as
                | CodeType
                | CodeType[]
            }
          />
        ) : (
          <Day9 />
        )}
      </div>
    </section>
  );
}

export function Day9() {
  return (
    <section className="max-w-7xl mx-auto h-full flex items-center gap-4">
          <Card heading="Smart AI focus" image="/images/challenge/series/60-days/day-9/image1.avif">
            Devian shows what to focus on — based on your goals and pace.
          </Card>
          <Card heading="Track your progress" image="/images/challenge/series/60-days/day-9/image2.avif">
            Track what’s done, what’s next — all in one dashboard.
          </Card>
          <Card className="h-92" heading="Never miss tasks" image="/images/challenge/series/60-days/day-9/image3.avif">
          Calendar view of upcoming tasks, so you never miss a thing.
          </Card>
        </section>
  );
}
