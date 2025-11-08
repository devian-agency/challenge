"use client";
import { interpolate } from "flubber";
import { useState, useEffect, useRef } from "react";
import CodePreview from "@/components/ui/code-preview";
import Code from "@/components/ui/code";
import {
  series,
  type Series,
  type Code as CodeType,
} from "@/contants/60day-series";

export default function Day2Page() {
  const [showCode, setShowCode] = useState(false);
  return (
    <section className=" py-4 relative">
      <CodePreview showCode={showCode} setShowCode={setShowCode} />
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full h-[calc(100vh-5rem)] justify-center items-center">
        {showCode ? (
          <Code
            code={
              series.find((s: Series) => s.title === "Day 5")?.code as
                | CodeType
                | CodeType[]
            }
          />
        ) : (
          <Day2 />
        )}
      </div>
    </section>
  );
}

function Day2() {
  return (
    <div className="flex flex-col text-center gap-6 transition-colors duration-500">

      <div
        className="size-fit mx-auto bg-icon p-5 rounded-full cursor-pointer"
      >
        <Day5 />
      </div>
    </div>
  );
}

interface IconProps {
  size?: number;
  color?: string;
  duration?: number;
  hold?: number;
  className?: string;
}

const twitter = "M22.46 6c-.77.35-1.6.58-2.47.69a4.26 4.26 0 0 0 1.87-2.35 8.48 8.48 0 0 1-2.7 1.03 4.24 4.24 0 0 0-7.23 3.87 12.03 12.03 0 0 1-8.74-4.43 4.22 4.22 0 0 0 1.31 5.66 4.18 4.18 0 0 1-1.92-.53v.05c0 2.03 1.45 3.72 3.37 4.1a4.26 4.26 0 0 1-1.91.07 4.25 4.25 0 0 0 3.96 2.95A8.5 8.5 0 0 1 2 19.54a12 12 0 0 0 6.5 1.9c7.8 0 12.07-6.46 12.07-12.07l-.01-.55A8.64 8.64 0 0 0 22.46 6z";
const x = "M14.283 10.18L23.318 0H21.26l-7.82 8.441L7.296 0H0l9.363 13.597L0 24h2.047l8.241-9.867L16.99 24h7.01l-9.717-13.82ZM11.24 13.652L10.4 12.458 2.798 1.563h3.286l6.26 9.306.839 1.194 7.76 11.217h-3.286l-6.417-9.628Z";

export function Day5({
  size = 64,
  duration = 0.5,
  hold = 2,
  className,
}: IconProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const twitterToX = interpolate(twitter, x, { maxSegmentLength: 1 });
    const xToTwitter = interpolate(x, twitter, {
      maxSegmentLength: 1,
    });

    let start: number | null = null;
    let pos: "toX" | "holdX" | "toTwitter" | "holdTwitter" = "toX";
    const d = duration * 1000;
    const h = hold * 1000;

    const step = (time: number) => {
      if (!start) start = time;
      const elapsed = time - start;

      if (pos === "toX") {
        const t = Math.min(elapsed / d, 2);
        pathRef.current?.setAttribute("d", twitterToX(t));
        if (t >= 1) {
          pos = "holdX";
          start = time;
        }
      } else if (pos === "holdX") {
        if (elapsed >= h) {
          pos = "toTwitter";
          start = time;
        }
      } else if (pos === "toTwitter") {
        const t = Math.min(elapsed / d, 2);
        pathRef.current?.setAttribute("d", xToTwitter(t));
        if (t >= 1) {
          pos = "holdTwitter";
          start = time;
        }
      } else if (pos === "holdTwitter") {
        if (elapsed >= h) {
          pos = "toX";
          start = time;
        }
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [duration, hold, twitter, x]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      role="img"
      fill="currentColor"
      aria-label="Twitter to X animated svg icon"
    >
      <path ref={pathRef} fill="currentColor" d={twitter} />
    </svg>
  );
}