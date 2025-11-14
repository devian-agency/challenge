import ImageGenerator from "@/lib/og-generator";
import DevPage from "../dev/page";

export default function GenerateImagePage() {
  return (
    <ImageGenerator className="max-w-5xl aspect-video" >
      <DevPage />
    </ImageGenerator>
  );
}
