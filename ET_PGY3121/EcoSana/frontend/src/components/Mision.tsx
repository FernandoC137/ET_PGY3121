import styles from "../style";
import { obtenerImagenes } from "../api";
import { useEffect, useState } from "react";

interface Imagen{
  id: number;
  imagen: string;
  nombre: string;
}

const Mision = ({ darkMode }: { darkMode: boolean }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);

  return (
  <section
    id="mision"
    className={`flex md:flex-row flex-col md:mb-24 lg:mb-24 xl:mb-24 2xl:mb-24 3xl:mb-24 mb-0 mt-8 ${
      styles.paddingY
    } ${darkMode ? "dark" : ""}`}
  >
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mb-4`}
    >
      <div className="flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-8 font-poppins">
        <span className="text-xs font-bold text-green-500 uppercase">
          Mision
        </span>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className={`${styles.heading1D} ${darkMode ? "dark" : ""} `}>
          Elevando la
          <div>
          calidad de vida de
          </div>
          <div>
          gente como <span className="hero-text-gradient">tu</span>
          </div>
        </h1>
      </div>
      <div className="mt-8">
        <div
          className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}
        >
          <h1 className={`${styles.paragraph1A}`}>
          Como Organización nuestro principal objetivo es servir y apoyar a la comunidad a través de nuestras soluciones informaticas brindando apoyo a diversas ONGs sin fines de lucro a lo largo del territorio nacional, elevando la calidad de vida de la población.
          </h1>
        </div>
      </div>
    </div>
    <div className="p-6"></div>
    <div
      className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}
    >
      <div className="rounded-[20px] overflow-hidden w-[100%] h-[70%] 3xs:block hidden">
        <img
          src={imagenes[8]?.imagen}
          alt="Mision"
          className={`w-[100%] h-[100%] object-cover object-center ${
            darkMode ? "dark" : ""
          }`}
        />
      </div>
      <div className="absolute z-[0] w-[40%] h-[35%] top-0" />
    </div>
  </section>
);
}
export default Mision;
