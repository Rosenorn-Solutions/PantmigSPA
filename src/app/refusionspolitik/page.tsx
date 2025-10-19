import type { Metadata } from 'next';
import Link from 'next/link';
import LegalShell from '@/components/Legal/LegalShell';

export const metadata: Metadata = {
  title: 'Refusionspolitik | PantMig',
  description: 'Refusionspolitik for PantMig – donationer kan som udgangspunkt ikke refunderes.',
};

export default function RefundPolicyPage() {
  return (
    <LegalShell title="Refusionspolitik" lastUpdated="05/10/2025" note={<span>Spørgsmål? <Link href='/contact' className='text-primary underline'>Kontakt os</Link>.</span>}>
      <p>
        PantMig er en gratis tjeneste drevet af frivilligt engagement. Eventuelle økonomiske bidrag fra brugere eller
        partnere behandles som donationer til støtte for drift og videreudvikling. Donationer er ikke betaling for en
        vare eller en traditionel serviceydelse og kan derfor som udgangspunkt ikke refunderes.
      </p>
      <h2>Hvornår kan der gøres undtagelser?</h2>
      <p>
        I særlige tilfælde (fx tydelige fejlbeløb eller uautoriserede transaktioner) vil vi naturligvis undersøge sagen
        og kan vælge at tilbageføre beløbet. Kontakt os hurtigst muligt efter transaktionen hvis du mener der er sket
        en fejl.
      </p>
      <h2>Transparens</h2>
      <p>
        Vi arbejder for åbenhed omkring hvordan donationer anvendes til drift, forbedringer og sikkerhed. Vi sælger
        ikke data og vores finansiering bygger ikke på videresalg af brugerinformation.
      </p>
      <h2>Har du spørgsmål?</h2>
      <p>
        Er du i tvivl om noget vedrørende en donation, så <Link href="/contact" className='text-primary underline'>kontakt os</Link>.
      </p>
    </LegalShell>
  );
}
