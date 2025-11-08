"use client";
import Button from "../ui/button";
import useSize from "@/hooks/use-size";
import Link from "next/link";

export default function Sidebar() {
  const size = useSize();
  return (
    <aside className="md:w-96 w-full md:h-[calc(100vh-3rem)] overflow-y-auto md:shadow-card border border-white scrollbar-none">
      <ul className="flex md:flex-col flex-row gap-4 justify-start md:h-[calc(100vh-3rem)] px-4 py-4 overflow-auto scrollbar-transparent">
        <p className="mt-4 text-icon px-4 text-center max-md:hidden border-b-2 border-border pb-4">Series</p>
        <Link href="/" className="flex">
          <Button
            variant={size <= 768 ? "light" : "dark"}
            text="60 Days Challenge"
            className="md:mx-auto md:w-6/7 max-h-11 rounded-lg py-0 px-2 max-md:text-xs min-w-32"
          />
        </Link>
      </ul>
    </aside>
  );
}
