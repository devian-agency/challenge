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
