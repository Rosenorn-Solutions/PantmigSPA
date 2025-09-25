import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Sådan gør du panten klar på 2 minutter",
    paragraph:
      "Hurtige tips til at sortere og opbevare dåser og flasker, så afhentningen går som en leg.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Samuyl Joshi",
      image: "/images/blog/author-03.png",
      designation: "Graphic Designer",
    },
    tags: ["creative"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Hvad er god pant-etikette?",
    paragraph:
      "Små ting der gør stor forskel, når du møder din indsamler – for begge parter.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Musharof Chy",
      image: "/images/blog/author-02.png",
      designation: "Content Writer",
    },
    tags: ["computer"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Hvor meget kan man egentlig tjene på pant?",
    paragraph:
      "Vi regner på scenarier fra en enkelt pose til større arrangementer.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Lethium Deo",
      image: "/images/blog/author-03.png",
      designation: "Graphic Designer",
    },
    tags: ["design"],
    publishDate: "2025",
  },
];
export default blogData;
