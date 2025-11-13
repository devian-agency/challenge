import ImageGenerator from "@/lib/og-generator";
import DevPage from "../dev/page";

export default function GenerateImagePage() {
  return (
    <ImageGenerator className="w-150 h-150 ">
      <DevPage />
    </ImageGenerator>
  );
}
