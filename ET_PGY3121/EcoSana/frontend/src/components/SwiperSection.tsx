import styles from "../style";
import Carousel from "react-material-ui-carousel";
import Slide from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { obtenerImagenes } from "../api";
import { useState, useEffect } from "react";

interface Imagen {
  id: string;
  imagen: string;
  nombre: string;
}

const SwiperSection = () => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <section
      id="ssection-home"
      className="mt-0 3xs:mt-0 2xs:mt-0 xs:mt-0 sm:mt-0 md:mt-8 lg:mt-8 xl:mt-8 2xl:mt-8 3xl:mt-10"
    >
      <div
        className={`bg-gray-700 rounded-3xl p-6 md:p-8 lg:p-10 ${styles.flexCenter}`}
      >
        <div
          className={`${styles.heading2A} flex flex-col items-center mt-12 mb-4`}
        >
          <h1 className="text-center">Lo ultimo de EcoSana</h1>
          <h2 className={`text-center mt-4 ${styles.heading2B}`}>
            Novedades y noticias del momento.
          </h2>
          <Carousel
            animation="slide"
            indicators={false}
            navButtonsAlwaysVisible={true}
            className="w-4/5 mt-12 mb-4 rounded-3xl"
            autoPlay={true}
          >
            <Slide>
              <Paper className="rounded-xl">
                <div className="carousel-image-container">
                  <img
                    className="carousel-image"
                    src={imagenes[5]?.imagen}
                    alt=""
                  />
                </div>
              </Paper>
            </Slide>
            <Slide>
              <Paper className="rounded-xl">
                <div className="carousel-image-container">
                  <img
                    className="carousel-image"
                    src={imagenes[4]?.imagen}
                    alt=""
                  />
                </div>
              </Paper>
            </Slide>
            <Slide>
              <Paper className="rounded-xl">
                <div className="carousel-image-container">
                  <img
                    className="carousel-image"
                    src={imagenes[3]?.imagen}
                    alt=""
                  />
                </div>
              </Paper>
            </Slide>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default SwiperSection;
