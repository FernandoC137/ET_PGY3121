import styles from "../style";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { jsPDF } from "jspdf";
import { useNavigate } from 'react-router-dom';

const CarritoMain = ({ darkMode }: { darkMode: boolean }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [carrito, setCarrito] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productos, setProductos] = useState<any[]>([]); // Estado para los productos
  const [total, setTotal] = useState(0);
  const [pageReloaded, setPageReloaded] = useState(false);
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    is_superuser: boolean;
  }>({
    username: "",
    email: "",
    is_superuser: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

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

    if (!pageReloaded) {
      setPageReloaded(true);
    }
  }, [pageReloaded]);

  useEffect(() => {
    const obtenerCarrito = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (userData.username) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/tienda/carrito/${userData.username}/`,
            config
          );
          const carritoData = response.data;
          console.log("Items del carrito:", carritoData);
          console.log("id del carrito", carritoData.codigo);
          const elementoIds = carritoData.elementos.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (elemento: any) => elemento.id
          );
          console.log("id", elementoIds);
          console.log(carrito)
          setCarrito(carritoData);

          const productos = await Promise.all(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            carritoData.elementos.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              async (item: { producto: any; cantidad: any }) => {
                const productoResponse = await axios.get(
                  `http://localhost:8000/api/tienda/productos/${item.producto}`,
                  config
                );
                return { ...productoResponse.data, cantidad: item.cantidad };
              }
            )
          );
          console.log("Productos:", productos);
          setProductos(productos);
          const total = productos.reduce(
            (sum, producto) => sum + producto.precio * producto.cantidad,
            0
          );
          setTotal(total);
        } catch (error) {
          console.error("Error al obtener el carrito:", error);
        }
      } else {
        console.log(
          "Nombre de usuario no definido, no se puede obtener el carrito"
        );
      }
    };
    obtenerCarrito();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const VaciarCarrito = async () => {
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
      const carritoData = response.data;
      console.log("Items del carrito:", carritoData);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elementoIds = carritoData.elementos.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (elemento: any) => elemento.id
      );
      console.log("Elemento IDs para eliminar:", elementoIds);

      await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        elementoIds.map(async (elementoId: any) => {
          console.log("Eliminando elemento con ID:", elementoId);
          await axios.delete(
            `http://localhost:8000/api/tienda/elementos/${elementoId}/`,
            config
          );
        })
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCarrito((prevCarrito: any) => {
        console.log("Carrito antes de actualizar:", prevCarrito);
        const elementosActualizados = prevCarrito.elementos.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (elemento: any) => !elementoIds.includes(elemento.id)
        );
        console.log("Elementos actualizados:", elementosActualizados);
        return { ...prevCarrito, elementos: elementosActualizados };
      });

      window.location.reload();
    } catch (error) {
      console.error(
        "Hubo un error al eliminar los objetos del carrito:",
        error
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actualizarStock = async (productoId: any, cantidad: number) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tienda/productos/${productoId}/`,
        config
      );
      const productoData = response.data;
      const nuevoStock = productoData.stock - cantidad;
  
      await axios.patch( // Cambia axios.put por axios.patch
        `http://localhost:8000/api/tienda/productos/${productoId}/`,
        { stock: nuevoStock }, // Solo envía el nuevo stock
        config
      );
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
    }
  };  

  const emitirBoleta = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Verificar stock
      const productosSinStock = [];
      for (const producto of productos) {
        const response = await axios.get(
          `http://localhost:8000/api/tienda/productos/${producto.codigo}/`,
          config
        );
        const productoData = response.data;
        if (productoData.stock < producto.cantidad) {
          productosSinStock.push(producto.nombre);
        }
      }

      if (productosSinStock.length > 0) {
        alert(
          "Los siguientes productos no tienen suficiente stock: " +
            productosSinStock.join(", ")
        );
        return;
      }

      // Continuar con la emisión de la boleta
      const carritoResponse = await axios.get(
        `http://localhost:8000/api/tienda/carrito/${userData.username}/`,
        config
      );
      const carritoData = carritoResponse.data;
      const carritoId = carritoData.codigo;

      const fechaCompra = new Date();

      const datosBoleta = {
        total: total,
        fechaCompra: fechaCompra,
        carrito: carritoId,
      };

      const boletaResponse = await axios.post(
        "http://localhost:8000/api/tienda/boletas/",
        datosBoleta,
        config
      );
      const boletaGenerada = boletaResponse.data;
      const boletaId = boletaGenerada.id_boleta;

      const detallesProductos = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        carritoData.elementos.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (item: { producto: any; cantidad: any }) => {
            const productoResponse = await axios.get(
              `http://localhost:8000/api/tienda/productos/${item.producto}`,
              config
            );
            const productoData = productoResponse.data;
            const subtotal = productoData.precio * item.cantidad;

            const detalleBoletaData = {
              cantidad: item.cantidad,
              subtotal: subtotal,
              id_boleta: boletaId,
              id_producto: productoData.codigo,
            };

            await axios.post(
              "http://localhost:8000/api/tienda/detalle_boleta/",
              detalleBoletaData,
              config
            );

            console.log("detalleboleta:" + detalleBoletaData);

            return {
              ...productoData,
              cantidad: item.cantidad,
              subtotal: subtotal,
            };
          }
        )
      );

      console.log("Boleta generada:", boletaGenerada);
      console.log("Detalles de boleta:", detallesProductos);

      for (const producto of detallesProductos) {
        await actualizarStock(producto.codigo, producto.cantidad);
      }  

      const doc = new jsPDF();
      doc.text("EcoSana - Boleta de Compra", 10, 10);
      doc.text(`Boleta ID: ${boletaId}`, 10, 20);
      doc.text(`Fecha de Compra: ${fechaCompra}`, 10, 30);
      doc.text(`Total: ${total}`, 10, 40);
      doc.text("Productos:", 10, 50);
      detallesProductos.forEach((producto, index) => {
        const y = 60 + index * 10;
        doc.text(`Nombre: ${producto.nombre}`, 10, y);
        doc.text(`Cantidad: ${producto.cantidad}`, 10, y + 10);
        doc.text(`Subtotal: ${producto.subtotal}`, 10, y + 20);
      });
      doc.save(`boleta ${userData.username} ${new Date}.pdf`);
      navigate('/Checkout');
      VaciarCarrito();
    } catch (error) {
      console.error("Error al emitir la boleta:", error);
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

  return (
    <section
      id="catalogmanager"
      className={`flex xl:flex-row flex-col md:mb-32 lg:mb-32 xl:mb-32 2xl:mb-32 3xl:mb-32 mb-16 mt-16 ${styles.paddingY}`}
    >
      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <div className={`px-6 xl:px-0 sm:px-16  `}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-center flex-1 font-poppins font-bold 3xs:text-[44px] 2xs:text-[52px] xs:text-[60px] sm:text-[68px] md:text-[68px] lg:text-[68px] xl:text-[68px] 2xl:text-[72px] 3xl:text-[72px] text-[40px] text-neutral-700 sm:leading-[90px] leading-[75px]  ${
              darkMode ? "dark" : ""
            } `}
          >
            Checkout
          </motion.h1>
        </div>
        <div className="px-6 mt-6 xl:px-0 sm:px-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${styles.heading2C}`}
          >
            Resumen de tu compra
          </motion.h2>
        </div>
        <div className="w-full mt-16 text-center">
          <ThemeProvider theme={theme}>
            <Button
              className="w-10/12 px-4 py-2 bg-green-500"
              onClick={() => VaciarCarrito()}
            >
              VACIAR CARRITO
            </Button>
          </ThemeProvider>
        </div>
        <div className="w-10/12 mt-12">
          {productos.map((producto, index) => (
            <div
              className={`p-4 mt-6 bg-white shadow-2xl rounded-xl`}
              key={index}
            >
              <h3 className={`text-neutral-700 p-2 ${styles.heading1G}`}>
                {producto.nombre}
              </h3>
              <p className={`px-2 text-neutral-400 ${styles.heading2D}`}>
                {producto.descripcion}
              </p>
              <p className={`px-2 text-green-500 ${styles.heading2D}`}>
                {"Precio unitario: " + producto.precio}
              </p>
              <p
                className={`px-2 text-neutral-500 bg-neutral-200 rounded-2xl ${styles.heading2D}`}
              >
                {"Total Producto: " + producto.precio * producto.cantidad}
              </p>
              <p className={`p-2 text-neutral-400 ${styles.paragraph1B}`}>
                Cantidad: {producto.cantidad}
              </p>
            </div>
          ))}
        </div>
        <div className="w-10/12 p-8 mt-16 text-center bg-green-500 lg:w-3/12 rounded-xl">
          <h2 className={`text-white w-full text-center ${styles.heading1E}`}>
            Total: ${total}
          </h2>
        </div>
        <div className="w-full mt-16 text-center">
          <ThemeProvider theme={theme}>
            <Button
              className="w-10/12 px-4 py-2 bg-green-500"
              onClick={emitirBoleta}
            >
              FINALIZAR COMPRA
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
};

export default CarritoMain;
