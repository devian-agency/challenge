import Page from "./code";
import type { Metadata } from "next";
import { series, type Series } from "@/contants/60day-series";

const s = series.find((s: Series) => s.title === "Day 8") as Series;
const siteName = s["sub-title"] + " | Devian";
const title = s["sub-title"] + " | Devian";
const description = s.description;
const siteUrl = "https://challenge.devian.com" + s.slug;
const siteImage = s.image;

export const metadata: Metadata = {
  title: siteName,
  description,

  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
    },
  },

  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName,
    images: [
      {
        url: siteImage,
        width: 1024,
        height: 630,
        alt: s["sub-title"],
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: siteUrl,
    creator: "@devian_twt",
    title,
    description,
    images: [siteImage],
  },

  keywords: [
    ...s["sub-title"].split(" ")
  ],

};

export default Page