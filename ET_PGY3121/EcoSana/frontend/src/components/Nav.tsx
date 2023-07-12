import { useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  AccountCircleOutlined,
  DarkModeOutlined,
  WbSunnyOutlined,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { navLinks } from "../constants";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { obtenerImagenes } from "../api";
import axios from "axios";

interface Imagen {
  id: number;
  imagen: string;
  nombre: string;
}

const Nav = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    is_superuser: boolean;
  }>({
    username: "",
    email: "",
    is_superuser: false,
  });

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggle]);

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, [setDarkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token");
          const headers = { Authorization: `Token ${token}` };

          const response = await axios.get(
            "http://localhost:8000/api/users/profile/",
            { headers }
          );

          const userData = response.data;
          setUserData(userData);
        } catch (error) {
          console.log("Error al obtener los datos del usuario:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <nav
      className={`flex items-center justify-between w-full py-6 navbar ${
        darkMode ? "dark" : ""
      }`}
    >
      <img
        src={imagenes[0]?.imagen}
        alt="EcoSana"
        className="w-[124px] h-[32px]"
      />

      <ul className="items-center justify-end flex-1 hidden list-none xl:flex">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins cursor-pointer text-[16px] font-medium ${
              index === navLinks.length - 1 ? "mr-0" : "mr-8"
            } ${
              darkMode ? "text-white" : ""
            } text-gray-500 hover:text-green-500`}
          >
            {nav.external ? (
              <a href={nav.url}>{nav.title}</a>
            ) : (
              <Link to={`#${nav.id}`}>{nav.title}</Link>
            )}
          </li>
        ))}
        {isLoggedIn ? (
          <button
            className={`bg-secondary font-poppins font-normal cursor-pointer ml-8 text-[16px] text-white hover:text-green-100 py-2 px-4 rounded`}
            onClick={() => {
              localStorage.removeItem("token");
              handleLogout();
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/Login">
            <button
              className={`bg-secondary font-poppins font-normal cursor-pointer ml-8 text-[16px] text-white hover:text-green-100 py-2 px-4 rounded`}
            >
              Login
            </button>
          </Link>
        )}
        <Link to="/Carrito">
          <button
            className={`ml-8 text-gray-500 hover:text-green-500 ${
              darkMode ? "text-white" : ""
            }`}
          >
            <ShoppingCartOutlined />
          </button>
        </Link>
        <button
          className={`ml-6 text-gray-500 hover:text-green-500 ${
            darkMode ? "text-white" : ""
          }`}
          onClick={toggleDarkMode}
        >
          {darkMode ? <WbSunnyOutlined /> : <DarkModeOutlined />}
        </button>
        {isLoggedIn ? (
          <Link to="/Account">
            <button
              className={`ml-6 ${
                userData.is_superuser ? "text-yellow-500" : "text-green-500"
              } ${darkMode ? "text-white" : ""}`}
            >
              <AccountCircleIcon />
            </button>
          </Link>
        ) : (
          <Link to="/Account">
            <button
              className={`ml-6 text-gray-500 hover:text-green-500 ${
                darkMode ? "text-white" : ""
              }`}
            >
              <AccountCircleOutlined />
            </button>
          </Link>
        )}
      </ul>

      <div className="flex items-center justify-end flex-1 xl:hidden">
        {toggle ? (
          <CloseOutlinedIcon
            className="w-[24px] h-[24px] object-contain"
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          />
        ) : (
          <MenuOutlinedIcon
            className="w-[24px] h-[24px] object-contain"
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          />
        )}
        <AnimatePresence>
          {toggle && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              className={`${
                toggle ? "flex" : "hidden"
              } p-6 bg-gray-100 absolute bottom-5 right-0 3xs:mx-4 2xs:mx-6 xs:mx-14 sm:mx-16 md:mx-16 mx-3 my-0 xs:min-w-[80%] sm:min-w-[81%] md:min-w-[85%] lg:min-w-[88%] min-w-[91%] rounded-xl sidebar z-[2] stop-scrolling ${
                darkMode ? "dark-nav-mobileA" : ""
              }`}
            >
              <ul className="flex flex-col items-center justify-end flex-1 list-none">
                {navLinks.map((nav, index) => (
                  <li
                    key={nav.id}
                    className={`font-poppins cursor-pointer text-[16px] font-medium ${
                      index === navLinks.length - 1 ? "mr-0" : "mb-10"
                    } ${
                      darkMode ? "text-white" : ""
                    } text-gray-500 hover:text-green-500`}
                  >
                    {nav.external ? (
                      <a href={nav.url}>{nav.title}</a>
                    ) : (
                      <Link to={`#${nav.id}`}>{nav.title}</Link>
                    )}
                  </li>
                ))}
                {isLoggedIn ? (
                  <button
                    className={`font-poppins font-medium cursor-pointer text-[16px] text-gray-500 hover:text-green-500 mt-10 ${
                      darkMode ? "text-white" : ""
                    }`}
                    onClick={() => {
                      localStorage.removeItem("token");
                      handleLogout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/Login">
                    <button
                      className={`font-poppins font-medium cursor-pointer text-[16px] text-gray-500 hover:text-green-500 mt-10 ${
                        darkMode ? "text-white" : ""
                      }`}
                    >
                      Login
                    </button>
                  </Link>
                )}
                <li
                  className={`p-4 mt-10 bg-gray-200 rounded-xl ${
                    darkMode ? "dark-nav-mobileB" : ""
                  }  `}
                >
                  <Link to="/Carrito">
                    <button
                      className={`mr-10 text-gray-500 md:mr-12 hover:text-green-500 ${
                        darkMode ? "text-white" : ""
                      }`}
                    >
                      <ShoppingCartOutlined />
                    </button>
                  </Link>
                  <button
                    className={`md:mr-12 mr-10 text-gray-500 hover:text-green-500 ${
                      darkMode ? "text-white" : ""
                    }`}
                    onClick={toggleDarkMode}
                  >
                    {darkMode ? <WbSunnyOutlined /> : <DarkModeOutlined />}
                  </button>
                  <Link to="/Account">
                    {isLoggedIn ? (
                      <button
                        className={` ${
                          userData.is_superuser
                            ? "text-yellow-500"
                            : "text-green-500"
                        } ${darkMode ? "text-white" : ""}`}
                      >
                        <AccountCircleIcon />
                      </button>
                    ) : (
                      <button
                        className={`text-gray-500 hover:text-green-500 ${
                          darkMode ? "text-white" : ""
                        }`}
                      >
                        <AccountCircleOutlined />
                      </button>
                    )}
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Nav;
