import { useAxios } from "@/hooks";
import styles from "./UserChart.module.css";
import { useEffect } from "react";
import { APIEndPoints } from "@/constants";
import { UserChart as _UserChart } from "@/components";

const UserChart = () => {
  const { response, fetchData } = useAxios();

  useEffect(() => {
    fetchData({ url: APIEndPoints.MANAGE_MONTH_USER, method: "GET" });
  }, [fetchData]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>월별 회원가입</p>
      {response && <_UserChart data={response} />}
    </div>
  );
};

export default UserChart;
