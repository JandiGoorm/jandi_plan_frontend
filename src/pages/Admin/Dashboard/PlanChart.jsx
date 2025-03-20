import { PlanChart as _PlanChart } from "@/components";
import styles from "./PlanChart.module.css";
import { useAxios } from "@/hooks";
import { useEffect } from "react";
import { APIEndPoints } from "@/constants";

const PlanChart = () => {
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
      <p className={styles.title}>많이 검색된 도시</p>
      {response && <_PlanChart data={response} />}
    </div>
  );
};

export default PlanChart;
