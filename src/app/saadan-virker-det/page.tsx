import Breadcrumb from "@/components/Common/Breadcrumb";
import SectionTitle from "@/components/Common/SectionTitle";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sådan virker det | PantMig",
	description:
		"Se hvordan PantMig forbinder folk med pant med lokale indsamlere i fire enkle trin.",
	alternates: {
		canonical: "/saadan-virker-det",
		languages: {
			da: "/saadan-virker-det",
			en: "/how-it-works",
		},
	},
};

export default function SaadanVirkerDetPage() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://pantmig.dk/' },
							{ '@type': 'ListItem', position: 2, name: 'Sådan virker det', item: 'https://pantmig.dk/saadan-virker-det' },
						],
					}),
				}}
			/>
			<Breadcrumb
				pageName="Sådan virker det"
				description="Fra opslag til overlevering – sådan fungerer PantMig på få minutter."
			/>

			<section className="py-16 md:py-20 lg:py-28">
				<div className="container">
					<SectionTitle
						title="Kom i gang på 4 trin"
						paragraph="PantMig er lavet til hverdagen. Ingen bøvl, bare pant der kommer retur."
						center
					/>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						<div className="rounded-xs bg-white p-6 shadow-three dark:bg-gray-dark">
							<div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							</div>
							<h3 className="mb-2 text-xl font-bold text-black dark:text-white">1. Opret opslag</h3>
							<p className="text-body-color dark:text-body-color-dark">Beskriv panten kort, hvor du er, og hvornår det passer.</p>
						</div>
						<div className="rounded-xs bg-white p-6 shadow-three dark:bg-gray-dark">
							<div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 2l2.39 4.84L20 8l-4 3.9.95 5.53L12 15.9l-4.95 1.53L8 11.9 4 8l5.61-1.16L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
								</svg>
							</div>
							<h3 className="mb-2 text-xl font-bold text-black dark:text-white">2. Match lokalt</h3>
							<p className="text-body-color dark:text-body-color-dark">Vi viser dit opslag til indsamlere i nærheden.</p>
						</div>
						<div className="rounded-xs bg-white p-6 shadow-three dark:bg-gray-dark">
							<div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M8 7h8M6 11h12M9 15h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							</div>
							<h3 className="mb-2 text-xl font-bold text-black dark:text-white">3. Aftal afhentning</h3>
							<p className="text-body-color dark:text-body-color-dark">Brug chatten til at aftale tidspunkt og mødested.</p>
						</div>
						<div className="rounded-xs bg-white p-6 shadow-three dark:bg-gray-dark">
							<div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M20 7l-9 9-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</div>
							<h3 className="mb-2 text-xl font-bold text-black dark:text-white">4. Bekræft overlevering</h3>
							<p className="text-body-color dark:text-body-color-dark">Sig hej, aflever poserne og bekræft i appen – færdig!</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
