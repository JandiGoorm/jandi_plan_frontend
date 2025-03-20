import { Slider,PlanCard, Button } from "@/components";
import { APIEndPoints,PageEndPoints } from "@/constants";
import { useAxios, usePagination } from "@/hooks";
import { useEffect,useState } from "react";
import styles from "./MyPlan.module.css";
import { useNavigate } from "react-router-dom";

const MyPlan = ({ title, fetchUrl}) => {
  const { fetchData, response } = useAxios();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchData({
      method: "GET",
      url: fetchUrl,
      params: { page: 0 },
    }).then((res) => {
      console.log(res.data);
      setItems(res.data.items);
    });
  }, [fetchData]);

  const handleMoreClick = () => {
    navigate(PageEndPoints.PLAN_LIST, {state: {fetchUrl}});
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
