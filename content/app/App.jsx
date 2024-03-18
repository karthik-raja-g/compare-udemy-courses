import React, { useEffect } from "react";
import styles from "./styles.module.less";

const App = () => {
  useEffect(() => {
    console.log("FROM CONTENT");
  }, []);
  return <div className={styles.hello}><span>App</span></div>;
};

export default App;
