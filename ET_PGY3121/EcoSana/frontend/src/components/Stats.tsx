import styles from "../style";
import { obtenerImagenes } from "../api";
import { useEffect, useState } from "react";

interface Imagen{
  id: number;
  imagen: string;
  nombre: string;
}

const Stats = ({ darkMode }: { darkMode: boolean }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);

  return(
  <section
    id="stats-home"
    className={`flex md:flex-row flex-col md:mb-24 lg:mb-24 xl:mb-24 2xl:mb-24 3xl:mb-24 mb-0 mt-32 ${styles.paddingY} ${darkMode ? 'dark' : ''}`}
  >
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mb-4`}
    >
      <div className="flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-8 font-poppins">
        <span className="text-xs font-bold text-green-500 uppercase">
          Stats
        </span>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className={`${styles.heading1D} ${darkMode ? "dark" : ""} `}>
          Nuestras Cifras
          <div className="mt-6">
            <h2 className={`${styles.heading2C}`}>
              Los ultimos reportes acerca de los avances que EcoSana ha logrado.
            </h2>
          </div>
        </h1>
      </div>
      <div className="mt-16">
        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div>
                <span className={`${styles.heading1C} hero-text-gradient`}>20+</span>
              </div>
              <div>
                <h1 className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}>Sponsors</h1>
              </div>
              <div className="mt-4">
                <p className={`${styles.paragraph1C}`}>Que quieren formar parte de nuestra causa.</p>
              </div>
            </div>
            <div className="text-center">
              <div>
                <span className={`${styles.heading1C} hero-text-gradient`}>20+</span>
              </div>
              <div>
                <h1 className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}>Proyectos</h1>
              </div>
              <div className="mt-4">
                <p className={`${styles.paragraph1C}`}>Los cuales avanzan de manera agil.</p>
              </div>
            </div>
            <div className="text-center">
              <div>
                <span className={`${styles.heading1C} hero-text-gradient`}>+50K</span>
              </div>
              <div>
                <h1 className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}>Clientes cada mes</h1>
              </div>
              <div className="mt-4">
                <p className={`${styles.paragraph1C}`}>Que confian en nosotros.</p>
              </div>
            </div>
            <div className="text-center">
              <div>
                <span className={`${styles.heading1C} hero-text-gradient`}>5.000</span>
              </div>
              <div>
                <h1 className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}>Miembros</h1>
              </div>
              <div className="mt-4">
                <p className={`${styles.paragraph1C}`}>Que aportan activamente de manera voluntaria.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4">
    </div>
    <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}>
      <div className="rounded-[20px] overflow-hidden w-[80%] h-[80%]">
        <img src={imagenes[8]?.imagen} alt="EcoSanaH" className={`w-[100%] h-[100%] object-cover object-center ${darkMode ? 'dark' : ''}`} />
      </div>
      <div className='absolute z-[0] w-[40%] h-[35%] top-0' />
    </div>
  </section>
);
}
export default Stats;
