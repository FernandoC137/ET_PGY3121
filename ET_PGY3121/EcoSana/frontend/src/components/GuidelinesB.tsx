import { useState, useEffect } from "react";
import { obtenerImagenes } from "../api";
import styles from "../style";

interface Imagen {
  id: number;
  imagen: string;
  nombre: string;
}

const GuidelinesB = ({ darkMode }: { darkMode: boolean }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section
      id="mision"
      className={`flex md:flex-row flex-col md:mb-24 lg:mb-24 xl:mb-24 2xl:mb-24 3xl:mb-24 mb-0 mt-0 ${
        styles.paddingY
      } ${darkMode ? "dark" : ""}`}
    >
      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}
      >
        <div className="rounded-[20px] overflow-hidden w-[100%] h-[70%] 3xs:block hidden">
          <img
            src={imagenes[9]?.imagen}
            alt="Vision"
            className={`w-[100%] h-[100%] object-cover object-center ${
              darkMode ? "dark" : ""
            }`}
          />
        </div>
        <div className="absolute z-[0] w-[40%] h-[35%] top-0" />
      </div>

      <div className="p-6"></div>

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
            <div>
              <h1>Privacidad y</h1>
            </div>
            <div>
              <h1>
                <span className="hero-text-gradient">Datos </span> del usuario
              </h1>
            </div>
          </h1>
        </div>
        <div className="mt-8">
          <div
            className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}
          >
            <h1 className={`${styles.paragraph1A}`}>
              En EcoSana valoramos la privacidad y protección de los datos
              personales de nuestros usuarios. Al utilizar nuestro sitio web y
              servicios, el usuario acepta nuestra Política de Privacidad, que
              describe cómo recopilamos, utilizamos, almacenamos y protegemos la
              información personal. La información del usuario, se utilizará únicamente
              para procesar y entregar los pedidos, así como para brindar un
              mejor servicio. No compartiremos ni venderemos
              información personal a terceros.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidelinesB;
