"use client";
import cn from "@/utils/ClassName";
import { Code as CodeIcon, File } from "lucide-react";
import { type Code as CodeType } from "@/contants/60day-series";
import codeCompiler, { Color } from "@/components/ui/code-compiler";
import toast from "react-hot-toast";
import { use, useState } from "react";
import P from "./p";
import useSize from "@/hooks/use-size";
import Heading from "./heading";

export default function Code({
  code,
  colors,
  className,
  ...props
}: {
  code: CodeType | CodeType[];
  colors?: Color;
  className?: string;
} & React.ComponentProps<"div">) {
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const handleCopy = (code: string, index: number) => {
    const result = navigator.clipboard.writeText(code);
    result
      .then(() => {
        setCopied((prev) => ({ ...prev, [index]: true }));
        toast.success("Code copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy code!");
      });
  };

  const { color } = codeCompiler({});
  const size = useSize();

  return (
    <section className="w-full mt-12">
      {Array.isArray(code) ? (
        code?.map((c, i) => (
          <div key={i} className="md:max-w-7xl mx-auto">
            {c?.heading && <Heading className="max-w-7xl md:max-w-7xl xl:max-w-7xl text-left mt-10">{c.heading}</Heading>}
            {c?.before && (
              <P className={cn("md:max-w-7xl text-left mb-4 mt-10", c?.heading && "mt-2")}>{c.before}</P>
            )}
            <div
              style={{ backgroundColor: color.background, color: color.text }}
              className={cn(
                "w-full min-w-96 max-w-6xl border rounded-xl pt-12 pb-2 relative overflow-hidden mt-2",
                !c?.before && "mt-10",
                className
              )}
              {...props}
            >
              <div
                className={cn(
                  "p-4 mx-2 pl-2 max-h-200 overflow-auto scrollbar-transparent "
                )}
              >

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
                    style={{
                      color: color.path,
                    }}
                    className={cn("text-lg hidden md:inline-block", !c.showPath && "hidden", size < 768 && "hidden")}
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


                <code className={cn("[counter-reset:list] list-none")}>
                  <span
                    style={{ color: color.text }}
                    className="opacity-50 md:hidden"
                  >
                    // {c.path}
                  </span>
                  {c.code.split(/\r?\n/g).map((line, n) => (
                    <li key={n} className={cn("whitespace-pre")}>
                      <span className="[counter-increment:list] before:content-[counter(list)] relative before:mr-2 before:text-right before:inline-block opacity-50 mr-2"></span>
                      {codeCompiler({ text: n === 0 ? line.trim(): line, color: colors }).nodes}
                    </li>
                  ))}
                  <div
                    onClick={() => handleCopy(c.code, i)}
                    style={{
                      backgroundColor: color.text,
                      color: color.background,
                    }}
                    className="absolute top-12 right-4 w-fit px-2 rounded-md font-medium opacity-60 cursor-pointer"
                  >
                    <span className="font-instrument-sans">
                      {copied[i] ? "Copied" : "Copy"}
                    </span>
                  </div>
                </code>
              </div>
            </div>
            {c?.after && (
              <P className="md:max-w-7xl text-left mb-10">{c?.after}</P>
            )}
          </div>
        ))
      ) : (
        <div className="">
          {code?.heading && <Heading className="max-w-7xl md:max-w-7xl xl:max-w-7xl text-left mt-10">{code.heading}</Heading>}
          {code?.before && (
            <P className={cn("md:max-w-7xl text-left mb-4 mt-10", code?.heading && "mt-2")}>{code.before}</P>
          )}
          <div
            style={{ backgroundColor: color.background, color: color.text }}
            className={cn(
              "w-full min-w-96 mx-auto max-w-6xl border rounded-xl pt-12 pb-2 relative overflow-hidden mt-2",
              className
            )}
            {...props}
          >
            <div
              className={cn(
                "p-4 mx-2 pl-2 max-h-200 overflow-auto scrollbar-transparent "
              )}
            >

              <div
                style={{ backgroundColor: color.title }}
                className="absolute top-0 left-0 w-full h-10 flex items-center justify-between gap-2 px-4"
              >
                <h3 className="text-lg flex items-center gap-2">
                  <span>
                    <File size={20} />
                  </span>{" "}
                  {code.filename}
                </h3>
                <p
                  style={{
                    color: color.path
                  }}
                  className={cn("text-lg hidden md:inline-block", !code.showPath && "hidden", size < 768 && "hidden")}
                >
                  ../{code.path}
                </p>
                <p className="text-lg flex items-center gap-2">
                  <span>
                    <CodeIcon size={20} />
                  </span>
                  {code.lang}
                </p>
              </div>

              <code className={cn("[counter-reset:list] list-none")}>
                <span
                  style={{ color: color.text }}
                  className="opacity-50 md:hidden"
                >
                  // {code.path}
                </span>
                {code.code.split(/\r?\n/g).map((line, n) => (
                  <li key={n} className={cn("whitespace-pre")}>
                    <span className="[counter-increment:list] before:content-[counter(list)] relative before:mr-2 before:text-right before:inline-block opacity-50 mr-2"></span>
                    {codeCompiler({ text: n === 0 ? line.trim(): line, color: colors }).nodes}
                  </li>
                ))}
                <div
                  onClick={() => handleCopy(code.code, 0)}
                  style={{
                    backgroundColor: color.text,
                    color: color.background,
                  }}
                  className="absolute top-12 right-4 w-fit px-2 rounded-md font-medium opacity-60 cursor-pointer"
                >
                  <span className="font-instrument-sans">
                    {copied[0] ? "Copied" : "Copy"}
                  </span>
                </div>
              </code>
            </div>
          </div>
          {code.after && (
            <P className="md:max-w-7xl text-left mb-10">{code?.after}</P>
          )}
        </div>
      )}
    </section>
  );
}
