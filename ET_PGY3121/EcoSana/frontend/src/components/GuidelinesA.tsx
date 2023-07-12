import { useState, useEffect } from "react";
import { obtenerImagenes } from "../api";
import styles from "../style";

interface Imagen {
  id: number;
  imagen: string;
  nombre: string;
}

const GuidelinesA = ({ darkMode }: { darkMode: boolean }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section
      id="guidelinesA"
      className={`flex md:flex-row flex-col mb-0 mt-28 ${
        styles.paddingY
      } ${darkMode ? "dark" : ""}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mb-4`}
      >
        <div className="flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-8 font-poppins">
          <span className="text-xs font-bold text-green-500 uppercase">
            T&C
          </span>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className={`${styles.heading1D} ${darkMode ? "dark" : ""} `}>
            Responsabilidad
            <div>
              del<span className="hero-text-gradient"> Usuario</span>
            </div>
          </h1>
        </div>
        <div className="mt-8">
          <div
            className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}
          >
            <h1 className={`${styles.paragraph1A}`}>
              Al utilizar los servicios y productos ofrecidos por EcoSana, el
              usuario acepta asumir la responsabilidad de utilizar adecuadamente
              los productos adquiridos. EcoSana no se hace responsable de los
              daños o lesiones que puedan resultar del uso inapropiado de los
              productos. Se recomienda seguir las instrucciones de uso,
              precauciones y recomendaciones proporcionadas por los fabricantes
              de los productos y buscar asesoramiento especializado en caso de
              dudas sobre su uso seguro.
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
};

export default GuidelinesA;
