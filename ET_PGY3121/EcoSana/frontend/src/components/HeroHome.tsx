import { Stack, Button } from "@mui/material";
import styles from "../style";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { obtenerImagenes } from "../api";
import { useState, useEffect } from "react";

interface Imagen {
  id: number;
  imagen: string;
  nombre: string;
}

const HeroHome = ({ darkMode }: { darkMode: boolean }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);

  const buttonTheme = createTheme({
    typography: {
      fontFamily: "Poppins, Arial, sans-serif",
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
  });

  return (
    <section
      id="hero-home"
      className={`flex md:flex-row flex-col md:mb-44 lg:mb-44 xl:mb-44 2xl:mb-44 3xl:mb-44 mb-0 mt-24 ${
        styles.paddingY
      } ${darkMode ? "dark" : ""}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div
          className={`flex flex-row bg-green-400 items-center py-[6px] px-4 rounded-[20px] mb-6 font-poppins`}
        >
          <span className={`text-white font-bold text-xs uppercase`}>
            Inicio
          </span>
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
            <span className={`hero-text-gradient ${darkMode ? "dark" : ""}`}>
              EcoSana
            </span>
            <br className="hidden md:block" /> {""}
            Cultivando
          </motion.h1>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`flex-1 font-poppins font-bold 3xs:text-[44px] 2xs:text-[52px] xs:text-[60px] sm:text-[68px] md:text-[68px] lg:text-[68px] xl:text-[68px] 2xl:text-[72px] 3xl:text-[72px] text-[40px] text-neutral-700 sm:leading-[100px] leading-[75px] ${
            darkMode ? "dark" : ""
          }`}
        >
          un futuro mejor
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${
            styles.paragraph1A
          } mt-4 max-w-[470px] text-neutral-400 ${darkMode ? "dark" : ""}`}
        >
          Descubre cómo la naturaleza renueva tu hogar. Nuestros expertos pueden
          brindarte ayuda para que escojas lo que más se adecue a tus
          necesidades.
        </motion.p>

        <div className={`mt-8 ${darkMode ? "dark" : ""}`}>
          <ThemeProvider theme={buttonTheme}>
            <Stack spacing={2} direction="row">
              <Link to="/SobreNosotros">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      backgroundColor: "rgba(34, 197, 94, 1)",
                      color: "#fff",
                    }}
                    className="mr-2"
                  >
                    Mas Informacion
                  </Button>
                </motion.div>
              </Link>
              {!isLoggedIn && (
                <Link to="/SignUp">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        color: "#404040",
                      }}
                      className="ml-2"
                    >
                      Sign up
                    </Button>
                  </motion.div>
                </Link>
              )}
            </Stack>
          </ThemeProvider>
        </div>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          src={imagenes[2]?.imagen}
          alt="EcoSanaH"
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

export default HeroHome;
