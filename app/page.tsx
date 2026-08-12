// import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Tasks</h1>
        <p className={styles.subtitle}>
          Manage your tasks effectively with our beautiful board.
        </p>
      </div>
    </div>
  );
}
