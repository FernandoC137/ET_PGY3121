import { LandingSignUp } from "../components";
import styles from "../style";
import { useEffect } from "react";

const SignUp = () => {

  useEffect(() => {
    document.title = 'Registro | EcoSana';
  }, []);

  return (
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <LandingSignUp />
      </div>
    </div>
  );
};

export default SignUp;