"use client";
import ImageWrapper from "@/utils/custom-image-wrapper"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

export default function Navigation(){
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
      router.push(`/search/${encodeURIComponent(search)}`);
  }, [search])
  
  return (
    <header>
      <nav className="h-12 w-full flex justify-between items-center gap-4 shadow-soft border border-white px-4">
        <div className="w-1/4">
        <Link href={"/"} className="flex items-center gap-2 w-fit">
          <ImageWrapper src={"/logo/logo-transparent.png"} alt="Challenge's Logo" className="size-8" />
            <h1 className="font-instrument-sans font-medium text-2xl">Challenge</h1>
        </Link>
        </div>
        <div className="w-1/2 h-full hidden md:block">
          <input type="search" onInput={(e: React.ChangeEvent<HTMLInputElement>)=> setSearch(e.target.value)} onChange={(e) => setSearch(e.target.value)} value={search} className="w-full h-full px-4 font-instrument-sans text-xl focus-within:outline-none " placeholder="Search your content here..." />
        </div>
        <div className="1/4">
        <ul className="flex items-center justify-center gap-4 font-instrument-sans">
          <li className="cursor-pointer hover:text-primary font-medium transition-colors duration-300"><Link href={"/about"}>About</Link></li>
          <li className="cursor-pointer hover:text-primary font-medium transition-colors duration-300"><Link href="/contact">Contact</Link></li>
        </ul>
        </div>
      </nav>
      <div className="py-2 block md:hidden px-4">
        <input type="search" className="w-full h-full px-4 font-instrument-sans text-xl focus-within:outline-none " placeholder="Search your content here..." />
      </div>
    </header>
  )
}