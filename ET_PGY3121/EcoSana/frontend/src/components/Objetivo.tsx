import styles from "../style";
import { obtenerImagenes } from "../api";
import { useEffect, useState } from "react";

interface Imagen{
  id: number;
  imagen: string;
  nombre: string;
}

const Objetivo = ({ darkMode }: { darkMode: boolean }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);

  return(
  <section
    id="stats-home"
    className={`flex md:flex-row flex-col md:mb-24 lg:mb-32 xl:mb-32 2xl:mb-32 3xl:mb-32 mb-16 3xs:mt-36 mt-0 ${styles.paddingY} ${darkMode ? 'dark' : ''}`}
  >
    <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}>
      <div className="rounded-[20px] overflow-hidden w-[80%] h-[80%] 3xs:block hidden">
        <img src={imagenes[8]?.imagen} alt="Objetivos" className={`w-[100%] h-[100%] object-cover object-center ${darkMode ? 'dark' : ''}`} />
      </div>
      <div className='absolute z-[0] w-[40%] h-[35%] top-0' />
    </div>
    <div className="p-4">
    </div>
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mb-4`}
    >
      <div className="flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-8 font-poppins">
        <span className="text-xs font-bold text-green-500 uppercase">
          Objetivos
        </span>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className={`${styles.heading1D} ${darkMode ? "dark" : ""} `}>
          Nuestras cuatro
        <br />
          principales <span className="hero-text-gradient">EcoMetas</span>
        </h1>
      </div>
      <div className="mt-16">
        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center 3xs:text-left">
              <div>
                <span className={`${styles.heading1C} hero-text-gradient`}>1</span>
              </div>
              <div>
                <h1 className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}>Mantener la esencia</h1>
              </div>
              <div className="mt-4">
                <p className={`${styles.paragraph1C}`}>Aun con nuestra expansion, seguir teniendo un nucleo cercano a la gente</p>
              </div>
            </div>
            <div className="text-center 3xs:text-left">
              <div>
                <span className={`${styles.heading1C} hero-text-gradient`}>2</span>
              </div>
              <div>
                <h1 className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}>EcoSana +Sustentable </h1>
              </div>
              <div className="mt-4">
                <p className={`${styles.paragraph1C}`}>Pretendemos eliminar nuestra huella de carbono, para no contaminar el planeta</p>
              </div>
            </div>
            <div className="text-center 3xs:text-left">
              <div>
                <span className={`${styles.heading1C} hero-text-gradient`}>3</span>
              </div>
              <div>
                <h1 className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}>Elevar la calidad</h1>
              </div>
              <div className="mt-4">
                <p className={`${styles.paragraph1C}`}>Desde la de nuestros productos hasta la de nuestros servicios, todo esto al mismo precio</p>
              </div>
            </div>
            <div className="text-center 3xs:text-left">
              <div>
                <span className={`${styles.heading1C} hero-text-gradient`}>4</span>
              </div>
              <div>
                <h1 className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}>Ser Influyentes</h1>
              </div>
              <div className="mt-4">
                <p className={`${styles.paragraph1C}`}>La convicciones de la comunidad, son las nuestras y planemos llevarlas a donde seamos escuchados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}

export default Objetivo