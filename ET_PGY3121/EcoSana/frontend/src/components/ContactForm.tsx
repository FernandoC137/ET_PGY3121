import React, { useState } from "react";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Stack, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "../style";
import { socialMedia } from "../constants";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface SocialMediaItem {
  id: string;
  icon: string;
  url: string;
}

const ContactForm: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    message: false,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleClick = (id: string) => {
    const socialItem = socialMedia.find((social) => social.id === id);
    if (socialItem) {
      window.open(socialItem.url, "_blank");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      // Simulate sending form data
      setTimeout(() => {
        setShowSuccessAlert(true);
      }, 1000);
    } else {
      window.alert("Existen errores en el formulario. Por favor, revíselo.");
    }
  };

  const handleClearForm = () => {
    setFormValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    setFormErrors({
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      message: false,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      message: false,
    };

    if (formValues.firstName.trim() === "") {
      errors.firstName = true;
    }

    if (formValues.lastName.trim() === "") {
      errors.lastName = true;
    }

    if (formValues.email.trim() === "" || !validateEmail(formValues.email)) {
      errors.email = true;
    }

    if (formValues.phone.trim() === "") {
      errors.phone = true;
    }

    if (formValues.message.trim() === "") {
      errors.message = true;
    }

    return errors;
  };

  const validateEmail = (email: string) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      id="contacto"
      className={`flex lg:flex-row flex-col mt-32 ${styles.paddingY} ${
        darkMode ? "dark" : ""
      }`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 mb-4`}
      >
        <div className="flex flex-row bg-green-200 items-center py-[6px] px-4 rounded-[20px] mb-8 font-poppins">
          <span className="text-xs font-bold text-green-500 uppercase">
            Contacto
          </span>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className={`${styles.heading1D} ${darkMode ? "dark" : ""}`}>
            Mantengámonos Comunicados
            <div className="mt-6">
              <h2 className={`${styles.heading2C}`}>
                A través de nuestras redes o déjanos un mensaje abajo
              </h2>
            </div>
          </h1>
        </div>
        <div className="mt-16">
          <div
            className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative z-10`}
          >
            <div className="grid grid-cols-2 gap-16">
              <div className="text-left">
                <div>
                  <MailOutlineOutlinedIcon
                    style={{
                      fontSize: 52,
                      color: "#fff",
                      backgroundColor: "#22c55e",
                      padding: 12,
                      marginBottom: 32,
                      borderRadius: 50,
                    }}
                  />
                </div>
                <div>
                  <h1
                    className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}
                  >
                    Email
                  </h1>
                </div>
                <div className="mt-4">
                  <p
                    className={`${styles.paragraph1C} text-[13px] 3xs:text-[17px]`}
                  >
                    contacto @ecosana.com
                  </p>
                </div>
              </div>
              <div className="text-left">
                <div>
                  <LocalPhoneOutlinedIcon
                    style={{
                      fontSize: 52,
                      color: "#fff",
                      backgroundColor: "#22c55e",
                      padding: 12,
                      marginBottom: 32,
                      borderRadius: 50,
                    }}
                  />
                </div>
                <div>
                  <h1
                    className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}
                  >
                    Fono
                  </h1>
                </div>
                <div className="mt-4">
                  <p
                    className={`${styles.paragraph1C} text-[13px] 3xs:text-[17px]`}
                  >
                    +56(2)1111-2222
                  </p>
                </div>
              </div>
              <div className="text-left">
                <div>
                  <LocationOnOutlinedIcon
                    style={{
                      fontSize: 52,
                      color: "#fff",
                      backgroundColor: "#22c55e",
                      padding: 12,
                      marginBottom: 32,
                      borderRadius: 50,
                    }}
                  />
                </div>
                <div>
                  <h1
                    className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}
                  >
                    Dirección
                  </h1>
                </div>
                <div className="mt-4">
                  <p
                    className={`${styles.paragraph1C} text-[13px] 3xs:text-[17px]`}
                  >
                    12190, [Calle de Ejemplo]
                  </p>
                  <p
                    className={`${styles.paragraph1C} text-[13px] 3xs:text-[17px]`}
                  >
                    Santiago, CL 8340518
                  </p>
                </div>
              </div>
              <div className="text-left">
                <div>
                  <AppsOutlinedIcon
                    style={{
                      fontSize: 52,
                      color: "#fff",
                      backgroundColor: "#22c55e",
                      padding: 12,
                      marginBottom: 32,
                      borderRadius: 50,
                    }}
                  />
                </div>
                <div>
                  <h1
                    className={`${styles.heading1E} ${darkMode ? "dark" : ""} `}
                  >
                    Redes
                  </h1>
                </div>
                <div className="mt-4">
                  <div className="flex-row mt-6 2xs:flex md:mt-0">
                    {socialMedia.map(
                      (social: SocialMediaItem, index: number) => (
                        <button
                          key={social.id}
                          onClick={() => handleClick(social.id)}
                          className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                            index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                          }`}
                        >
                          <img
                            src={social.icon}
                            alt={social.id}
                            style={{ cursor: "pointer" }}
                          />
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4"></div>
      <div
        className={`flex-1 rounded-2xl shadow-2xl 3xs:p-10 2xs:p-8 xs:p-8 sm:p-8 md:-p8 lg:p-8 xl:p-0 2xl:p-0 3xl:p-0 p-8 ${
          darkMode ? "dark dark-form" : ""
        } `}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
              <TextField
                name="firstName"
                label="Nombres"
                variant="outlined"
                className="mb-4"
                fullWidth
                value={formValues.firstName}
                onChange={handleInputChange}
                error={formErrors.firstName}
                helperText={formErrors.firstName && "Campo obligatorio"}
              />
              <div className="mb-4"></div>
              <TextField
                name="lastName"
                label="Apellidos"
                variant="outlined"
                className="mb-4"
                fullWidth
                value={formValues.lastName}
                onChange={handleInputChange}
                error={formErrors.lastName}
                helperText={formErrors.lastName && "Campo obligatorio"}
              />
              <div className="mb-4"></div>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                className="mb-4"
                fullWidth
                value={formValues.email}
                onChange={handleInputChange}
                error={formErrors.email}
                helperText={
                  formErrors.email ? "Ingrese un correo electrónico válido" : ""
                }
              />
              <div className="mb-4"></div>
              <TextField
                name="phone"
                label="Fono"
                variant="outlined"
                className="mb-4"
                fullWidth
                value={formValues.phone}
                onChange={handleInputChange}
                error={formErrors.phone}
                helperText={formErrors.phone && "Campo obligatorio"}
              />
              <div className="mb-4"></div>
              <TextField
                name="message"
                label="Mensaje"
                variant="outlined"
                className="mb-4"
                fullWidth
                multiline
                rows={4}
                value={formValues.message}
                onChange={handleInputChange}
                error={formErrors.message}
                helperText={formErrors.message && "Campo obligatorio"}
              />
              <div className="mb-4"></div>
              {showSuccessAlert ? (
                <Alert severity="success">
                  <AlertTitle>¡Mensaje enviado con éxito!</AlertTitle>
                  Nos pondremos en contacto contigo lo antes posible.
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
                        Enviar
                      </Button>
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
                        Limpiar
                      </Button>
                    </Stack>
                  </ThemeProvider>
                </div>
              )}
            </form>
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
