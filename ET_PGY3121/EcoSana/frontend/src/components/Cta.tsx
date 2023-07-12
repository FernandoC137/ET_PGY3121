import { Button } from "@mui/material";
import styles from "../style";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { obtenerImagenes } from "../api";
import { useState, useEffect } from "react";

interface Imagen {
  id: number;
  imagen: string;
  nombre: string;
}

const Cta = ({ darkMode }: { darkMode: boolean }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

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

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <section
      id="cta-home"
      className={`flex md:flex-row flex-col md:mb-24 lg:mb-24 xl:mb-24 2xl:mb-24 3xl:mb-24 mb-0 md:mt-36 lg:mt-52 xl:mt-52 2xl:mt-52 3xl:mt-52 mt-20 ${
        styles.paddingY
      } ${darkMode ? "dark" : ""}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mb-4`}
      >
        <div className="flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-6 font-poppins">
          <span className="text-xs font-bold text-green-500 uppercase">
            Comunidad
          </span>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className={`${styles.heading1D} ${darkMode ? "dark" : ""}`}>
            Ya Somos
            <br className="hidden md:block" /> {""}
            <span className="hero-text-gradient">20K+ </span>
            usuarios
            <br className="hidden md:block" /> {""}
          </h1>
        </div>
        <h1 className={`${styles.heading1D} ${darkMode ? "dark" : ""}`}>
          en la comunidad
        </h1>
        <div className="mt-2 mb-2">
          <p
            className={`${styles.paragraph1A} mt-4 max-w-[470px] text-gray-400`}
          >
            <span className="text-green-500">
              <CheckCircleOutlineOutlinedIcon
                style={{ fontSize: 30, verticalAlign: "text-bottom" }}
              />
            </span>{" "}
            Comunidad en auge
          </p>
          <p
            className={`${styles.paragraph1A} mt-4 max-w-[470px] text-gray-400`}
          >
            <span className="text-green-500">
              <CheckCircleOutlineOutlinedIcon
                style={{ fontSize: 30, verticalAlign: "text-bottom" }}
              />
            </span>{" "}
            Grandes beneficios asociados
          </p>
          <p
            className={`${styles.paragraph1A} mt-4 max-w-[470px] text-gray-400`}
          >
            <span className="text-green-500">
              <CheckCircleOutlineOutlinedIcon
                style={{ fontSize: 30, verticalAlign: "text-bottom" }}
              />
            </span>{" "}
            Descubre nuestros servicios
          </p>
        </div>
        <div className="mt-8">
          <ThemeProvider theme={buttonTheme}>
            {isLoggedIn ? (
              <Link to="/Account">
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
                  Acceso a mi EcoPage
                </Button>
              </Link>
            ) : (
              <Link to="/SignUp">
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
                  Unete Hoy
                </Button>
              </Link>
            )}
          </ThemeProvider>
        </div>
      </div>
      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1]`}
      >
        <div className="rounded-[20px] overflow-hidden w-[90%] h-[90%]">
          <img
            src={imagenes[6]?.imagen}
            alt="EcoSanaCTA"
            className="w-[100%] h-[100%] object-cover object-center"
          />
        </div>
        <div className={`absolute z-[0] w-[40%] h-[35%] top-0 `} />
      </div>
    </section>
  );
};

export default Cta;
