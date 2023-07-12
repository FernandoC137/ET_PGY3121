import { useState, useEffect } from "react";
import styles from "../style";

import {
  Nav,
  Footer,
  HeroTienda,
} from "../components";

function Tienda() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = 'Tienda | EcoSana';
  }, []);

  return (
    <div className={`bg-primary w-full overflow-hidden ${darkMode ? "dark" : ""}`}>
      <div className={`${styles.paddingX} ${styles.flexCenter} ${darkMode ? "dark" : ""}`}>
        <div className={`${styles.boxWidth} ${darkMode ? "dark" : ""}`}>
          <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart} ${darkMode ? "dark" : ""}`}>
        <div className={`${styles.boxWidth} ${darkMode ? "dark" : ""}`}>
          <HeroTienda darkMode={darkMode} />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart} ${darkMode ? "dark" : ""}`}>
        <div className={`${styles.boxWidth} ${darkMode ? "dark" : ""}`}>
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default Tienda;
