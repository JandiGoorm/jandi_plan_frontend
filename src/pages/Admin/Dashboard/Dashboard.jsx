import { useAxios } from "@/hooks";
import styles from "./Dashboard.module.css";
import { useEffect } from "react";
import { APIEndPoints } from "@/constants";
import PlanChart from "./PlanChart";
import UserChart from "./UserChart";

const map = {
  "전체 회원": "allUserCount",
  "최근 가입회원": "last7DaysUserCount",
  "전체 여행계획": "allTripCount",
  "전체 커뮤니티 글": "allCommunityCount",
};

const DashboardCard = () => {
  const { fetchData, response } = useAxios();

  useEffect(() => {
    fetchData({ url: APIEndPoints.MANAGE_UTIL, method: "GET" });
  }, [fetchData]);

  return (
    <div className={styles.container} id="dashboard">
      <p className={styles.title}>대시보드</p>

      <div className={styles.grid_container}>
        {Object.keys(map).map((key) => (
          <div className={styles.grid_item} key={key}>
            <p className={styles.grid_item_title}>{key}</p>
            <p className={styles.grid_item_value}>
              {response?.[map[key]] || "-"}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.charts_container}>
        <PlanChart />
        <UserChart />
      </div>
    </div>
  );
};

export default DashboardCard;
