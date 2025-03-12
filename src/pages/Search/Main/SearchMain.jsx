import styles from "./SearchMain.module.css";
import { PlanChart } from "@/components";
import { FaCrown } from "react-icons/fa";

const SearchMain = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <FaCrown className={styles.icon_crown} />
        <p> BEST TOP 10</p>
      </div>

      <div className={styles.chart_container}>
        <PlanChart />
      </div>
    </div>
  );
};

export default SearchMain;
