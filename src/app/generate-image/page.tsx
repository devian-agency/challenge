import ImageGenerator from "@/lib/og-generator";
import ListScrolling from "@/components/ui/list-scrolling";

export default function GenerateImagePage() {
  return (
    <ImageGenerator className="w-fit">
      <ListScrolling />
    </ImageGenerator>
  );
}
