import styles from "../style";
import { motion } from "framer-motion";

const PageNotFound = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <section
      id="galeria"
      className={`flex md:flex-row flex-col md:mb-32 lg:mb-32 xl:mb-32 2xl:mb-32 3xl:mb-32 mb-16 mt-16 ${
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
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`flex-1 font-poppins font-bold 3xs:text-[44px] 2xs:text-[52px] xs:text-[60px] sm:text-[68px] md:text-[68px] lg:text-[68px] xl:text-[68px] 2xl:text-[72px] 3xl:text-[72px] text-[40px] text-neutral-700 sm:leading-[90px] leading-[75px] ${
              darkMode ? "dark" : ""
            }`}
          >
            Oops! pagina no{" "}
            <span className="hero-text-gradient">encontrada</span>{" "}
          </motion.h1>
          <div className="mt-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`${styles.heading2C} text-center`}
            >
              Revisa la URL e intentalo nuevamente
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
