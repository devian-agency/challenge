"use client";
import ImageWrapper from "@/utils/custom-image-wrapper";
import Link from "next/link";
import { BookUser, Headset, FolderSearch2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import cn from "@/utils/ClassName";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleSearch = (search: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/search/${search.target.value}`);
  };
  return (
    <header className="relative">
      <nav className="h-12 w-full flex justify-between items-center gap-4 shadow-soft border border-white px-4">
        <div className="w-1/4">
          <Link href={"/"} className="flex items-center gap-2 w-fit">
            <ImageWrapper
              src={"/logo/logo-transparent.png"}
              alt="Challenge's Logo"
              className="size-6 md:size-8"
            />
            <h1 className="font-instrument-sans font-medium text-lg md:text-2xl">
              Challenge
            </h1>
          </Link>
        </div>
        <div className="w-1/2 h-full hidden md:block">
          <input
            type="search"
            onChange={handleSearch}
            className="w-full h-full px-4 font-instrument-sans text-xl focus-within:outline-none "
            placeholder="Search your content here..."
          />
        </div>
        <div className="1/4">
          <ul className="flex items-center justify-center gap-4 font-instrument-sans">
            <Link href={"/about"}>
              <li className="cursor-pointer hover:text-primary font-medium transition-colors duration-300 max-sm:hidden">
                About
              </li>
            </Link>
            <Link href="/contact">
              <li className="cursor-pointer hover:text-primary font-medium transition-colors duration-300 max-sm:hidden">
                Contact
              </li>
            </Link>
            <li
              onClick={() => setOpen(!open)}
              className="cursor-pointer hover:text-primary font-medium transition-colors duration-300 sm:hidden"
            >
              <FolderSearch2 className={open ? "text-primary" : ""} size={22} />
            </li>
            <Link href="/about">
              <li className="cursor-pointer hover:text-primary font-medium transition-colors duration-300 sm:hidden">
                <BookUser size={20} />
              </li>
            </Link>
            <Link href="/contact">
              <li className="cursor-pointer hover:text-primary font-medium transition-colors duration-300 sm:hidden">
                <Headset size={20} />
              </li>
            </Link>
          </ul>
        </div>
      </nav>
      <div className={cn("absolute py-2 md:hidden px-4 -top-12 -z-10 opacity-0 transition-all duration-300", open && "top-12 opacity-100 z-998 bg-background w-full")}>
        <input
          type="search"
          onChange={handleSearch}
          className="w-full h-full px-4 font-instrument-sans text-xl focus-within:outline-none "
          placeholder="Search your content here..."
        />
      </div>
    </header>
  );
}
