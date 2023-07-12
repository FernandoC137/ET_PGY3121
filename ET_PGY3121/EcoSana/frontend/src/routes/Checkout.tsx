import { Nav, CheckoutSuccess, Footer } from "../components"
import styles from "../style";
import { useState, useEffect } from "react";

const Checkout = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.title = "Gracias por tu compra! | EcoSana";
  }, []);
  return (
    <div
      className={`bg-primary w-full overflow-hidden ${darkMode ? "dark" : ""}`}
    >
      <div
        className={`${styles.paddingX} ${styles.flexCenter} ${
          darkMode ? "dark" : ""
        }`}
      >
        <div className={`${styles.boxWidth} ${darkMode ? "dark" : ""}`}>
          <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>

      <div
        className={`bg-primary ${styles.flexStart} ${darkMode ? "dark" : ""}`}
      >
        <div className={`${styles.boxWidth} ${darkMode ? "dark" : ""}`}>
          <CheckoutSuccess darkMode={darkMode}/>
        </div>
      </div>

      <div
        className={`bg-primary ${styles.paddingX} ${styles.flexStart} ${
          darkMode ? "dark" : ""
        }`}
      >
        <div className={`${styles.boxWidth} ${darkMode ? "dark" : ""}`}>
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  )
}

export default Checkout