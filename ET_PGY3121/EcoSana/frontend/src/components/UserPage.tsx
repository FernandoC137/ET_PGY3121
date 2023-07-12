import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../style";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { obtenerImagenes } from "../api";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

interface Imagen {
  id: number;
  imagen: string;
  nombre: string;
}

const UserPage = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}) => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    is_superuser: boolean; // Agrega la propiedad "is_superuser" al estado del usuario
  }>({
    username: "",
    email: "",
    is_superuser: false, // Inicialmente, el usuario no es superusuario
  });

  const navigate = useNavigate();
  const [pageReloaded, setPageReloaded] = useState(false); // Estado para controlar si la página se ha recargado

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));

    // Obtener datos del usuario desde el backend en Django
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Token ${token}` };

        console.log("Realizando solicitud HTTP...");
        const response = await axios.get(
          "http://localhost:8000/api/users/profile/",
          { headers }
        );
        console.log("Respuesta recibida:", response.data);

        const userData = response.data;
        console.log("Datos del usuario:", userData);

        setUserData(userData);
      } catch (error) {
        console.log("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();

    // Verificar si la página se ha recargado
    if (!pageReloaded) {
      setPageReloaded(true);
    }
  }, [setDarkMode, pageReloaded]);

  console.log("userData:", userData);

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
      id="userpage"
      className="mt-0 mb-48 3xs:mt-0 2xs:mt-0 xs:mt-0 sm:mt-0 md:mt-8 lg:mt-8 xl:mt-8 2xl:mt-8 3xl:mt-10"
    >
      <div
        className={`shadow-2xl rounded-3xl p-6 md:p-8 lg:p-10 ${
          styles.flexCenter
        } ${darkMode ? "dark-card" : ""}`}
      >
        <div
          className={`${styles.heading2A} flex flex-col items-center mt-12 mb-4`}
        >
          <div className="items-center text-center">
            <AccountCircleIcon
              style={{
                fontSize: 128,
                color: darkMode ? "#FFFFFF" : "#909090",
                padding: 12,
                marginBottom: 32,
                borderRadius: 12,
              }}
            />
            <h1
              className={`text-center text-neutral-700 ${
                darkMode ? "text-white" : ""
              }`}
            >
              {"EcoPage de " + userData.username}
            </h1>
            <h2
              className={`text-center mt-4 text-green-500 ${styles.heading2B}`}
            >
              Resumen del usuario
            </h2>
          </div>
          <div className="w-4/5 mt-24 xs:h-[450px] h-[250px]">
            <img
              src={imagenes[6]?.imagen}
              alt=""
              className="object-cover object-center w-full h-full rounded-3xl "
            />
          </div>
          <div
            className={`mt-24 bg-neutral-100 px-8 py-6 rounded-lg ${
              darkMode ? "dark-nav-mobileA" : ""
            }`}
          >
            <h3 className={`${styles.paragraph1E}`}>
              {"Nombre de Usuario: " + userData.username}
            </h3>
            <div className="py-2"></div>
            <h4 className={`${styles.paragraph1E}`}>
              {"Email: " + userData.email}
            </h4>
          </div>
          <div className="mb-6"></div>
          <div className="mt-6 text-center xl:w-5/6">
            <ThemeProvider theme={buttonTheme}>
              <Button
                variant="contained"
                color="inherit"
                size="large"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0)",
                  color: "#22c55e",
                  fontSize: "14px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
                disableElevation
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/Login");
                }}
                className="w-full ml-4"
              >
                CAMBIAR DE CUENTA
              </Button>
            </ThemeProvider>
          </div>
          <div className="mt-6 text-center xl:w-5/6">
            {userData.is_superuser &&
              pageReloaded && ( // Asegurar que la página se ha recargado antes de mostrar el botón
                <ThemeProvider theme={buttonTheme}>
                  <Link to="/AdminPage">
                    <Button
                      variant="contained"
                      color="inherit"
                      size="large"
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0)",
                        color: "#22c55e",
                        fontSize: "14px",
                        paddingTop: "6px",
                        paddingBottom: "6px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                      disableElevation
                      className="w-full ml-4"
                    >
                      ADMINISTRACION DEL SITIO
                    </Button>
                  </Link>
                </ThemeProvider>
              )}
          </div>
          <div className="mb-6"></div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
