"use client";
import { useState } from "react";
import CodePreview from "@/components/ui/code-preview";
import Code from "@/components/ui/code";
import { series, type Series, type Code as CodeType } from "@/contants/60day-series";
import Heading from "@/components/ui/heading";
import P from "@/components/ui/p";
import Carousel from "@/components/ui/carousel";

export default function Day5Page() {
  const [showCode, setShowCode] = useState(false);
  return (
    <section className=" py-4 relative">
      <CodePreview showCode={showCode} setShowCode={setShowCode} />
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full h-[calc(100vh-5rem)] justify-center items-center">
        {showCode ? (
          <Code
            code={
              series.find((s: Series) => s.title === "Day 11")?.code as
                | CodeType
                | CodeType[]
            }
          />
        ) : (
          <Day11 />
        )}
      </div>
    </section>
  );
}

export function Day11() {
 const [open, setOpen] = useState(false);
  return (
    <section className="w-full max-w-7xl mx-auto justify-center items-center flex flex-col px-6 h-full">
      <Heading className="">
        Trusted by leading companies
      </Heading>
      <Carousel speed={10}>
        <P className="text-gray-500">Amazon</P>
        <P className="text-gray-500">Flipkart</P>
        <P className="text-gray-500">BlinkIt</P>
        <P className="text-gray-500">Meesho</P>
        <P className="text-gray-500">Mintra</P>
        <P className="text-gray-500">Shopsy</P>
        <P className="text-gray-500">Big Basket</P>
        <P className="text-gray-500">Jio Mart</P>
        <P className="text-gray-500">Zomato</P>
        <P className="text-gray-500">Swiggy</P>
      </Carousel>
    </section>
  );
}
