import { facebook, linkedin, twitter, instagram } from "../assets";
import { NavLink } from "./types";

export const navLinks : NavLink[] = [
    {
      id: "Home",
      title: "Home",
      external: true,
      url:"/"
    },
    {
      id: "SobreNosotros",
      title: "Sobre Nosotros",
      external: true,
      url:"/SobreNosotros"
    },
    {
      id: "Tienda",
      title: "Tienda",
      external: true,
      url:"/Tienda"
    },
    {
      id: "Galeria",
      title: "Galeria",
      external: true,
      url:"/Galeria"
    },
  ];

  export const footerLinks = [
    {
      key: 1,
      title: "Links Utiles",
      links: [
        {
          name: "Sobre Nosotros",
          link: "/SobreNosotros",
        },
        {
          name: "Galeria",
          link: "/Galeria",
        },
        {
          name: "Servicios",
          link: "#",
        },
        {
          name: "Contacto",
          link: "/Contacto",
        },
        {
          name: "EcoSana T&C",
          link: "/Terms",
        },
      ],
    },
    {
      key: 2,
      title: "Para Clientes",
      links: [
        {
          name: "Blog",
          link: "#",
        },
        {
          name: "Newsletter",
          link: "#",
        },
        {
          name: "Centro de Ayuda",
          link: "#",
        },
        {
          name: "Soporte de Tienda",
          link: "#",
        },
        {
          name: "Trabaja en EcoSana",
          link: "#",
        },
      ],
    },
    {
      key: 3,
      title: "Para Empresas",
      links: [
        {
          name: "Marcas Asociadas",
          link: "#",
        },
        {
          name: "Se un EcoSponsor",
          link: "#",
        },
      ],
    },
  ];
  
  
  export const socialMedia = [
    {
      id: 'social-media-1',
      icon: instagram,
      url: 'https://www.instagram.com/',
    },
    {
      id: 'social-media-2',
      icon: facebook,
      url: 'https://www.facebook.com/',
    },
    {
      id: 'social-media-3',
      icon: twitter,
      url: 'https://www.twitter.com/',
    },
    {
      id: 'social-media-4',
      icon: linkedin,
      url: 'https://www.linkedin.com/',
    },
  ];