import styles from "../style";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import { obtenerImagenes } from "../api";
import { useState, useEffect } from "react";

interface Imagen {
  id: number;
  imagen: string;
  nombre: string;
}

const Brief = ({ darkMode }: { darkMode: boolean }) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <section
      id="brief-home"
      className={`flex md:flex-row flex-col md:mb-24 lg:mb-24 xl:mb-24 2xl:mb-24 3xl:mb-24 mb-0 ${
        styles.paddingY
      } ${darkMode ? "dark" : ""}`}
    >
      <div
        className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6 mb-4`}
      >
        <div className="flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-6 font-poppins">
          <span className="text-xs font-bold text-green-500 uppercase">
            Historia
          </span>
        </div>
        <div className="mt-2 text-center">
          <h1 className={`${styles.heading1D} ${darkMode ? "dark" : ""}`}>
            La Organizacion
          </h1>
          <div className="mt-4">
            <h2 className={`${styles.heading2C}`}>
              Un poco acerca de nuestros hitos mas importantes.
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-28">
          <div className="w-full sm:w-1/2 md:w-1/3">
            <div className="mb-4">
              <div className="text-center">
                <div className="mb-32">
                  <PeopleAltOutlinedIcon
                    style={{
                      fontSize: 64,
                      color: "#fff",
                      backgroundColor: "#22c55e",
                      padding: 12,
                      marginBottom: 32,
                      borderRadius: 12,
                    }}
                  />
                  <h1
                    className={`${styles.heading1E} ${
                      darkMode ? "dark" : ""
                    }  mb-4`}
                  >
                    Origenes comunitarios
                  </h1>
                  <p className={`${styles.heading2D}`}>
                    La gente impulso e hizo posible la existencia de EcoSana,
                    materializandola en la realidad
                  </p>
                </div>
                <div>
                  <AnalyticsOutlinedIcon
                    style={{
                      fontSize: 64,
                      color: "#fff",
                      backgroundColor: "#22c55e",
                      padding: 12,
                      marginBottom: 32,
                      borderRadius: 12,
                    }}
                  />
                  <h1
                    className={`${styles.heading1E} ${
                      darkMode ? "dark" : ""
                    }  mb-4`}
                  >
                    Irrupcion en el mercado
                  </h1>
                  <p className={`${styles.heading2D}`}>
                    Nuestro novedoso proyecto y modelo de negocios, cambio el
                    paradigma del mercado
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-16 mb-16 text-center sm:w-1/2 md:w-1/3 3xs:mt-16 2xs:mt-16 xs:mt-16 sm:mt-16 md:mt-16 lg:mt-0 xl:mt-0 2xl:mt-0 3xl:mt-0 3xs:mb-16 2xs:mb-16 xs:mb-16 sm:mb-16 md:mb-16 lg:mb-0 xl:mb-0 2xl:mb-0 3xl:mb-0">
            <div className="mb-4 w-[80%] h-[100%]">
              <img
                src={imagenes[7]?.imagen}
                alt=""
                className="w-full h-full mx-auto rounded-3xl sm:hidden lg:block"
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3">
            <div className="mb-4">
              <div className="text-center">
                <div className="mb-32">
                  <ShowChartOutlinedIcon
                    style={{
                      fontSize: 64,
                      color: "#fff",
                      backgroundColor: "#22c55e",
                      padding: 12,
                      marginBottom: 32,
                      borderRadius: 12,
                    }}
                  />
                  <h1
                    className={`${styles.heading1E} ${
                      darkMode ? "dark" : ""
                    }  mb-4`}
                  >
                    Comunidad en ascenso
                  </h1>
                  <p className={`${styles.heading2D}`}>
                    Cada dia somos mas quienes formamos parte de este gran
                    proyecto, que nos beneficia a tod@s
                  </p>
                </div>
                <div className="items-center">
                  <AutoGraphOutlinedIcon
                    style={{
                      fontSize: 64,
                      color: "#fff",
                      backgroundColor: "#22c55e",
                      padding: 12,
                      marginBottom: 32,
                      borderRadius: 12,
                    }}
                  />
                  <h1
                    className={`${styles.heading1E} ${
                      darkMode ? "dark" : ""
                    }  mb-4`}
                  >
                    Gran expansion
                  </h1>
                  <p className={`${styles.heading2D}`}>
                    Iniciamos alianzas con empresas e inversionistas interesados
                    con nuestra causa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Brief;
