import styles from "../style";
import axios from "axios";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AdminPageOptions = ({ darkMode }: { darkMode: boolean }) => {
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    is_superuser: boolean; // Agrega la propiedad "is_superuser" al estado del usuario
  }>({
    username: "",
    email: "",
    is_superuser: false, // Inicialmente, el usuario no es superusuario
  });

  const [pageReloaded, setPageReloaded] = useState(false); // Estado para controlar si la página se ha recargado

  useEffect(() => {
    window.scrollTo(0, 0);

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
  }, [pageReloaded]);

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
    <section className={`${styles.flexCenter} mt-24 mb-48 text-center`}>
      <div
        className={`flex-row lg:flex items-center justify-center bg-neutral-200 py-10 px-10 rounded-2xl w-9/12 ${
          darkMode ? "dark-card" : ""
        } `}
      >
        <div className="text-center xl:w-1/2">
          {userData.is_superuser &&
            pageReloaded && ( // Asegurar que la página se ha recargado antes de mostrar el botón
              <ThemeProvider theme={buttonTheme}>
                <Link to="http://localhost:8000/admin/login/">
                  <Button
                    variant="contained"
                    color="inherit"
                    size="large"
                    style={{
                      backgroundColor: "rgba(34, 197, 94, 0)",
                      color: "#22c55e",
                      fontSize: "20px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                    disableElevation
                    className="w-full ml-4"
                  >
                    DATABASE ACCESS
                  </Button>
                </Link>
              </ThemeProvider>
            )}
        </div>
        <div className="p-6"></div>
        <div className="text-center xl:w-1/2">
          {userData.is_superuser &&
            pageReloaded && ( // Asegurar que la página se ha recargado antes de mostrar el botón
              <ThemeProvider theme={buttonTheme}>
                <Link to="/CatalogManagement">
                  <Button
                    variant="contained"
                    color="inherit"
                    size="large"
                    style={{
                      backgroundColor: "rgba(34, 197, 94, 0)",
                      color: "#22c55e",
                      fontSize: "20px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                    disableElevation
                    className="w-full ml-4"
                  >
                    CATALOG MANAGEMENT
                  </Button>
                </Link>
              </ThemeProvider>
            )}
        </div>
      </div>
    </section>
  );
};

export default AdminPageOptions;
