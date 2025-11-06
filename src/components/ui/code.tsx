"use client";
import cn from "@/utils/ClassName";
import { Code as CodeIcon, File } from "lucide-react";
import {
  type Code as CodeType,
} from "@/contants/60day-series";
import codeCompiler, {Color} from "@/components/ui/code-compiler";
import toast from "react-hot-toast";
import Heading from "@/components/ui/heading";

export default function Code({ code, colors, className, ...props }: { code: CodeType[], colors?: Color, className?: string}) {
  const handleCopy = (code: string) => {
    const result = navigator.clipboard.writeText(code);
    result
      .then(() => {
        toast.success("Code copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy code!");
      });
  };

  const { color } = codeCompiler({})
 
  return (
    <section className="mt-4">
      {/* <Heading>Code</Heading> */}
      {code?.map((c, i) => (
        <div
        key={i}
          style={{ backgroundColor: color.background, color: color.text }}
          className={cn("w-full max-w-7xl border rounded-xl pt-12 pb-2 relative overflow-hidden mt-2", className)}
          {...props}
        >
          <div
            className={cn(
              "p-4 pl-2 max-h-200 overflow-auto scrollbar-transparent "
            )}
          >
            {/* Title Bar */}
            <div
              style={{ backgroundColor: color.title }}
              className="absolute top-0 left-0 w-full h-10 flex items-center justify-between gap-2 px-4"
            >
              <h3 className="text-lg flex items-center gap-2">
                <span>
                  <File size={20} />
                </span>{" "}
                {c.filename}
              </h3>
              <p
                style={{ color: color.path }}
                className="text-lg hidden md:inline-block"
              >
                ../{c.path}
              </p>
              <p className="text-lg flex items-center gap-2">
                <span>
                  <CodeIcon size={20} />
                </span>
                {c.lang}
              </p>
            </div>

            {/* Code Block */}
            <code className={cn("[counter-reset:list] list-none")}>
              <span
                style={{ color: color.text }}
                className="opacity-50 md:hidden"
              >
                // {c.path}
              </span>
              {c.code.split("\n").map((line, i) => (
                <li key={i} className={cn("")}>
                  <span className="[counter-increment:list] before:content-[counter(list)] before:mr-2 opacity-50"></span>
                  {i == 0 ? codeCompiler({text: line.trim(), color: colors}).nodes : codeCompiler({text: line, color: colors}).nodes}
                </li>
              ))}
              <div
                onClick={() => handleCopy(c.code)}
                style={{ backgroundColor: color.text, color: color.background }}
                className="absolute top-12 right-4 w-fit px-2 rounded-md font-medium opacity-60 cursor-pointer"
              >
                <span className="font-instrument-sans">copy</span>
              </div>
            </code>
          </div>
        </div>
      ))}
    </section>
  );
}
