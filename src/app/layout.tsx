import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://pantmig.dk"),
  title: {
    default: "PantMig – Få pant væk, giv andre en skilling",
    template: "%s | PantMig",
  },
  description:
    "PantMig forbinder danskere med pant med lokale indsamlere – nem afhentning, fair belønning og klimavenligt.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/icon.svg" }],
  },
  openGraph: {
    type: "website",
    siteName: "PantMig",
    url: "https://pantmig.dk",
    title: "PantMig – Få pant væk, giv andre en skilling",
    description:
      "PantMig forbinder danskere med pant med lokale indsamlere – nem afhentning, fair belønning og klimavenligt.",
    images: [{ url: "/og" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PantMig – Få pant væk, giv andre en skilling",
    description:
      "PantMig forbinder danskere med pant med lokale indsamlere – nem afhentning, fair belønning og klimavenligt.",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html suppressHydrationWarning lang="da">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";

