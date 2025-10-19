import type { Metadata } from 'next';
import Link from 'next/link';
import LegalShell from '@/components/Legal/LegalShell';

export const metadata: Metadata = {
  title: 'Vilkår for brug | PantMig',
  description: 'Vilkår for brug af PantMig – ansvar, anvendelse og begrænsninger for den gratis tjeneste.',
};

export default function TermsPage() {
  return (
    <LegalShell title="Vilkår for brug" lastUpdated="05/10/2025">
      <p>
        Disse vilkår regulerer din brug af PantMig. Ved at anvende platformen accepterer du vilkårene. Tjenesten er
        gratis og stilles til rådighed som-is uden garanti for tilgængelighed eller nøjagtighed. Formålet er at
        forbinde personer med pant med lokale indsamlere.
      </p>
      <h2>1. Brug af tjenesten</h2>
      <ul>
        <li>Du må ikke misbruge platformen eller forsøge at omgå sikkerhed.</li>
        <li>Indhold og branding må ikke kopieres uden tilladelse.</li>
        <li>Du er selv ansvarlig for de oplysninger du indsender.</li>
      </ul>
      <h2>2. Ansvarsbegrænsning</h2>
      <p>
        PantMig påtager sig ikke ansvar for tab, indirekte skade eller følgeskader opstået ved brug af tjenesten.
        Drift kan afbrydes, ændres eller nedlukkes uden varsel.
      </p>
      <h2>3. Brugerdata og privatliv</h2>
      <p>
        Behandling af personoplysninger sker jf. vores <Link href="/privatlivspolitik" className="text-primary underline">privatlivspolitik</Link>. Vi sælger ikke data.
      </p>
      <h2>4. Donationer</h2>
      <p>
        Frivillige bidrag betragtes som donationer til drift og udvikling og er ikke betaling for en ydelse. Se
        <Link href="/refusionspolitik" className="text-primary underline"> refusionspolitikken</Link> for detaljer.
      </p>
      <h2>5. Ændringer af vilkår</h2>
      <p>
        Vi kan opdatere vilkårene når som helst. Væsentlige ændringer kommunikeres ved opdateret dato og evt. kort
        meddelelse. Fortsat brug efter ændringer udgør accept.
      </p>
      <h2>6. Kontakt</h2>
      <p>
        Spørgsmål til disse vilkår kan rettes via <Link href="/contact" className="text-primary underline">kontaktformularen</Link>.
      </p>
    </LegalShell>
  );
}
