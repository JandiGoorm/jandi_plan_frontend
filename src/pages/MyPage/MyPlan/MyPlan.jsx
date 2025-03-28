import { Button, Loading, PlanCard, Slider } from "@/components";
import { useAxios } from "@/hooks";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPlan.module.css";

const MyPlan = ({ title, fetchUrl, goUrl, refreshTrigger }) => {
  const { fetchData, response, loading } = useAxios();
  const navigate = useNavigate();

  const fetchPlans = useCallback(async () => {
    await fetchData({
      method: "GET",
      url: fetchUrl,
      params: { page: 0 },
    });
  }, [fetchData, fetchUrl]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans, title, fetchUrl, goUrl, refreshTrigger]);

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
          {(item) => <PlanCard key={item.tripId} item={item} />}
        </Slider>
      )}
    </div>
  );
};

export default MyPlan;
