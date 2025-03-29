import { Button, Loading, PlanCard, Slider } from "@/components";
import { useAxios, usePreventDragClick } from "@/hooks";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPlan.module.css";
import { buildPath } from "@/utils";
import { PageEndPoints } from "@/constants";
import { useAuth } from "@/contexts";

const MyPlan = ({ title, fetchUrl, goUrl }) => {
  const { fetchData, response, loading } = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const fetchPlans = useCallback(async () => {
    await fetchData({
      method: "GET",
      url: fetchUrl,
      params: { page: 0 },
    });
  }, [fetchData, fetchUrl]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans, title, fetchUrl, goUrl, user]);

  const handleMoreClick = () => {
    navigate(goUrl);
  };

  return (
    <div className={styles.myplan_box}>
      <div className={styles.title_box}>
        <p className={styles.title}>{title}</p>
        <Button variant="none" onClick={handleMoreClick}>
          더보기
        </Button>
      </div>

      {loading ? (
        <Loading
          isSection
          style={{
            minHeight: "24rem",
          }}
        />
      ) : (
        <Slider items={response?.items ?? []} size="md">
          {(item) => (
            <div
              onMouseDown={handleMouseDown}
              onMouseUp={(e) => handleMouseUp(e, () => callback(item))}
            >
              <PlanCard key={item.tripId} item={item} />
            </div>
          )}
        </Slider>
      )}
    </div>
  );
};

export default MyPlan;
