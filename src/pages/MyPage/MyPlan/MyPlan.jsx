import { Slider,PlanCard, Button } from "@/components";
import { APIEndPoints,PageEndPoints } from "@/constants";
import { useAxios, usePagination } from "@/hooks";
import { useEffect,useState,useCallback } from "react";
import styles from "./MyPlan.module.css";
import { useNavigate } from "react-router-dom";

const MyPlan = ({ title, fetchUrl, goUrl, refreshTrigger }) => {
  const { fetchData, response } = useAxios();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchPlans = useCallback(async () => {
    await fetchData({
      method: "GET",
      url: fetchUrl,
      params: { page: 0 },
    }).then((res) => {
      console.log(res.data);
      setItems(res.data.items);
    });
  },[fetchData,fetchUrl]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans, title, fetchUrl, goUrl, refreshTrigger ]);

  const handleMoreClick = () => {
    navigate(goUrl);
  };

  return (
    <div className={styles.myplan_box}>
      <div className={styles.title_box}>
        <p className={styles.title}>{title}</p>
        <Button variant="none" onClick={handleMoreClick}>더보기</Button>
      </div>

      <Slider items={items} size="md">
        {(item) => (
          <>
            <PlanCard key={item.tripId} item={item} />
          </>
        )}
      </Slider>
    </div>
  );
};

export default MyPlan;
