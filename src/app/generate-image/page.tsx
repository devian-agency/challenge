import ImageGenerator from "@/lib/og-generator";
// import { Day5 } from "../challenge/series/60-days/day-5/page";
import NotFound from "../not-found";

export default function GenerateImagePage() {
  return (
    <ImageGenerator className="w-fit px-30 shadow-card">
      <NotFound />
      {/* <Day5 /> */}    
      
    </ImageGenerator>
  );
}
