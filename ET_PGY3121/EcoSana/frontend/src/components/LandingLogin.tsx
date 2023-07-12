import styles from "../style";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import TextField from "@mui/material/TextField";
import { Stack, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { obtenerImagenes } from "../api";
import axios from "axios";

interface Imagen {
  id: number;
  imagen: string;
  nombre: string;
}

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const LandingLogin = () => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerImagenes()
      .then((data) => setImagenes(data))
      .catch((error) => console.log(error));
  }, []);

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: false,
    password: false,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      try {
        const response = await client.post("/api/users/login/", {
          username: formValues.username,
          password: formValues.password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        if (token) {
          console.log("Token almacenado:", token);
          navigate("/");
        } else {
          console.log("No se encontró ningún token almacenado.");
        }
        setShowSuccessAlert(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error.response);
        window.alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      }
    } else {
      window.alert("Existen errores en el formulario. Por favor, revíselo.");
    }
  };
  const handleClearForm = () => {
    setFormValues({
      username: "",
      password: "",
    });
    setFormErrors({
      username: false,
      password: false,
    });
  };

  const validateForm = () => {
    const errors = {
      username: false,
      password: false,
    };

    if (formValues.username.trim() === "") {
      errors.username = true;
    }

    if (formValues.password.trim() === "") {
      errors.password = true;
    }

    return errors;
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
      id="landing-login"
      className={`flex md:flex-row flex-col 3xs:h-screen h-[768px]`}
    >
      <div
        className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6 h-[100%]`}
      >
        <div className="mb-4">
          <ForestOutlinedIcon
            style={{
              fontSize: 64,
              color: "#fff",
              backgroundColor: "#22c55e",
              padding: 12,
              marginBottom: 32,
              borderRadius: 12,
            }}
          />
        </div>
        <div className="mb-2">
          <h1 className={`${styles.heading1D}`}>Accede</h1>
        </div>
        <div className={`${styles.heading2C} text-center`}>
          <p>a tu cuenta EcoSana</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-6 mt-8">
          <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
              <TextField
                name="username"
                label="Nombre de usuario"
                variant="outlined"
                className="mb-4"
                fullWidth
                value={formValues.username}
                onChange={handleInputChange}
                error={formErrors.username}
                helperText={formErrors.username && "Campo obligatorio"}
              />
              <div className="mb-4"></div>
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                className="mb-4"
                fullWidth
                value={formValues.password}
                onChange={handleInputChange}
                error={formErrors.password}
                helperText={formErrors.password && "Campo obligatorio"}
              />
              <div className="mb-4"></div>
              {showSuccessAlert ? (
                <Alert severity="success">
                  <AlertTitle>Redireccionando...</AlertTitle>
                </Alert>
              ) : (
                <div className="flex-row justify-center mt-16 3xs:flex">
                  <ThemeProvider theme={buttonTheme}>
                    <Stack spacing={2} direction="row">
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
                      >
                        Login
                      </Button>
                      <Link to="/">
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={handleClearForm}
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
                          className="ml-4"
                        >
                          Volver
                        </Button>
                      </Link>
                    </Stack>
                  </ThemeProvider>
                </div>
              )}
            </form>
          </ThemeProvider>
        </div>
        <div
          className={`text-center text-[14px] font-poppins text-gray-400 font-medium py-2`}
        >
          No tienes una cuenta?
          <Link to="/SignUp" className="hover:text-green-500">
            {" "}
            Sign up
          </Link>
        </div>
      </div>
      <div className="hidden p-6 xl:block"></div>
      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-[1] xl:block hidden`}
      >
        <img src={imagenes[8]?.imagen} className="h-[100%]" />
      </div>
    </section>
  );
};

export default LandingLogin;
