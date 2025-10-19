import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import CookieNotice from "@/components/Common/CookieNotice";
// Global stylesheet (Tailwind v4 + custom theme tokens)
import "../styles/index.css";
import { Inter } from "next/font/google";
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
  keywords: [
    "pant", "pantsortering", "pant afhentning", "flaskepant", "genbrug", "indsamling", "miljø", "klima", "pantmig",
  ],
  manifest: "/manifest.json",
  icons: {
    // Using existing assets; if dedicated favicons are needed generate 32x32 & 16x16 variants later
    icon: [
      { url: "/images/logo/logo-light.svg", type: "image/svg+xml" },
      { url: "/images/logo/logo-light.png", type: "image/png" }
    ],
    shortcut: ["/images/logo/logo-light.png"],
    apple: [
      { url: "/images/logo/logo-light.png" }
    ],
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
  <html suppressHydrationWarning lang="da">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <meta name="apple-mobile-web-app-title" content="PantMig" />
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PantMig',
              url: 'https://pantmig.dk',
              logo: 'https://pantmig.dk/images/logo/logo-light.png',
              sameAs: [
                // Add social profiles when available
              ],
            }),
          }}
        />
        {/* WebSite JSON-LD with potentialAction for Sitelinks Search Box (if search added later) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'PantMig',
              url: 'https://pantmig.dk',
            }),
          }}
        />
      </head>

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          <CookieNotice />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";

