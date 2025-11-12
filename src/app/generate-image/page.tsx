import ImageGenerator from "@/lib/og-generator";
import DevPage from "../dev/page";

export default function GenerateImagePage() {
  return (
    <ImageGenerator className="w-fit">
      <DevPage />
    </ImageGenerator>
  );
}
