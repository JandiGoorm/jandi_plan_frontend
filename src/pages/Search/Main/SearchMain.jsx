import { Loading } from "@/components";
import { useSearch } from "@/hooks";
import { useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./SearchMain.module.css";
import SearchTooltip from "./SearchTooltip";

const SearchMain = () => {
  const { searchCount, getSearchCount, getLoading } = useSearch();

  useEffect(() => {
    getSearchCount();
  }, [getSearchCount]);

  return (
    <div className={styles.container}>
      {getLoading && <Loading />}
      <div className={styles.title}>
        <FaCrown className={styles.icon_crown} />
        <p> BEST TOP 10</p>
      </div>

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
          <Tooltip content={<SearchTooltip />} />
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
    </div>
  );
};

export default SearchMain;
