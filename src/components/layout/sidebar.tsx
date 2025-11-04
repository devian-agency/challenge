"use client";
import Button from "../ui/button";
import useSize from "@/hooks/use-size";

export default function Sidebar() {
  const size = useSize();
  return (
    <aside className="md:w-96 w-full md:min-h-screen md:shadow-card border border-white">
      <ul className="flex md:flex-col flex-row gap-4 justify-start md:min-h-screen px-4 py-4 overflow-x-auto scrollbar-none">
        <p className="mt-4 text-icon px-4 text-center max-md:hidden border-b-2 border-border pb-4">Series</p>
        <Button
          variant={size <= 768 ? "light" : "dark"}
          text="60 Days Challenge"
          className="md:mx-auto md:w-6/7 rounded-lg py-0 px-2"
        />
      </ul>
    </aside>
  );
}
