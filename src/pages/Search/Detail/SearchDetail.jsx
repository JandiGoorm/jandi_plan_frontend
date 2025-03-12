import { Button, PlanCard, Loading } from "@/components";
import styles from "./SearhDetail.module.css";
import { useEffect, useState } from "react";
import { usePlans, usePagination } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";

const SearchDetail = ({ keyword }) => {
  const { plans, fetchPlans, getLoading } = usePlans();
  const [count, setCount] = useState();
  const navigate = useNavigate();

  const { setTotalPage } = usePagination();

  useEffect(() => {
    fetchPlans({ page: 0, keyword, category: "BOTH" }, setCount, setTotalPage);
  }, [fetchPlans, keyword, setTotalPage]);

  if (getLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header_title}>
          <p className={styles.title}>여행 플랜 검색 결과 {count}건</p>
        </div>

        {plans ? (
          <div className={styles.plan_container}>
            {plans.items.map((item) => (
              <PlanCard key={item.tripId} item={item} />
            ))}
          </div>
        ) : (
          <p>검색 결과가 없습니다</p>
        )}

        <div className={styles.button_box}>
          <Button
            variant={"ghost"}
            size="lg"
            onClick={() =>
              navigate(
                `${PageEndPoints.PLAN_LIST}?page=1&keyword=${encodeURIComponent(
                  keyword
                )}`
              )
            }
          >
            더보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;
