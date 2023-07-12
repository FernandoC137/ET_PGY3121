import { useState, useEffect } from "react";
import styles from "../style";
import { Nav, LandingAdmin ,Footer, AdminPageOptions } from "../components";

function AdminPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = 'EcoSana | Administracion';
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
          <LandingAdmin darkMode={darkMode}/>
          <AdminPageOptions darkMode={darkMode}/>
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

export default AdminPage;