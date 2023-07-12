import React, { useEffect, useState } from "react";
import styles from "../style";

const Clock: React.FC<{ darkMode: boolean }> = ({ darkMode })  => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return (
    <section className={`${styles.flexCenter} mt-40 mb-44 text-center`}>
    <div className={`flex items-center justify-center bg-neutral-200 py-8 px-10 rounded-2xl ${darkMode ? 'dark-card' : ''} `}>
      <div className={`${styles.heading1B} ${darkMode ? 'dark-card' : ''}`}>
        {formattedTime}
      </div>
    </div>
    </section>
  );
};

export default Clock;

