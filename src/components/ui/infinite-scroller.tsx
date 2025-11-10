"use client";

import cn from "@/utils/ClassName";
import { useState, useEffect, useRef } from "react";

interface ScrollerProps {
  items: (string | number)[];
  className?: string;
  /** Scroll sensitivity for wheel (1 = normal, 0.5 = slower) */
  speed?: number;
  /** Delay in ms before auto-snapping after user stops scrolling */
  snapDelay?: number;
  infinite?: boolean;
  value?: string | number;
}

export default function Scroller({
  items,
  infinite = true,
  className,
  speed = 0.5,
  snapDelay = 150,
  value
}: ScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [itemHeight, setItemHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number>(Math.floor(items.length / 2));
  const lastScrollTime = useRef<number>(0);
  const snapTimeout = useRef<NodeJS.Timeout>(null);

  const extended = infinite ? [...items, ...items, ...items] : items;
  const middleSection = items.length;

  const handleClick = (index: number) => {
    const r = ref.current;
    if (!r || !itemHeight) return;
    r.scrollTo({
      top: index * itemHeight - r.clientHeight / 2 + itemHeight / 2,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }
  
  const handleValue = (index: number) => {
    
  }
  // initial setup
// --- replace the existing init effect with this ---

useEffect(() => {
  const r = ref.current;
  const first = itemRef.current;
  if (!r || !first) return;

  let tries = 0;
  const maxTries = 6;

  const align = () => {
    tries++;
    const h = first.clientHeight || 1;
    setItemHeight(h);

    const midIndex = middleSection;
    
    const target = Math.round(midIndex * h - ((r.clientHeight / 2) - (h / 2)));
    // set without smooth so it's pixel-perfect
    r.scrollTo({ top: target, behavior: "auto" });

    // verify center alignment (allow small fractional tolerance)
    const center = r.scrollTop + r.clientHeight / 2;
    const frac = Math.abs(center / h - Math.round(center / h));

    // if fractional offset is noticeable and we haven't exhausted retries, try again on next frame
    if (frac > 0.001 && tries < maxTries) {
      requestAnimationFrame(align);
    }
  };

  // initial align attempt on next frame to wait layout
  const id = requestAnimationFrame(align);

  // also re-align once on window resize (helps responsive/layout changes)
  const onResize = () => requestAnimationFrame(align);

  if(value){
    const index = items.indexOf(value);
    setActiveIndex(index);
  }
  
  window.addEventListener("resize", onResize);

  return () => {
    cancelAnimationFrame(id);
    window.removeEventListener("resize", onResize);
  };
}, [items, middleSection, value]);


  // smooth wheel control (manual slow scroll)
  useEffect(() => {
    const r = ref.current;
    if (!r) return;
    
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      r.scrollTop += e.deltaY * speed;
      handleScroll();
      lastScrollTime.current = performance.now();

      if (snapTimeout.current) clearTimeout(snapTimeout.current);
      snapTimeout.current = setTimeout(() => snapToNearest(), snapDelay);
    };

    r.addEventListener("wheel", onWheel, { passive: false });
    return () => r.removeEventListener("wheel", onWheel);
  }, [speed, itemHeight]);

  const handleScroll = () => {
    const r = ref.current;
    if (!r || !itemHeight) return;
    const sectionHeight = itemHeight * items.length;

    // infinite loop
    if (r.scrollTop <= sectionHeight * 0.5) r.scrollTop += sectionHeight;
    else if (r.scrollTop + r.clientHeight >= r.scrollHeight - sectionHeight * 0.5)
      r.scrollTop -= sectionHeight;

    // active index update
    const center = r.scrollTop + r.clientHeight / 3;
    const idx = Math.round(center / itemHeight) % items.length;
    setActiveIndex(idx);
  };

  // Snap to nearest item center when user stops scrolling
  const snapToNearest = () => {
    const r = ref.current;
    if (!r || !itemHeight) return;

    const center = r.scrollTop + r.clientHeight / 2;
    const nearestIndex = Math.round(center / itemHeight);
    const targetScrollTop = nearestIndex * itemHeight - r.clientHeight / 2 + itemHeight / 2;

    r.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  };

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div
        ref={ref}
        onScroll={handleScroll}
        className="h-48 w-fit overflow-auto scrollbar-none snap-none"
      >
        <div>
          {extended.map((item, index) => {
            const realIndex = index % items.length;
            const isActive = realIndex === activeIndex;
            return (
              <div
                ref={index === 0 ? itemRef : null}
                key={index}
                className="flex items-center justify-center h-12"
              >
                <p
                  className={cn(
                    "flex items-center justify-center w-fit cursor-pointer px-2 py-2 text-center select-none transition-all duration-150 ",
                    isActive
                      ? "text-foreground font-semibold scale-100"
                      : "opacity-30 scale-95",
                      realIndex + 1 == activeIndex + 3 && "opacity-10",
                      activeIndex == index - items.length + 2 && "opacity-10",
                      items.length == 2 && "mt-12 opacity-100",
                      items.length == 3 && "mt-12 opacity-100",
                      items.length == 4 && "-mt-12 opacity-100",
                      items.length == 5 && "mt-12 opacity-100",
                      items.length == 6 && "mt-35 opacity-100",

                  )}
                  onClick={()=> handleClick(index)}
                >
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
