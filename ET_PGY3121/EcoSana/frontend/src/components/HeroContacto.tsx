import styles from "../style";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { obtenerImagenes } from "../api";

interface Imagen {
  id: string;
  imagen: string;
  nombre: string;
}

const HeroContacto = ({ darkMode }: { darkMode: boolean }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section
      id="contacto"
      className={`flex md:flex-row flex-col md:mb-32 lg:mb-32 xl:mb-32 2xl:mb-32 3xl:mb-32 mb-0 mt-24 ${
        styles.paddingY
      } ${darkMode ? "dark" : ""}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div
          className={`flex flex-row bg-green-400 items-center py-[6px] px-4 rounded-[20px] mb-6 font-poppins`}
        >
          <span className={`text-white font-bold text-xs uppercase`}>Info</span>
        </div>
        <div
          className={`flex flex-row justify-between items-center w-full ${
            darkMode ? "dark" : ""
          }`}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex-1 font-poppins font-bold 3xs:text-[44px] 2xs:text-[52px] xs:text-[60px] sm:text-[68px] md:text-[68px] lg:text-[68px] xl:text-[68px] 2xl:text-[72px] 3xl:text-[72px] text-[40px] text-neutral-700 sm:leading-[90px] leading-[75px] ${
              darkMode ? "dark" : ""
            }`}
          >
            Area de
            <br className="hidden md:block" /> {""}
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`hero-text-gradient ${darkMode ? "dark" : ""}`}
            >
              Contacto
            </motion.span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${
            styles.paragraph1A
          } mt-4 max-w-[470px] text-neutral-400 ${darkMode ? "dark" : ""}`}
        >
          Si quieres dejarnos alguna sugerencia, reclamo o quieres contactarnos
          directamente, te invitamos a rellenar el formulario que se encuentra
          en la siguente seccion.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`flex-1 flex ${
          styles.flexCenter
        } md:my-0 my-10 relative z-[1] ${darkMode ? "dark" : ""}`}
      >
        <motion.img
          src={imagenes[2]?.imagen}
          alt="EcoSanaH"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`w-[100%] h-[100%] object-contain relative z-[5] ${
            darkMode ? "dark" : ""
          }`}
        />
        <div
          className={`absolute z-[0] w-[40%] h-[35%] top-0 ${
            darkMode ? "dark" : ""
          }`}
        />
      </motion.div>
    </section>
  );
};

export default HeroContacto;
