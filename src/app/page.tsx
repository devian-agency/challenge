import { series, type Series } from "@/contants/60day-series"
import { Github, Twitter } from "lucide-react"
import ImageWrapper from "@/utils/custom-image-wrapper"
import Link from "next/link"

export default function Home(){

  return (
    <section className="w-full py-4">
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full justify-center md:justify-start">
        {
          series.map((s:Series)=> (
            <Card key={s.slug} series={s} />
          ))
        }
      </div>
    </section>
  )
}

function Card({series}: {series: Series}){
  return (
    <div className="shadow-card border border-white w-110 rounded-xl overflow-hidden">
      <div className="size-full h-96 bg-background">
        <ImageWrapper src={series.image || ""} className="w-full h-full mix-blend-darken object-contain" alt={series.title} />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div className="">
          <h2 className="text-2xl text-balance font-bold mb-2 hover:underline underline-offset-2"><Link href={series.slug}>{series.title}</Link></h2>
          <h3 className="text-xl text-balance font-semibold mb-2 pb-2 border-b-2 border-border"><Link href={series.slug}>{series["sub-title"]}</Link></h3>
          <p className="text-sm text-card-text mb-4">{series.description}</p>
        </div>
        <div className="">
          <h3 className="text-heading border-b-2 border-border pb-2 font-semibold text-2xl">Challenger</h3>
          <div className="text-sm text-icon p-2">
            <div className="flex items-center gap-2 text-xl text-foreground">
              {series.by?.profile && 
                <ImageWrapper src={series.by.profile || ""} className="size-10 object-contain rounded-full" alt={series.by.name} />
              }
              <h3 className="text-balance">{series.by.name}</h3>
            </div>
            <div className="flex items-center gap-4 my-2 ml-12">
              {series.by?.github && 
                <Link href={series.by.github} target="_blank" rel="noopener noreferrer">
                  <Github className="text-icon hover:text-foreground transition-colors duration-300" />
                </Link>
              }
              {series.by?.twitter && 
                <Link href={series.by.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="text-icon hover:text-foreground transition-colors duration-300" />
                </Link>
              }
            </div>
            <div className="flex  justify-between gap-2 mt-2">
              <p className="">Challenged On: <span className="text-card-text whitespace-nowrap">{series.challengedOn}</span></p>
              {series.completedOn && <p>Completed On: <span className="text-card-text whitespace-nowrap">{series.completedOn}</span></p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}