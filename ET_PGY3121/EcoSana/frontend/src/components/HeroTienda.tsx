import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { obtenerProductos } from "../api";
import styles from "../style";
import axios from "axios";

interface Producto {
  codigo: number;
  imagen: string;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string;
  stock: number;
}
interface HeroTiendaProps {
  darkMode: boolean;
}

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

const HeroTienda = ({ darkMode }: HeroTiendaProps) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mostrarProductos, setMostrarProductos] = useState<Producto[]>([]);
  const [cantidadMostrar, setCantidadMostrar] = useState<number>(5);
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [categoria, setCategoria] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [disponibilidad, setDisponibilidad] = useState<string>("");
  const [resetCards, setResetCards] = useState<boolean>(false);
  const [cantidad, setCantidad] = useState<Record<number, number>>({});

  const aumentarCantidad = (event: React.MouseEvent, codigo: number) => {
    event.preventDefault();
    setCantidad((prevCantidad) => ({
      ...prevCantidad,
      [codigo]: (prevCantidad[codigo] || 1) + 1,
    }));
  };

  const disminuirCantidad = (event: React.MouseEvent, codigo: number) => {
    event.preventDefault();
    setCantidad((prevCantidad) => ({
      ...prevCantidad,
      [codigo]: Math.max(1, (prevCantidad[codigo] || 1) - 1),
    }));
  };

  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    is_superuser: boolean; // Agrega la propiedad "is_superuser" al estado del usuario
  }>({
    username: "",
    email: "",
    is_superuser: false, // Inicialmente, el usuario no es superusuario
  });

  const [pageReloaded, setPageReloaded] = useState(false);

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

  const handleCategoriaChange = (event: SelectChangeEvent<string>) => {
    setCategoria(event.target.value);
    setResetCards(true);
  };

  const handlePrecioChange = (event: SelectChangeEvent<string>) => {
    setPrecio(event.target.value);
    setResetCards(true);
  };

  const handleDisponibilidadChange = (event: SelectChangeEvent<string>) => {
    setDisponibilidad(event.target.value);
    setResetCards(true);
  };

  const handleResetearFiltros = () => {
    setCategoria("");
    setPrecio("");
    setDisponibilidad("");
    setResetCards(true);
    setProductos([...productosOriginales]);
  };

  const [productosOriginales, setProductosOriginales] = useState<Producto[]>(
    []
  );

  const productosFiltradosRef = useRef(productosOriginales);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await obtenerProductos();
        setProductosOriginales(response);
        setProductos(response);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    setMostrarProductos(productos.slice(0, cantidadMostrar));
  }, [productos, cantidadMostrar]);

  useEffect(() => {
    let productosFiltrados = [...productosOriginales];
    if (resetCards) {
      setCantidadMostrar(5);
      setResetCards(false);
      productosFiltrados = [...productosOriginales];
    }

    if (categoria !== "") {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.categoria === categoria
      );
    }

    if (precio === "menor-mayor") {
      productosFiltrados = productosFiltrados.sort(
        (a, b) => a.precio - b.precio
      );
    } else if (precio === "mayor-menor") {
      productosFiltrados = productosFiltrados.sort(
        (a, b) => b.precio - a.precio
      );
    }

    if (disponibilidad === "alto-stock") {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.stock > 40
      );
    } else if (disponibilidad === "bajo-stock") {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.stock <= 40
      );
    }

    productosFiltradosRef.current = productosFiltrados;
    setMostrarProductos(productosFiltrados.slice(0, cantidadMostrar));
  }, [
    productosOriginales,
    cantidadMostrar,
    categoria,
    precio,
    disponibilidad,
    resetCards,
  ]);

  const obtenerToken = () => {
    const token = localStorage.getItem("token"); // obtener el token del local storage
    return token;
  };

  const obtenerIdCarrito = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `http://localhost:8000/api/tienda/carrito/${userData.username}/`,
        config
      );
      const carritoId = response.data.codigo;
      console.log("Valor de carritoId:", carritoId);
      return carritoId;
    } catch (error) {
      console.error("Error al obtener el ID del carrito:", error);
      return null;
    }
  };

  const agregarAlCarrito = async (producto: Producto) => {
    // Necesitas reemplazar esto con el id real del usuario actualmente conectado.
    const carritoId = await obtenerIdCarrito();
    const userId = obtenerToken();
    const itemCarrito = {
      cantidad: cantidad[producto.codigo] || 1,
      producto: producto.codigo,
      carrito: carritoId,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/tienda/elementos/",
        itemCarrito,
        config
      );
      console.log(response);
      console.log("Producto agregado:" + carrito);
      setCarrito((prevCarrito) => [...prevCarrito, producto]);

      setCantidad((prevCantidad) => ({
        ...prevCantidad,
        [producto.codigo]: 1,
      }));
      
      alert(`Producto ${producto.nombre} agregado exitosamente al carrito!`);
    } catch (error) {
      console.error("Hubo un error al agregar el producto al carrito:", error);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#22c55e",
      },
    },
    typography: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
  });

  const buttonTheme = createTheme({
    typography: {
      fontFamily: "Poppins, Arial, sans-serif",
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
  });

  const cargarMasProductos = () => {
    setCantidadMostrar(cantidadMostrar + 5);
  };

  return (
    <section
      id="tienda"
      className={`flex xl:flex-row flex-col md:mb-32 lg:mb-32 xl:mb-32 2xl:mb-32 3xl:mb-32 mb-16 mt-16 ${
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
            transition={{ duration: 0.8 }}
            className={`flex-1 font-poppins font-bold 3xs:text-[44px] 2xs:text-[52px] xs:text-[60px] sm:text-[68px] md:text-[68px] lg:text-[68px] xl:text-[68px] 2xl:text-[72px] 3xl:text-[72px] text-[40px] text-neutral-700 sm:leading-[90px] leading-[75px] ${
              darkMode ? "dark" : ""
            }`}
          >
            Tienda de <span className="hero-text-gradient">EcoSana</span>{" "}
          </motion.h1>
          <div className="mt-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${styles.heading2C}`}
            >
              Productos pensados especialmente para ti y tu jardín
            </motion.h2>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`mt-24 ${styles.flexCenter}`}
        >
          <div className="flex flex-col justify-center xl:flex-row">
            <div className="mb-4 xl:mb-0 xl:flex-1 xl:flex xl:justify-center">
              <ThemeProvider theme={theme}>
                <div className="xl:flex xl:space-x-4">
                  <Select
                    value={categoria}
                    onChange={handleCategoriaChange}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingLeft: "80px",
                      paddingRight: "80px",
                      width: "100%",
                      "& .MuiMenuItem-root": {
                        textAlign: "center",
                      },
                      "&.dark .MuiMenuItem-root": {
                        color: "white",
                      },
                    }}
                    displayEmpty
                    className={`select ${darkMode ? "dark-card" : ""} ${
                      darkMode ? "dark-form" : ""
                    }`}
                  >
                    <MenuItem value="">Categoria</MenuItem>
                    <MenuItem value="productos">Productos</MenuItem>
                    <MenuItem value="servicios">Servicios</MenuItem>
                    <MenuItem value="asesorias">Asesorias</MenuItem>
                  </Select>
                  <Select
                    value={precio}
                    onChange={handlePrecioChange}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingLeft: "80px",
                      paddingRight: "80px",
                      width: "100%",
                      "& .MuiMenuItem-root": {
                        textAlign: "center",
                      },
                      "&.dark .MuiMenuItem-root": {
                        color: "white",
                      },
                    }}
                    displayEmpty
                    className={`select ${darkMode ? "dark-card" : ""} ${
                      darkMode ? "dark-form" : ""
                    }`}
                  >
                    <MenuItem value="">Precio</MenuItem>
                    <MenuItem value="menor-mayor">De menor a mayor</MenuItem>
                    <MenuItem value="mayor-menor">De mayor a menor</MenuItem>
                  </Select>
                  <Select
                    value={disponibilidad}
                    onChange={handleDisponibilidadChange}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingLeft: "80px",
                      paddingRight: "80px",
                      width: "100%",
                      "& .MuiMenuItem-root": {
                        textAlign: "center",
                      },
                      "&.dark .MuiMenuItem-root": {
                        color: "white",
                      },
                    }}
                    displayEmpty
                    className={`select ${darkMode ? "dark-card" : ""} ${
                      darkMode ? "dark-form" : ""
                    }`}
                  >
                    <MenuItem value="">Disponibilidad</MenuItem>
                    <MenuItem value="alto-stock">Alto stock</MenuItem>
                    <MenuItem value="bajo-stock">Bajo stock</MenuItem>
                  </Select>
                </div>
                <div className="p-2 my-4 xl:my-0"></div>
                <Button className="w-full" onClick={handleResetearFiltros}>
                  Resetear filtros
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </motion.div>
        <div className="w-full">
          {mostrarProductos.map((producto) => (
            <motion.div
              key={producto.codigo}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`mt-24 w-full shadow-2xl rounded-2xl ${
                darkMode ? "dark-form" : ""
              }`}
            >
              <div className="flex flex-col font-sans xl:flex-row">
                <div className="relative flex-none w-full mb-6 xl:w-64 xl:mb-0 h-[300px] 2xs:h-[450px] md:h-[500px] xl:h-[300px]">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="object-cover w-full h-full rounded-2xl"
                    loading="lazy"
                  />
                </div>
                <form className="flex-auto p-4 xl:p-12">
                  <div className="flex flex-col">
                    <h1 className={`flex-auto ${styles.heading1G} mb-2`}>
                      {producto.nombre}
                    </h1>
                    <div
                      className={`${styles.heading1G} hero-text-gradient mb-2 `}
                    >
                      ${producto.precio.toFixed(0)}
                    </div>
                    <div className={`${styles.heading2D}`}>
                      {producto.descripcion}
                    </div>
                  </div>
                  <div className="text-center 3xs:text-center 2xs:text-center xs:text-center sm:text-center md:text-center lg:text-center xl:text-left 2xl:text-left 3xl:text-left"></div>
                  <div className="mt-8 mb-8 text-center lg:mb-0 3xs:text-center 2xs:text-center xs:text-center sm:text-center md:text-center lg:text-center xl:text-left 2xl:text-left 3xl:text-left">
                    <div className="font-medium font-poppins">
                      <button
                        className="w-10 h-10 font-bold text-black bg-gray-300 rounded hover:bg-gray-400"
                        onClick={(event) =>
                          disminuirCantidad(event, producto.codigo)
                        }
                      >
                        -
                      </button>
                      <input
                        className="w-20 h-10 mx-4 text-center text-black border rounded"
                        type="text"
                        value={cantidad[producto.codigo] || 1}
                        readOnly
                      />
                      <button
                        className="w-10 h-10 font-bold text-black bg-gray-300 rounded hover:bg-gray-400"
                        onClick={(event) =>
                          aumentarCantidad(event, producto.codigo)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="p-2"></div>
                    <div>
                      <button
                        className="h-14 px-8 font-semibold rounded-md border bg-green-500 hover:bg-green-400 text-white text-[18px] font-poppins"
                        type="button"
                        onClick={() => agregarAlCarrito(producto)}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          ))}
          {productosFiltradosRef.current.length >= 5 &&
            cantidadMostrar < productosFiltradosRef.current.length && (
              <div className="flex justify-center mt-24">
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
                    onClick={cargarMasProductos}
                  >
                    Cargar más
                  </Button>
                </ThemeProvider>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default HeroTienda;
