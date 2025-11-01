import Script from "next/script";
import "@/styles/globals.css";
import { meta } from "@/metadata/metadata";
// import Navbar from "@/components/global/navbar";
// import Footer from "@/components/global/footer";
import ImageWrapper from "@/utils/custom-image-wrapper";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";

export const metadata = meta;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Devian Agency",
              url: "https://devian.in/",
              image: "https://devian.in/assets/images/og-image2.webp",
              jobTitle: "Full Stack Web/App Development Agency",
              worksFor: {
                "@type": "Organization",
                name: "Devian",
              },
              sameAs: [
                "https://github.com/devian-agency",
                "https://www.linkedin.com/in/devian-agency/",
                "https://x.com/devian_twt",
                "https://www.instagram.com/devian.agency/",
                "https://www.facebook.com/profile.php?id=61577980919543",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground">
        <header></header>
        <main className="max-w-[1080px] mx-auto">
          <div className="flex flex-col gap-24 md:w-2/3 xl:w-full mx-auto">
            <Suspense fallback={null}>{children}</Suspense>
          </div>
        </main>
        <Toaster position="bottom-right" gutter={8} reverseOrder={false} />
        <Analytics />
        <SpeedInsights />
        <div className="fixed bottom-4 right-4">
          <ImageWrapper
            src={"/logo/logo-transparent.png"}
            className="size-16"
            alt="Challenge Logo"
          />
        </div>
      </body>
    </html>
  );
}
