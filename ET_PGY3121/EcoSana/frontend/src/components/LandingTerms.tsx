import styles from "../style";
import { motion } from "framer-motion";
import { obtenerImagenes } from "../api";
import { useState, useEffect } from "react";

interface Imagen {
    id: number;
    imagen: string;
    nombre: string;
  }  

const LandingTerms = ({ darkMode }: { darkMode: boolean }) => {
    const [imagenes, setImagenes] = useState<Imagen[]>([]);

    useEffect(() => {
      obtenerImagenes()
        .then((data) => setImagenes(data))
        .catch((error) => console.log(error));
    }, []);

  return (
    <section
      id="landingTerms"
      className={`flex xl:flex-row flex-col mt-16 ${
        styles.paddingY
      } ${darkMode ? "dark" : ""}`}
    >
      <div
        className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="mt-2 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex-1 font-poppins font-bold 3xs:text-[44px] 2xs:text-[52px] xs:text-[60px] sm:text-[68px] md:text-[68px] lg:text-[68px] xl:text-[68px] 2xl:text-[72px] 3xl:text-[72px] text-[40px] text-neutral-700 sm:leading-[90px] leading-[75px] ${
              darkMode ? "dark" : ""
            }`}
          >
            Terminos y <span className="hero-text-gradient">Condiciones</span>{" "}
          </motion.h1>
          <div className="mt-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${styles.heading2C}`}
            >
              Guidelines de la organizacion
            </motion.h2>
          </div>
        </div>
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-24 h-[531px] w-[944px] xl:block hidden">
        <img src={imagenes[6]?.imagen} alt="" className="rounded-3xl w-[100%] h-[100%] object-cover object-center " />
        </motion.div>
      </div>
    </section>
  );
};

export default LandingTerms;
