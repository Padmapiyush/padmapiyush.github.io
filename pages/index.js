import Terminal from "../components/Terminal";
import Playground from "../components/Playground";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>
        padmapiyush:$ <span className={styles.help}>type help to start</span>
      </h1>
      
      <Terminal />
      <Playground />
    </div>
  );
}
