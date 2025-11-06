"use client"
import Heading from "@/components/ui/heading";
import Code from "@/components/ui/code";
import { series, type Series, type Code as CodeType } from "@/contants/60day-series";
import { useState } from "react";
import CodePreview from "@/components/ui/code-preview";

export default function Day2Page(){
  const [showCode, setShowCode] = useState(false);
  return(
    <section className=" py-4 relative">
      <CodePreview showCode={showCode} setShowCode={setShowCode} />
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full h-[calc(100vh-5rem)] justify-center items-center">
        {showCode ?
        <Code code={series.find((s: Series) => s.title === "Day 3")?.code as CodeType | CodeType[]} /> :
        <Day3 />
        }
      </div>
    </section>
  )
}

function Day3(){
  return (
    <section>
      <Heading>Code Block</Heading>
      <Code className="mx-auto" code={[
        {
        filename: "page.tsx",
        path: "src/app/contact/page.tsx",
        lang: "typescript",
        code:`"use client";

import cn from "@/utils/ClassName";

import { Eye, Code } from "lucide-react";

export default function CodePreview({showCode, setShowCode}: {showCode: boolean, setShowCode: (showCode: boolean) => void}) {
  return (
    <div className="md:absolute max-md:w-full top-4 right-4 flex gap-4 z-100">
      <div onClick={() => setShowCode(false)} className={cn("max-md:flex-1 shadow-card cursor-pointer py-3 md:py-1 px-4 rounded-md transition-colors duration-300", !showCode && "bg-foreground text-background")}>
        <p className="font-medium flex gap-2 items-center justify-center">
          <span>
            <Eye size={20} />
          </span>
          Preview
        </p>
      </div>
      <div onClick={() => setShowCode(true)} className={cn("max-md:flex-1 shadow-card cursor-pointer py-3 md:py-1 px-4 rounded-md transition-colors duration-300", showCode && "bg-foreground text-background")}>
        <p className="font-medium flex gap-2 items-center justify-center">
          <span>
            <Code size={20} />
          </span>
          Code
        </p>
      </div>
    </div>
  );
}
`
      }
      ]} />
      
    </section>
  )
}