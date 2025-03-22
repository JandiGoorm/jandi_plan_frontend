import { APIEndPoints } from "@/constants";
import styles from "./SearchMain.module.css";
import { PlanChart } from "@/components";
import { useAxios } from "@/hooks";
import { useEffect } from "react";
import { FaCrown } from "react-icons/fa";

const SearchMain = () => {
  const { fetchData, response } = useAxios();

  useEffect(() => {
    fetchData({
      url: APIEndPoints.TRIP_SORT,
      method: "GET",
      params: { sort: "SEARCH" },
    });
  }, [fetchData]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <FaCrown className={styles.icon_crown} />
        <p> BEST TOP 10</p>
      </div>

      <div className={styles.chart_container}>
        <PlanChart data={response ?? []} />
      </div>
    </div>
  );
};

export default SearchMain;
