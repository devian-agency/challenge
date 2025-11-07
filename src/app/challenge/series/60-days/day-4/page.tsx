"use client";

import cn from "@/utils/ClassName";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import CodePreview from "@/components/ui/code-preview";
import Code from "@/components/ui/code";
import { series, type Series, type Code as CodeType } from "@/contants/60day-series";

const color = "#0972DD";
const cur = "#7E7E7E";
const background = "#ddd";

export default function Day4Page(){
  const [showCode, setShowCode] = useState(false);
  return(
    <section className=" py-4 relative">
      <CodePreview showCode={showCode} setShowCode={setShowCode} />
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full h-[calc(100vh-5rem)] justify-center items-center">
        {showCode ?
        <Code code={series.find((s: Series) => s.title === "Day 4")?.code as CodeType | CodeType[]} /> :
        <Day3 />
        }
      </div>
    </section>
  )
}

export function Day3() {
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLHeadingElement>(null);
  const bg = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const c = ref.current;
    const b = button.current;
    const bb = bg.current;

    if (!c || !b || !bb) return;

    const rect = b.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    c.style.left = `${x - 8}px`;
    c.style.top = `${y - 8}px`;

    const insideX = x >= rect.left && x <= rect.right;
    const insideY = y >= rect.top && y <= rect.bottom;

    const nx = (x - rect.left) / rect.width - 0.5;
    const ny = (y - rect.top) / rect.height - 0.5;
    const buttonOffsetX = nx * 30;
    const buttonOffsetY = ny * 10;
    const bgOffsetX = nx;
    const bgOffsetY = ny;

    if (insideX && insideY) {
      b.style.transform = `translate(${buttonOffsetX}px, ${buttonOffsetY}px)`;
      bb.style.top = bgOffsetY + rect.height / 2 + "px";
      bb.style.left = bgOffsetX + rect.width / 2 + "px";
      bb.style.transform = `translate(${bgOffsetX}px, ${bgOffsetY}px)`;
      bb.style.width = `${rect.width}px`;
      bb.style.height = `${rect.height}px`;
      c.style.opacity = "0";
      c.style.width = `0px`;
      c.style.height = `0px`;
    } else {
      b.style.transform = `translate(0, 0)`;
      bb.style.top = y - rect.y + "px";
      bb.style.left = x - rect.x + "px";
      bb.style.width = `16px`;
      bb.style.height = `16px`;
      c.style.opacity = "1";
      c.style.width = `16px`;
      c.style.height = `16px`;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className={cn("flex justify-center items-center h-full cursor-none")}
    >
      <h2
        ref={button}
        style={{ color }}
        className="flex text-xl relative font-medium justify-center items-center py-2 px-4 rounded-xl transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-90"
      >
        <span
          ref={bg}
          style={{ background }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 -z-10 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        ></span>
        <span>
          <ChevronLeft size={30} />
        </span>
        Appearance
      </h2>

      <span
        ref={ref}
        style={{ backgroundColor: cur }}
        className="size-4 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] fixed pointer-events-none"
      ></span>
    </section>
  );
}
