import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import router from "next/router";

export default function Home() {
  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <div className={styles.container}>
      <span>Redirect...</span>
    </div>
  );
}
