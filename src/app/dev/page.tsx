"use client";
import Card from "@/components/ui/card";

export default function DevPage() {

  return (
    <section className="max-w-7xl mx-auto h-full flex items-center gap-4">
      <Card heading="Smart AI focus" image="/images/challenge/series/60-days/day-9/image1.avif">
        Devian shows what to focus on — based on your goals and pace.
      </Card>
      <Card heading="Track your progress" image="/images/challenge/series/60-days/day-9/image2.avif">
        Track what’s done, what’s next — all in one dashboard.
      </Card>
      <Card className="h-92" heading="Never miss tasks" image="/images/challenge/series/60-days/day-9/image3.avif">
      Calendar view of upcoming tasks, so you never miss a thing.
      </Card>
    </section>
  );
}
