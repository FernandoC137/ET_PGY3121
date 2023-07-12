import { motion } from "framer-motion";
import styles from "../style";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Link } from "react-router-dom";

const CheckoutSuccess = ({ darkMode }: { darkMode: boolean }) => {
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
            Gracias por tu <span className="hero-text-gradient">Compra!</span>
          </motion.h1>
        </div>
        <div className="px-6 mt-6 xl:px-0 sm:px-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${styles.heading2C} text-center`}
          >
            Tu boleta ya se encuentra en la bandeja de descargas
            <br />
            Ante dudas o consultas visita el centro de ayuda.
          </motion.h2>
        </div>
        <div className="mt-16">
          <CheckCircleOutlineOutlinedIcon
            style={{ fontSize: 72, color: "#22c55e" }}
          />
        </div>
        <div className="mt-24 mb-6">
          <ThemeProvider theme={buttonTheme}>
            <Link to="/">
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
              >
                Volver
              </Button>
            </Link>
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
