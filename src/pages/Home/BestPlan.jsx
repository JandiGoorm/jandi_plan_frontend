import { Loading, PlanCard, Slider } from "@/components";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios, usePreventDragClick } from "@/hooks";
import { useCallback, useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import styles from "./BestPlan.module.css";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils";

const BestPlan = () => {
  const navigate = useNavigate();
  const { response, fetchData, loading } = useAxios();

  const { handleMouseDown, handleMouseUp } = usePreventDragClick();

  const callback = useCallback(
    (item) => {
      const path = buildPath(PageEndPoints.PLAN_DETAIL, {
        id: item.tripId,
      });
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    fetchData({ method: "GET", url: APIEndPoints.PLAN_BEST });
  }, [fetchData]);

  if (loading) return <Loading isSection={true} style={{ height: "18rem" }} />;
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
          <div
            onMouseDown={handleMouseDown}
            onMouseUp={(e) => handleMouseUp(e, () => callback(item))}
          >
            <PlanCard item={item} />
          </div>
        )}
      </Slider>
    </div>
  );
};

export default BestPlan;
