import styles from "./PlanChart.module.css";
import { PlanChart as _PlanChart } from "@/components";

const PlanChart = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>여행계획</p>
      <_PlanChart />
    </div>
  );
};

export default PlanChart;
