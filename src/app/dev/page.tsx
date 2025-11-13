"use client";
import { useState } from "react";
import Notifications from "@/components/ui/notifications";
import { Bell } from "lucide-react";

export default function DevPage() {
  const [open, setOpen] = useState(false);
  return (
    <section className="max-w-7xl w-96 relative flex items-center justify-end h-12 mt-16">
      <span><Bell className={open ? "fill-foreground cursor-pointer" : "cursor-pointer hover:fill-foreground "} onClick={() => setOpen(!open)} size={24}/></span>
      <Notifications open={open} setOpen={setOpen} />
    </section>
  );
}
