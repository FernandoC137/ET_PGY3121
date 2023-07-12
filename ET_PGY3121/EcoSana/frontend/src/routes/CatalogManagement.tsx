import { useState, useEffect } from "react";
import styles from "../style";
import { Nav, CatalogManager, Footer } from "../components";

function CatalogManagement() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = "EcoSana | Catalog Management";
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
          <CatalogManager darkMode={darkMode} />
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
  );
}

export default CatalogManagement;
