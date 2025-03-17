import { FaCrown } from "react-icons/fa";
import styles from "./BestPlan.module.css";
import { useAxios } from "@/hooks";
import { PlanCard, Slider } from "@/components";
import { useCallback, useEffect } from "react";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils";

const BestPlan = () => {
  const { response, fetchData, loading } = useAxios();
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (id) => {
      const url = buildPath(PageEndPoints.PLAN_DETAIL, { id });
      navigate(url);
    },
    [navigate]
  );

  useEffect(() => {
    fetchData({ method: "GET", url: APIEndPoints.PLAN_BEST });
  }, [fetchData]);

  if (loading) return null;
  return (
    <div className={styles.container}>
      <div className={styles.slider_title_container}>
        <p className={styles.slider_title}>인기 여행플랜</p>
        <div className={styles.slider_subtitle}>
          <FaCrown size={20} className={styles.crown_icon} />
          <p>BEST 계획으로 모아뒀어요</p>
        </div>
      </div>

      <Slider items={response ?? []} size="md">
        {(item) => (
          <div onClick={() => handleNavigate(item.tripId)}>
            <PlanCard item={item} />
          </div>
        )}
      </Slider>
    </div>
  );
};

export default BestPlan;
