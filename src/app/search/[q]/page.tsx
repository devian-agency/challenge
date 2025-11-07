"use client";
import {
  series,
  type Series,
  type Code as CodeType,
} from "@/contants/60day-series";
import SeriesCard from "@/components/ui/series-card";
import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import P from "@/components/ui/p";
import Heading from "@/components/ui/heading";

export default function Home() {
  const searchParams = useSearchParams();
  const params = useParams();
  const query = useMemo(
    () => decodeURIComponent(params.q as string).trim(),
    [params]
  );
  const filteredSeries = useMemo(() => {
    if (query) {
      return series.filter((s: Series) => {
        if (s.title.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        if (s.description.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        if (s.slug.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        if (s.challengedOn.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        if (s.completedOn?.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        if (s["sub-title"]?.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        if (s.by.name.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        if (s.by.twitter?.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        if (s.by.github?.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        if (
          Array.isArray(s.code) &&
          s.code.some((c: CodeType) => {
            if (c.filename.toLowerCase().includes(query.toLowerCase())) {
              return true;
            }
            if (c.path.toLowerCase().includes(query.toLowerCase())) {
              return true;
            }
            if (c.lang.toLowerCase().includes(query.toLowerCase())) {
              return true;
            }
            if (c.heading?.toLowerCase().includes(query.toLowerCase())) {
              return true;
            }
            if (c.before?.toLowerCase().includes(query.toLowerCase())) {
              return true;
            }
            if (c.after?.toLowerCase().includes(query.toLowerCase())) {
              return true;
            }
          })
        ) {
          return true;
        } else {
          if (
            (s.code as CodeType).filename
              ?.toLowerCase()
              .includes(query.toLowerCase())
          ) {
            return true;
          }
          if (
            (s.code as CodeType).path
              ?.toLowerCase()
              .includes(query.toLowerCase())
          ) {
            return true;
          }
          if (
            (s.code as CodeType).lang
              ?.toLowerCase()
              .includes(query.toLowerCase())
          ) {
            return true;
          }
          if (
            (s.code as CodeType).heading
              ?.toLowerCase()
              .includes(query.toLowerCase())
          ) {
            return true;
          }
          if (
            (s.code as CodeType).before
              ?.toLowerCase()
              .includes(query.toLowerCase())
          ) {
            return true;
          }
          if (
            (s.code as CodeType).after
              ?.toLowerCase()
              .includes(query.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
    }
    return false;
  }, []);
  return (
    <section className="w-full py-4">
        {filteredSeries && filteredSeries.length > 0 && 
      <div className="">
        <Heading as="h1" className="">
          Search Result{filteredSeries && filteredSeries.length > 1 && "s"} for
        </Heading>
        <Heading>
          {filteredSeries && query}
        </Heading>
      </div>
        }
      {filteredSeries && filteredSeries.length === 0
        ? <Heading>No Component found</Heading>
        : filteredSeries && <P>{filteredSeries.length} Component{filteredSeries.length > 1 && "s"} found</P>}
      <div className="flex flex-wrap gap-x-4 gap-y-8 w-full justify-center mt-10">
        {filteredSeries &&
          filteredSeries.map((s: Series) => (
            <SeriesCard key={s.slug} series={s} />
          ))}
      </div>
    </section>
  );
}
