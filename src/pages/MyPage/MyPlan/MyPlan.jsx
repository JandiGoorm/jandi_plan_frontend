import { Slider, PlanCard, Button } from "@/components";
import { PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useEffect } from "react";
import styles from "./MyPlan.module.css";
import { useNavigate } from "react-router-dom";

const MyPlan = ({ title, fetchUrl }) => {
  const { fetchData, response } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: fetchUrl,
      params: { page: 0 },
    });
  }, [fetchData, fetchUrl]);

  const handleMoreClick = () => {
    navigate(PageEndPoints.PLAN_LIST, { state: { fetchUrl } });
  };

  return (
    <div className={styles.myplan_box}>
      <div className={styles.title_box}>
        <p className={styles.title}>{title}</p>
        <Button variant="none" onClick={handleMoreClick}>
          더보기
        </Button>
      </div>

      <Slider items={response?.items ?? []} size="md">
        {(item) => <PlanCard key={item.tripId} item={item} />}
      </Slider>
    </div>
  );
};

export default MyPlan;
