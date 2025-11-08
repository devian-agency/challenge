import Heading from "@/components/ui/heading";
import P from "@/components/ui/p";
import ImageWrapper from "@/utils/custom-image-wrapper";

export default function NotFound() {
  return (
    <section className="flex justify-center items-center h-full">
      <div className="">
        <ImageWrapper src={"/images/not-found.png"} width={400} className="mix-blend-darken" alt="Not Found Image" />
        <Heading>404 - Not Found</Heading>
        <P>The page you are looking for does not exist.</P>
        
      </div>
    </section>
  );
}