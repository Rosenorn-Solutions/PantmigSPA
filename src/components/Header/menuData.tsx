import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Forside",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Om PantMig",
    path: "/about",
    newTab: false,
  },
  {
    id: 22,
    title: "Sådan virker det",
    path: "/how-it-works",
    newTab: false,
  },
  {
    id: 33,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
  {
    id: 3,
    title: "Kontakt",
    path: "/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Sider",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Om PantMig",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "Kontakt",
        path: "/contact",
        newTab: false,
      },
      {
        id: 43,
        title: "Blog (grid)",
        path: "/blog",
        newTab: false,
      },
      {
        id: 49,
        title: "Sådan virker det",
        path: "/how-it-works",
        newTab: false,
      },
      {
        id: 44,
        title: "Blog (sidebar)",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 45,
        title: "Blogindlæg",
        path: "/blog-details",
        newTab: false,
      },
      {
        id: 46,
        title: "Log ind",
        path: "/signin",
        newTab: false,
      },
      {
        id: 47,
        title: "Opret profil",
        path: "/signup",
        newTab: false,
      },
      {
        id: 48,
        title: "Fejlside",
        path: "/error",
        newTab: false,
      },
    ],
  },
];
export default menuData;
