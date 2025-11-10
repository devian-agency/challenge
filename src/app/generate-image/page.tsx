import ImageGenerator from "@/lib/og-generator";
// import { Day5 } from "../challenge/series/60-days/day-5/page";
import NotFound from "../not-found";
import TiltImage from "@/components/ui/tilt-image";

export default function GenerateImagePage() {
  return (
    <ImageGenerator className="w-fit">
      <TiltImage src="https://framerusercontent.com/images/acwvRTzMz1hmvXG7peXbTrcbGnM.webp?scale-down-to=2048" />
      {/* <Day5 /> */}    
      
    </ImageGenerator>
  );
}
