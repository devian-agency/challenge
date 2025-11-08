"use client";

import { useRef, useEffect } from "react";
import cn from "@/utils/ClassName";
import { toPng } from "html-to-image";

export default function OgGenerator({
  children,
  filename = "image.png",
  onGenerated,
  className
}: {
  children?: React.ReactNode;
  filename?: string;
  onGenerated?: (dataUrl: string) => void;
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!ref.current) return;

    try {
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 2,
      });

      // optional: callback or download
      onGenerated?.(dataUrl);

      // trigger download directly
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating OG image:", err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col w-full items-center gap-4">
      {/* The actual UI you want to capture */}
      <div
        ref={ref}
        className={cn("size-full p-10 rounded-3xl bg-background text-foreground", className)}
      >
        {children}
      </div>

      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
      >
        Generate OG Image
      </button>
    </div>
  );
}
