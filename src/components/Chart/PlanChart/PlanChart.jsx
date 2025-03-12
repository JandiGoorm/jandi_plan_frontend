import { useSearch } from "@/hooks";
import styles from "./PlanChart.module.css";
import PlanTooltip from "./PlanTooltip";
import { useEffect } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const PlanChart = () => {
  const { searchCount, getSearchCount } = useSearch();

  useEffect(() => {
    getSearchCount();
  }, [getSearchCount]);

  return (
    <ResponsiveContainer className={styles.responsive_container}>
      <BarChart
        margin={{
          right: 30,
        }}
        data={searchCount}
        className={styles.chart}
      >
        <XAxis
          dataKey="name"
          scale="point"
          padding={{ left: 25, right: 30 }}
          fontSize={"var(--text-sm)"}
        />
        <YAxis fontSize={"var(--text-sm)"} />
        <Legend />
        <Tooltip content={<PlanTooltip />} />
        <Bar
          dataKey="searchCount"
          name="검색 수"
          fill="var(--color-chart-bar)"
          barSize={40}
          radius={[100, 100, 0, 0]}
          className={styles.bar}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PlanChart;
