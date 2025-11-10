"use client";
import cn from "@/utils/ClassName";
import { useState, useEffect } from "react";
import Scroller from "@/components/ui/infinite-scroller";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DevPage() {
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [weekday, setWeekday] = useState<string>("");
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [ampm, setAmpm] = useState<string>("AM");

  useEffect(() => {
    const now = new Date();
    setMonth(months[now.getMonth()]);
    setYear(now.getFullYear());
    setDay(now.getDate());
    setWeekday(days[now.getDay()]);
    setHour(now.getHours());
    setMinute(now.getMinutes());
    setAmpm(now.getHours() >= 12 ? "PM" : "AM");
  }, []);

  return (
    <section className="relative h-full w-full flex flex-col items-center justify-center">
      <div className="absolute top-4 left-4 text-sm space-y-1">
        <p>Year: {year}</p>
        <p>Month: {month}</p>
        <p>Day: {day}</p>
        <p>Weekday: {weekday}</p>
        <p>Hour: {hour}</p>
        <p>Minute: {minute}</p>
        <p>AM/PM: {ampm}</p>
      </div>

      <div className="flex gap-8 items-center justify-center">
        {/* Date group */}
        <div className="flex gap-2">
          <Scroller items={days} value={weekday} onChange={setWeekday} />
          <Scroller items={months} value={month} onChange={setMonth} />
          <Scroller items={Array.from({ length: 31 }, (_, i) => i + 1)} value={day} onChange={setDay} />
          <Scroller items={Array.from({ length: 12 }, (_, i) => 2020 + i)} value={year} onChange={setYear} />
        </div>

        {/* Time group */}
        <div className="flex gap-2">
          <Scroller items={Array.from({ length: 12 }, (_, i) => i + 1)} value={hour % 12 || 12} onChange={setHour} />
          <Scroller
            items={Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i))}
            value={minute}
            onChange={setMinute}
          />
          <Scroller items={["AM", "PM"]} infinite={false} value={ampm} onChange={setAmpm} />
        </div>
      </div>
    </section>
  );
}
