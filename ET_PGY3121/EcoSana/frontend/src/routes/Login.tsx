import { LandingLogin } from "../components";
import styles from "../style";
import { useEffect } from "react";

const Login = () => {

  useEffect(() => {
    document.title = 'Login | EcoSana';
  }, []);

  return (
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <LandingLogin />
      </div>
    </div>
  );
};

export default Login;
