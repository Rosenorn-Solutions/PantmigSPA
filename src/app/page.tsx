import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PantMig – Få pant væk, giv andre en skilling",
  description:
    "PantMig forbinder danskere med pant med lokale indsamlere – nem afhentning, fair belønning og klimavenligt.",
  openGraph: {
    title: "PantMig – Få pant væk, giv andre en skilling",
    description:
      "PantMig forbinder danskere med pant med lokale indsamlere – nem afhentning, fair belønning og klimavenligt.",
  },
  twitter: {
    title: "PantMig – Få pant væk, giv andre en skilling",
    description:
      "PantMig forbinder danskere med pant med lokale indsamlere – nem afhentning, fair belønning og klimavenligt.",
  },
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}
