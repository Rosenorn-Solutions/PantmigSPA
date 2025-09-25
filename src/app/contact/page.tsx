import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | PantMig",
  description: "Kontakt PantMig – vi hjælper gerne med spørgsmål og feedback.",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Kontakt"
        description="Har du et spørgsmål, en idé eller en fejl at rapportere? Skriv til os her."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
