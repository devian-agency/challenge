"use client";

import { useRef, useEffect } from "react";
import cn from "@/utils/ClassName";
import { toPng } from "html-to-image";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";

export default function ImageGenerator({
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
      onGenerated?.(dataUrl);

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      toast.error("Failed to generate image.");
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
      
      <div
        ref={ref}
        className={cn("size-full p-10 rounded-3xl bg-background text-foreground", className)}
      >
        {children}
      </div>

      <Button
        onClick={handleGenerate}
        className="rounded-md"
        text="Generate Image"
      />
    </div>
  );
}
