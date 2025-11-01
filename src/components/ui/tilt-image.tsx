import cn from "@/utils/ClassName";
import { useState, useEffect} from "react";
import ImageWrapper from "@/utils/custom-image-wrapper";

interface TiltImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src: string;
}

export default function TiltImage({ src, className, ...props }: TiltImageProps) {
  const [angle, setAngle] = useState(10);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const a = angle - scrollY / 30 > 10 ? 10 : angle - scrollY / 30 < 0 ? 0 : Math.ceil(angle - scrollY / 30);
    setAngle(a);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div className="mt-14">
      <div className="perspective-distant perspective-origin-top">
        <ImageWrapper src={src}
        style={{ transform: `rotateX(${angle}deg)` }}

         className={cn("origin-bottom rounded-2xl border border-white transform-3d transition-all duration-500 ease-linear shadow-soft", className)}
         alt="Nexus Dashboard Image"
         {...props as React.HTMLAttributes<HTMLImageElement>}
         />
      </div>
    </div>
  );
}