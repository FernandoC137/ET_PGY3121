import { useState } from "react";
import styles from "../style";
import { useEffect } from 'react';

import {
  Nav,
  HeroHome,
  SwiperSection,
  CTA,
  Paragraphs,
  Brief,
  Stats,
  Testimonial,
  Footer,
} from "../components";

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = 'EcoSana - Cultivando el futuro';
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
          <HeroHome darkMode={darkMode} />
          <SwiperSection />
          <CTA darkMode={darkMode} />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart} ${darkMode ? "dark" : ""}`}>
        <div className={`${styles.boxWidth} ${darkMode ? "dark" : ""}`}>
          <Paragraphs darkMode={darkMode} />
          <Brief darkMode={darkMode} />
          <Stats darkMode={darkMode} />
          <Testimonial darkMode={darkMode} />
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default Home;

