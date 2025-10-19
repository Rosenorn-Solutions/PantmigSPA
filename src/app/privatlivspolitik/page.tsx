import type { Metadata } from 'next';
import Link from 'next/link';
import LegalShell from '@/components/Legal/LegalShell';

export const metadata: Metadata = {
  title: 'Privatlivspolitik | PantMig',
  description: 'PantMig privatlivspolitik – vi beskytter dine data og deler dem ikke med tredjeparter til marketing.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell title="Privatlivspolitik" lastUpdated="05/10/2025" note={<span>Har du spørgsmål, så <Link href='/contact' className='text-primary underline'>kontakt os</Link>.</span>}>
      <p>
        Vi tager dit privatliv alvorligt. PantMig indsamler og bruger kun de personoplysninger, der er nødvendige for at
        drive vores gratis tjeneste og forbedre oplevelsen for brugerne. Vi sælger ikke dine data, og vi deler dem ikke
        med tredjeparter til markedsføring.
      </p>
      <h2>Hvilke data indsamler vi?</h2>
      <p>
        Kun de oplysninger du selv giver os (fx kontaktoplysninger) samt begrænsede tekniske log-data, der hjælper os
        med at sikre stabil drift og forebygge misbrug.
      </p>
      <h2>Hvordan bruger vi data?</h2>
      <ul>
        <li>Til at levere og forbedre platformens funktioner.</li>
        <li>Til support og fejlfinding.</li>
        <li>Til sikkerhed og forebyggelse af misbrug.</li>
      </ul>
      <h2>Opbevaring og sikkerhed</h2>
      <p>
        Vi opbevarer data sikkert og kun så længe det er nødvendigt i forhold til formålet. Adgang er begrænset og
        beskyttet. Du kan til enhver tid kontakte os for at få indsigt eller få dine oplysninger slettet.
      </p>
      <h2>Deling med tredjeparter</h2>
      <p>
        Vi deler ikke personoplysninger med tredjeparter til marketing. Leverandører eller hosting-partnere kan have
        teknisk adgang kun for at understøtte driften – de er kontraktligt forpligtet til at beskytte dine data.
      </p>
      <h2>Cookies</h2>
      <p>
        Hvis vi anvender cookies, er det kun til nødvendige funktioner og basale analytics. Vi bruger ikke tracking-
        cookies til annoncering. Du kan blokere cookies i din browser, men visse funktioner kan blive begrænsede.
      </p>
      <h2>Dine rettigheder</h2>
      <p>
        Du kan bede om indsigt, berigtigelse eller sletning af dine oplysninger. Kontakt os hvis du har spørgsmål til
        behandlingen af dine data.
      </p>
    </LegalShell>
  );
}
