import React, { useEffect, useState } from "react";
import styles from "../style";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface Photo {
  id: number;
  thumbnailUrl: string;
  title: string;
  albumId: number;
}

const HeroGaleria: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadedPhotos, setLoadedPhotos] = useState<Photo[]>([]);
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const [loadCount, setLoadCount] = useState<number>(9);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setLoadedPhotos(data.slice(0, loadCount));
        setDisplayedPhotos(data.slice(0, loadCount));
      });
  }, [loadCount]);

  const loadMorePhotos = () => {
    setLoadCount((prevCount) => prevCount + 9);
  };

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
      id="galeria"
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
            Galeria de{" "}
            <span className={`hero-text-gradient ${darkMode ? "dark" : ""}`}>
              EcoSana
            </span>{" "}
          </motion.h1>
          <div className="mt-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`${styles.heading2C} text-center`}
            >
              Revisa algunas de las imágenes más destacadas de nuestras redes
            </motion.h2>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 mt-32 sm:grid-cols-2 md:grid-cols-3">
          {displayedPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
            >
              <motion.img
                src={photo.thumbnailUrl}
                alt={photo.title}
                loading="lazy"
                className="object-cover w-full h-300"
              />
              <div className="p-4">
                <motion.h3
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`${styles.heading2D} text-lg font-medium text-gray-900 dark:text-white text-center`}
                >
                  {photo.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`${styles.heading2B} mt-2 text-gray-600 dark:text-gray-300 text-center`}
                >
                  {photo.albumId}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
        {loadedPhotos.length < photos.length && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center p-8 mt-16"
          >
            <ThemeProvider theme={buttonTheme}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "#404040",
                  fontSize: "16px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingLeft: "48px",
                  paddingRight: "48px",
                }}
                className="ml-2"
                onClick={loadMorePhotos}
              >
                Cargar más
              </Button>
            </ThemeProvider>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroGaleria;
