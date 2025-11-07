import { series, type Series } from "@/contants/60day-series"
import SeriesCard from "@/components/ui/series-card"

export default function Home(){

  return (
    <section className="w-full py-4">
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full justify-center mt-10">
        {
          series.map((s:Series)=> (
            <SeriesCard key={s.slug} series={s} />
          ))
        }
      </div>
    </section>
  )
}