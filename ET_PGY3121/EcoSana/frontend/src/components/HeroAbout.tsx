import styles from "../style";
import { motion } from "framer-motion";

const HeroAbout = ({ darkMode }: { darkMode: boolean }) => (
  <section
    id="sobrenosotros"
    className={`flex md:flex-row flex-col md:mb-32 lg:mb-32 xl:mb-32 2xl:mb-32 3xl:mb-32 mb-16 mt-16 ${
      styles.paddingY
    } ${darkMode ? "dark" : ""}`}
  >
    <div
      className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-2 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`flex-1 font-poppins font-bold 3xs:text-[44px] 2xs:text-[52px] xs:text-[60px] sm:text-[68px] md:text-[68px] lg:text-[68px] xl:text-[68px] 2xl:text-[72px] 3xl:text-[72px] text-[40px] text-neutral-700 sm:leading-[90px] leading-[75px] ${
            darkMode ? "dark" : ""
          }`}
        >
          Acerca de{" "}
          <span className={`hero-text-gradient ${darkMode ? "dark" : ""}`}>
            EcoSana
          </span>{" "}
        </motion.h1>
        <div className="mt-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${styles.heading2C}`}
          >
            Conoce nuestros objetivos y la dirección que guía nuestro trabajo.
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`${styles.heading2C}`}
          >
            Descubre cómo hemos llegado hasta la actualidad
          </motion.h3>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16"
      >
        <motion.iframe
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          src="https://www.youtube.com/embed/iCk16sC3dP0"
          title="Forest Waterfall Nature Sounds - 1 Hour Relaxing Birds Chirping - River Meditation Sleeping Sound"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="rounded-3xl 3xs:w-[320px] 2xs:w-[400px] xs:w-[480px] sm:w-[512px] md:w-[600px] lg:w-[720px] xl:w-[944px] 2xl:w-[944px] 3xl:w-[944px] w-[240px] 3xs:h-[180px] 2xs:h-[225px] xs:h-[270px] sm:h-[288px] md:h-[337.50px] lg:h-[405px] xl:h-[531px] 2xl:h-[531px] 3xs:h-531px] h-[135px]"
        ></motion.iframe>
      </motion.div>
    </div>
  </section>
);

export default HeroAbout;
