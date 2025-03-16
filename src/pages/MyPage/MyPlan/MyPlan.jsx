import { Slider,PlanCard } from "@/components";
import { APIEndPoints,PageEndPoints } from "@/constants";
import { useAxios, usePagination } from "@/hooks";
import { useEffect,useState } from "react";
import styles from "./MyPlan.module.css";
import { useSearchParams } from "react-router-dom";

const MyPlan = ({ title, fetchUrl}) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const { fetchData, response } = useAxios();
  const [items, setItems] = useState([]);


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

  return (
    <div className={styles.myplan_box}>
      <div className={styles.title_box}>
        <p className={styles.title}>{title}</p>
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
