import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om PantMig – Dansk pant-markedsplads",
  description:
    "Lær hvordan PantMig forbinder folk med pant med lokale indsamlere for en nem og bæredygtig hverdag.",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Om PantMig"
        description="PantMig gør det nemt at komme af med pant – og giver andre muligheden for at tjene lidt ekstra. Så simpelt er det."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
