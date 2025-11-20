import ImageGenerator from "@/lib/og-generator";
import DevPage from "../dev/page";

export default function GenerateImagePage() {
  return (
    <ImageGenerator className="h-screen" >
      <DevPage />
    </ImageGenerator>
  );
}
