import { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../style";
import TextField from "@mui/material/TextField";

interface Producto {
  codigo: number;
  imagen: Blob;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string;
  stock: number;
}

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const CatalogManager = ({ darkMode }: { darkMode: boolean }) => {
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

  console.log("userData:", userData);

  const [products, setProducts] = useState<Producto[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Producto>>({
    codigo: 0,
    imagen: new Blob(),
    nombre: "",
    precio: 0,
    descripcion: "",
    categoria: "",
    stock: 0,
  });

  const [formValues, setFormValues] = useState({
    codigo: 0,
    imagen: new Blob(),
    nombre: "",
    precio: 0,
    descripcion: "",
    categoria: "",
    stock: 0,
  });

  const [formErrors, setFormErrors] = useState({
    codigo: false,
    imagen: false,
    nombre: false,
    precio: false,
    descripcion: false,
    categoria: false,
    stock: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClearForm = () => {
    setFormValues({
      codigo: 0,
      imagen: new Blob(),
      nombre: "",
      precio: 0,
      descripcion: "",
      categoria: "",
      stock: 0,
    });
    setFormErrors({
      codigo: false,
      imagen: false,
      nombre: false,
      precio: false,
      descripcion: false,
      categoria: false,
      stock: false,
    });
  };

  const fetchProducts = async () => {
    try {
      const response = await client.get("/api/tienda/productos/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirmDelete) {
      try {
        await client.delete(`/api/tienda/productos/${productId}`);
        fetchProducts();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const handleUpdateProduct = async (productId: number) => {
    try {
      const formData = new FormData();
      formData.append("codigo", String(formValues.codigo));
      if (newProduct.imagen) {
        formData.append("imagen", newProduct.imagen, newProduct.imagen.name);
      }
      formData.append("nombre", formValues.nombre);
      formData.append("precio", String(formValues.precio));
      formData.append("descripcion", formValues.descripcion);
      formData.append("categoria", formValues.categoria);
      formData.append("stock", String(formValues.stock));

      const response = await client.put(
        `/api/tienda/productos/${productId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const validateForm = () => {
    const errors = {
      codigo: false,
      imagen: false,
      nombre: false,
      precio: false,
      descripcion: false,
      categoria: false,
      stock: false,
    };

    if (formValues.codigo === 0) {
      errors.codigo = true;
    }

    if (formValues.nombre.trim() === "") {
      errors.nombre = true;
    }

    if (formValues.precio === 0) {
      errors.precio = true;
    }

    if (formValues.descripcion.trim() === "") {
      errors.descripcion = true;
    }

    if (formValues.categoria.trim() === "") {
      errors.categoria = true;
    }
    if (formValues.stock === 0) {
      errors.stock = true;
    }
    return errors;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setNewProduct({ ...newProduct, imagen: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("codigo", String(formValues.codigo));
    if (newProduct.imagen) {
      formData.append("imagen", newProduct.imagen, newProduct.imagen.name);
    }
    formData.append("nombre", formValues.nombre);
    formData.append("precio", String(formValues.precio));
    formData.append("descripcion", formValues.descripcion);
    formData.append("categoria", formValues.categoria);
    formData.append("stock", String(formValues.stock));

    const errors = validateForm();
    setFormErrors(errors);
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      setFormValues({
        codigo: 0,
        imagen: new Blob(),
        nombre: "",
        precio: 0,
        descripcion: "",
        categoria: "",
        stock: 0,
      });

      try {
        const response = await client.post("/api/tienda/productos/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        window.location.reload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error.response);
        window.alert(
          "Error al registrar el producto. Por favor, inténtalo de nuevo."
        );
      }
    } else {
      window.alert("Existen errores en el ingreso. Corroboren los datos.");
    }
  };

  const parseNumber = (value: string): number => {
    const parsedValue = parseInt(value);
    return isNaN(parsedValue) ? 0 : parsedValue;
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
            Administrar <span className="hero-text-gradient">Catálogo</span>{" "}
          </motion.h1>
        </div>
        <div className="px-6 mt-6 xl:px-0 sm:px-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${styles.heading2C}`}
          >
            Modifica el catalogo de productos
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`w-full bg-gray-600 md:w-11/12 mt-36 rounded-2xl  ${
            darkMode ? "dark-card" : ""
          } `}
        >
          <div className="mt-24 mb-6 text-center">
            <h1 className={`${styles.heading1D} text-white`}>
              Items en sistema
            </h1>
            <h2
              className={`text-center mt-4 text-green-200 ${styles.paragraph1B}`}
            >
              Para actualizar un producto, ingrese los datos en el formulario
              <br />y luego pulsa "Actualizar" en el producto deseado.
            </h2>
          </div>
          <div
            className={`shadow-2xl rounded-3xl p-6 md:p-8 lg:p-10 ${styles.flexCenter}`}
          >
            <ul className="w-11/12">
              {products.map((product) => (
                <li
                  className="px-10 py-4 mb-6 bg-white rounded-lg shadow-lg"
                  key={product.codigo}
                >
                  <div className={`flex-auto ${styles.heading1G} mb-4 mt-4`}>
                    <h1 className="py-2">{"Producto: " + product.nombre}</h1>
                    <h1 className="text-green-500">
                      {"Precio: " + "$" + product.precio}
                    </h1>
                  </div>
                  <div className={`${styles.heading2D}`}>
                    {product.descripcion}
                  </div>
                  <div className={`text-green-300 mt-2 ${styles.heading2D}`}>
                    {"Stock: " + product.stock}
                  </div>
                  <div className={`text-neutral-300 mt-2 ${styles.heading2D}`}>
                    {"Codigo: " + product.codigo}
                  </div>
                  <div className="mt-6 mb-6">
                    <Stack spacing={2} direction={"row"}>
                      <ThemeProvider theme={buttonTheme}>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          size="large"
                          style={{
                            backgroundColor: "rgba(34, 197, 94, 1)",
                            color: "#fff",
                            fontSize: "14px",
                            paddingTop: "6px",
                            paddingBottom: "6px",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                          }}
                          onClick={() => handleDeleteProduct(product.codigo)}
                        >
                          Eliminar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          style={{
                            backgroundColor: "rgba(34, 197, 94, 1)",
                            color: "#fff",
                            fontSize: "14px",
                            paddingTop: "6px",
                            paddingBottom: "6px",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                          }}
                          onClick={() => handleUpdateProduct(product.codigo)}
                        >
                          Actualizar
                        </Button>
                      </ThemeProvider>
                    </Stack>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`w-full bg-gray-600 md:w-11/12 mt-36 rounded-2xl   ${
            darkMode ? "dark-card" : ""
          }  `}
        >
          <div className="mt-24 mb-2 text-center">
            <h1 className={`${styles.heading1D} text-white`}>
              Formulario de Ingreso
            </h1>
            <h2 className={`text-center mt-4 ${styles.heading2B}`}>
              Agrega o actualiza productos
            </h2>
          </div>
          <div
            className={`shadow-2xl rounded-3xl p-6 md:p-8 lg:p-10 ${styles.flexCenter}`}
          >
            <div className="w-full md:w-10/12 xl:w-8/12">
              <div className="flex flex-col items-center justify-center w-full p-4 mt-8 mb-6 bg-white 3xs:p-6 rounded-xl">
                <ThemeProvider theme={theme}>
                  <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="w-full max-w-lg my-6"
                  >
                    <div className="flex-row justify-center xs:flex "></div>
                    <TextField
                      name="codigo"
                      label="Codigo"
                      variant="outlined"
                      className="mb-4"
                      fullWidth
                      value={formValues.codigo}
                      error={formErrors.codigo}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          codigo: parseNumber(e.target.value),
                        })
                      }
                      helperText={formErrors.codigo && "Campo obligatorio"}
                    />
                    <div className="mb-4"></div>
                    <input
                      type="file"
                      name="imagen"
                      className="w-full p-3 mb-4 rounded-xl bg-neutral-200 font-regular font-poppins"
                      onChange={handleImageChange}
                    />
                    <TextField
                      name="nombre"
                      label="Nombre Producto"
                      variant="outlined"
                      className="mb-4"
                      fullWidth
                      value={formValues.nombre}
                      error={formErrors.nombre}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          nombre: e.target.value,
                        })
                      }
                      helperText={formErrors.nombre && "Campo obligatorio"}
                    />
                    <div className="mb-4"></div>
                    <TextField
                      name="precio"
                      label="Precio"
                      variant="outlined"
                      className="mb-4"
                      fullWidth
                      value={formValues.precio}
                      error={formErrors.precio}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          precio: parseNumber(e.target.value),
                        })
                      }
                      helperText={formErrors.precio && "Campo obligatorio"}
                    />
                    <div className="mb-4"></div>
                    <TextField
                      name="descripcion"
                      label="Descripcion"
                      variant="outlined"
                      className="mb-4"
                      fullWidth
                      value={formValues.descripcion}
                      error={formErrors.descripcion}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          descripcion: e.target.value,
                        })
                      }
                      helperText={formErrors.descripcion && "Campo obligatorio"}
                    />
                    <div className="mb-4"></div>
                    <TextField
                      name="categoria"
                      label="Categoria"
                      variant="outlined"
                      className="mb-4"
                      fullWidth
                      value={formValues.categoria}
                      error={formErrors.categoria}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          categoria: e.target.value,
                        })
                      }
                      helperText={formErrors.categoria && "Campo obligatorio"}
                    />
                    <div className="mb-4"></div>
                    <TextField
                      name="stock"
                      label="Stock"
                      variant="outlined"
                      className="mb-4"
                      fullWidth
                      value={formValues.stock}
                      error={formErrors.stock}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          stock: parseNumber(e.target.value),
                        })
                      }
                      helperText={formErrors.stock && "Campo obligatorio"}
                    />
                    <div className="mb-4"></div>
                    <div className="w-full p-3 text-center rounded-xl text-neutral-700 font-poppins bg-neutral-200">Todos los campos son obligatorios</div>
                    <div className="flex-row justify-center mt-16 xs:flex ">
                      <ThemeProvider theme={buttonTheme}>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          size="large"
                          style={{
                            backgroundColor: "rgba(34, 197, 94, 1)",
                            color: "#fff",
                            fontSize: "14px",
                            paddingTop: "6px",
                            paddingBottom: "6px",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                          }}
                          className="w-full xs:w-[25%]"
                        >
                          Registrar
                        </Button>
                        <div className="p-2"></div>
                        <Link to="#" onClick={handleClearForm}>
                          <Button
                            variant="contained"
                            color="inherit"
                            size="large"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 1)",
                              color: "#404040",
                              fontSize: "14px",
                              paddingTop: "6px",
                              paddingBottom: "6px",
                              paddingLeft: "30px",
                              paddingRight: "30px",
                            }}
                            className="w-full ml-4 xs:[40%]"
                          >
                            Limpiar
                          </Button>
                        </Link>
                      </ThemeProvider>
                    </div>
                  </form>
                </ThemeProvider>
              </div>
            </div>
          </div>
        </motion.div>
        <ThemeProvider theme={buttonTheme}>
          <Link to="/AdminPage" className="mt-16">
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
            >
              Volver
            </Button>
          </Link>
        </ThemeProvider>
      </div>
    </section>
  );
};

export default CatalogManager;
