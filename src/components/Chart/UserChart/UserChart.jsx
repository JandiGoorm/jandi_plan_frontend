import styles from "./UserChart.module.css";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import UserTooltip from "./UserTooltip";

const UserChart = ({ data }) => {
  const flattendData = Object.entries(data).map(([key, value]) => {
    const [year, month] = key.split(" ");
    return {
      year,
      month,
      value,
    };
  });

  return (
    <ResponsiveContainer className={styles.responsive_container}>
      <BarChart
        margin={{
          right: 30,
        }}
        data={flattendData}
        className={styles.chart}
      >
        <XAxis
          dataKey="month"
          scale="point"
          padding={{ left: 25, right: 30 }}
          fontSize={"var(--text-sm)"}
        />
        <YAxis fontSize={"var(--text-sm)"} />
        <Legend />
        <Tooltip content={<UserTooltip />} />
        <Bar
          dataKey="value"
          name="월별 회원 가입자"
          fill="var(--color-chart-bar)"
          barSize={40}
          radius={[100, 100, 0, 0]}
          className={styles.bar}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserChart;
