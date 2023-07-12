import styles from "../style";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { obtenerImagenes } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Imagen {
  id: number;
  imagen: string;
  nombre: string;
}

const LandingAdmin = ({ darkMode }: { darkMode: boolean }) => {
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

        // Verificar si el usuario no es superusuario y redirigir al home
        if (!userData.is_superuser) {
          navigate("/");
        }
      } catch (error) {
        console.log("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();

    // Verificar si la página se ha recargado
    if (!pageReloaded) {
      setPageReloaded(true);
    }
  }, [pageReloaded, navigate]);

  return (
    <section
      id="landing-admin"
      className={`flex md:flex-row flex-col md:mb-24 mb-0 mt-24 ${
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
            Admin
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
            Bienvenid@
            <br className="hidden md:block" /> {""}
            <span className={`hero-text-gradient ${darkMode ? "dark" : ""}`}>
              {userData.username}
            </span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${
            styles.paragraph1A
          } mt-6 max-w-[470px] text-neutral-400 ${darkMode ? "dark" : ""}`}
        >
          Hey Administrador! aquí puedes acceder a la Database de la pagina,
          administrar el catalogo de tienda y mas.
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

export default LandingAdmin;
