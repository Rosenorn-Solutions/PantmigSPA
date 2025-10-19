import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    slug: "panten-klar-paa-2-minutter",
    title: "Sådan gør du panten klar på 2 minutter",
    paragraph:
      "Hurtige tips til at sortere og opbevare dåser og flasker, så afhentningen går som en leg.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "PantMig Team",
      image: "/images/blog/auth-03.svg",
      designation: "Pant & genbrug",
    },
    tags: ["tips"],
    publishDate: "12. jan. 2025",
    content: [
      "Pant kan hurtigt fylde – men med få rutiner kan du spare tid og undgå lugt.",
      "Skyl flasker og dåser hurtigt efter brug, og lad dem dryppe af.",
      "Saml panten ét sted tæt på køkkenet, så alle husker det.",
      "Brug en pose eller kurv, som let kan hentes – også af en indsamler.",
      "Aftal en fast dag til aflevering eller bestil afhentning via PantMig.",
    ],
  },
  {
    id: 2,
    slug: "god-pant-etikette",
    title: "Hvad er god pant-etikette?",
    paragraph:
      "Små ting der gør stor forskel, når du møder din indsamler – for begge parter.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "PantMig Team",
      image: "/images/blog/auth-02.svg",
      designation: "Pant & genbrug",
    },
    tags: ["etikette"],
    publishDate: "20. feb. 2025",
    content: [
      "Vær klar til tiden og stil posen et tydeligt sted.",
      "Skriv en kort besked, hvis noget kræver opmærksomhed (glas, store mængder osv.).",
      "Pak panten så den er nem at bære – og sig gerne tak for hjælpen.",
    ],
  },
  {
    id: 3,
    slug: "tjene-paa-pant",
    title: "Hvor meget kan man egentlig tjene på pant?",
    paragraph:
      "Vi regner på scenarier fra en enkelt pose til større arrangementer.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "PantMig Team",
      image: "/images/blog/auth-03.svg",
      designation: "Pant & genbrug",
    },
    tags: ["økonomi"],
    publishDate: "05. mar. 2025",
    content: [
      "En almindelig bærepose kan ofte indeholde pant for 30–70 kr., afhængigt af størrelse og blanding.",
      "Ved større arrangementer kan beløbet hurtigt løbe op – organisér indsamlere og afhentning for at maksimere værdien.",
      "Husk at tiden også er penge: Hvis du ikke når at aflevere, kan PantMig hjælpe med hurtig afhentning.",
    ],
  },
];
export default blogData;
