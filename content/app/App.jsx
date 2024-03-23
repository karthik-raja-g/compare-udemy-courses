import React, { useEffect } from "react";
import styles from "./styles.module.less";
import icn from "../assets/compareIcon.png";

const App = () => {
  useEffect(() => {
    console.log("FROM CONTENT");
  }, []);
  return (
    <div className={styles.float}>
      <img src={icn} alt="icon" />
      <span className={styles.count}>5</span>
    </div>
  );
};

export default App;
