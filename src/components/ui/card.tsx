import cn from "@/utils/ClassName";
import ImageWrapper from "@/utils/custom-image-wrapper";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  image?: string;
  imgClass?: string;
  heading?: string;
}

export default function Card(
  {
    className,
    image,
    imgClass,
    heading,
    children,
    ...rest
  }: Props
){
  return (
    <div className={cn("flex-1 min-w-80 border border-white shadow-card rounded-3xl p-6", className)} {...rest}>
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-center size-full mx-auto">
          <ImageWrapper src={image || ""} className={cn("object-contain w-3/4 h-full mx-auto", imgClass)} alt={heading || ""} />
        </div>
        <div className="">
          <h3 className="font-instrument-sans text-3xl mt-10 font-semibold text-left">{heading}</h3>
          <p className="font-inter sm:text-lg text-base text-card-text mx-auto text-balance mt-2">
            {children}
          </p>
        </div>
      </div>
    </div>
  )
}
