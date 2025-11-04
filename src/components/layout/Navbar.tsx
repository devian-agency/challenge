import ImageWrapper from "@/utils/custom-image-wrapper"
import Link from "next/link"

export default function Navigation(){
  return (
    <header>
      <nav className="h-12 w-full flex justify-between items-center gap-4 shadow-soft border border-white px-4">
        <div className="w-1/4 flex items-center gap-2">
        <ImageWrapper src={"/logo/logo-transparent.png"} alt="Challenge's Logo" className="size-8" />
          <h1 className="font-instrument-sans font-medium text-2xl">Challenge</h1>
        </div>
        <div className="w-1/2 h-full">
          <input type="search" className="w-full h-full px-4 font-instrument-sans text-xl focus-within:outline-none " placeholder="Search your content here..." />
        </div>
        <div className="1/4">
        <ul className="flex items-center justify-center gap-4 font-instrument-sans">
          <li className="cursor-pointer hover:text-primary font-medium transition-colors duration-300"><Link href={"/about"}>About</Link></li>
          <li className="cursor-pointer hover:text-primary font-medium transition-colors duration-300"><Link href="/contact">Contact</Link></li>
        </ul>
        </div>
      </nav>
    </header>
  )
}