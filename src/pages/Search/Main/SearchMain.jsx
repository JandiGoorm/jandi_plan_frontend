import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./SearchMain.module.css";
import SearchTooltip from "./SearchTooltip";
import { FaCrown } from "react-icons/fa";
import { useSearch } from "@/hooks";
import { useEffect, useState } from "react";
import { Button, Input, Loading } from "@/components";


// pc는 포스팅 수 postCount를 의미하고 , sc는 검색 수 searchCount를 의미합니다.
const dummy = [
  { name: "Seoul", pc: 4000, sc: 4500 },
  { name: "Busan", pc: 3000, sc: 3000 },
  { name: "Dokyo", pc: 2000, sc: 2000 },
  { name: "NewYork", pc: 2780, sc: 2780 },
  { name: "Chicago", pc: 2390, sc: 2390 },
  { name: "서울", pc: 3490, sc: 3490 },
  { name: "부산", pc: 3490, sc: 3490 },
  { name: "도쿄", pc: 8090, sc: 5500 },
  { name: "뉴욕", pc: 8090, sc: 5500 },
  { name: "시카고", pc: 8090, sc: 5500 },
];

const SearchMain = () => {
  const {searchCount, getSearchCount, getLoading} = useSearch();

  useEffect(() => {
      getSearchCount();
    }, [getSearchCount]);
  
    console.log(searchCount);

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
