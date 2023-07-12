import { useState, useEffect } from "react";
import { obtenerImagenes } from "../api";
import styles from "../style";
import { footerLinks, socialMedia } from "../constants";
import { Link } from "react-router-dom";

interface SocialMediaItem {
  id: string;
  icon: string;
  url: string;
}

interface Imagen {
  id: string;
  imagen: string;
  nombre: string;
}

const Footer: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (id: string) => {
    const socialItem = socialMedia.find((social) => social.id === id);
    if (socialItem) {
      window.open(socialItem.url, "_blank");
    }
  };

  return (
    <section
      className={`${styles.flexCenter} ${styles.paddingY} flex-col ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex flex-col justify-start flex-1 mr-10">
          <img
            src={imagenes[1]?.imagen}
            alt="EcoSana"
            className={`w-[266px] h-[72px] object-contain ${
              darkMode ? "dark" : ""
            }`}
          />
          <p
            className={`font-poppins font-regular 3xs:text-[14px] 2xs:text-[16px] xs:text-[16px] sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text=[16px] 2xl:text-[16px] 3xl-[18px] text-[14px] mt-6 max-w-[310px] ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Cultivando el futuro!<br></br>Gracias por su preferencia
          </p>
        </div>
        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerLink) => (
            <div
              key={footerLink.key}
              className="flex flex-col lg:my-0 xl:my-0 2xl:my-0 3xl:my-0 my-2 min-w-[150px]"
            >
              <h4
                className={`font-poppins font-medium text-[18px] leading-[27px] ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {footerLink.title}
              </h4>
              <ul className="mt-4 list-none"></ul>
              <ul>
                {footerLink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } hover:text-green-400 cursor-pointer ${
                      index !== footerLink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    <Link to={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] ${
          darkMode ? "border-t-[#484848]" : "border-t-[#a8a29e]"
        }`}
      >
        <p
          className={`font-poppins font-normal text-center 3xs:text-[18px] text-[16px] leading-[27px] ${
            darkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          2023 EcoSana. Todos los derechos reservados.
        </p>
        <div className="flex flex-row mt-6 md:mt-0">
          {socialMedia.map((social: SocialMediaItem, index: number) => (
            <button
              key={social.id}
              onClick={() => handleClick(social.id)}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
            >
              <img
                src={social.icon}
                alt={social.id}
                style={{ cursor: "pointer" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
