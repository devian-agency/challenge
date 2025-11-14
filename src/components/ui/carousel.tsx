import cn from "@/utils/ClassName";

interface CarouselProps {
  speed?: number;
  reverse?: boolean;
  children: React.ReactNode;
}

export default function Carousel({ speed = 20, reverse = false, children }: CarouselProps) {
  return(
    <div className="overflow-hidden relative w-full mt-12">
  <div
    className={cn(
      "flex gap-16 items-center whitespace-nowrap w-max",
      reverse ? "flex-row-reverse" : "",
  )}
  >
    <ul
      className={cn(
        "flex gap-16 animate-marquee",
        reverse ? "reverse" : "",
  )}
      style={{"--speed": speed + "s"} as React.CSSProperties}
    >
      {children}
    </ul>

    <ul
      className={cn(
        "flex gap-16 animate-marquee",
        reverse ? "reverse" : "",
  )}
      style={{"--speed": speed + "s"} as React.CSSProperties}
    >
      {children}
    </ul>
  </div>
</div>
  )
}

