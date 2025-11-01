import type { Metadata } from "next";

const siteName = "Challenge - Devian";
const title = "Challenge - Devian";
const description = "On Challenge we provide access to Devian's UI or functional tasks which is either given by you or personally by Devian.";
const siteUrl = "https://challenge.devian.com";
const siteImage = "/logo/logo-transparent.png";

export const meta: Metadata = {
  title: siteName,
  description,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },

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
        alt: "Preview of a website designed by Devian, a challenge by Devian",
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
    "challenge",
    "devian",
    "challenge by devian",
    "challenge devian",
    "devian challenge",
    "tasks",
    "tasks by devian",
    "tasks devian",
    "devian tasks",
    "website",
    "UI",
    "UI by devian",
    "UI devian",
    "devian UI",
    "design"
  ],
  authors: [{ name: "Devian", url: siteUrl}],
  creator: "Devian",

  manifest: "/site.webmanifest",

  icons: {
    icon: siteImage,
    shortcut: siteImage,
    apple: siteImage,
    other: [{ rel: "icon", url: siteImage }],
  }
};