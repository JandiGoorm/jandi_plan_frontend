import { Button, EmptyItem, Loading, PlanCard } from "@/components";
import { PageEndPoints } from "@/constants";
import { useCommunity, usePlans } from "@/hooks";
import BoardItem from "@/pages/Board/BoardItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearhDetail.module.css";

const SearchDetail = ({ keyword }) => {
  const [count, setCount] = useState();
  const [communityCount, setCommunityCount] = useState();
  const navigate = useNavigate();

  const { plans, fetchPlans, getLoadings } = usePlans();
  const { communities, fetchCommunities, getLoading } = useCommunity();

  useEffect(() => {
    fetchPlans({ page: 0, keyword, category: "BOTH" }).then((res) =>
      setCount(res.data.pageInfo.totalSize || 0)
    );

    fetchCommunities({
      page: 0,
      keyword,
      category: "BOTH",
    }).then((res) => setCommunityCount(res.data.pageInfo.totalSize || 0));
  }, [fetchCommunities, fetchPlans, keyword]);

  if (getLoading || getLoadings) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.header_title}>
          <p className={styles.title}>여행 플랜 검색 결과 {count}건</p>
        </div>

        {plans && plans.items.length > 0 ? (
          <div className={styles.plan_container}>
            {plans.items.map((item) => (
              <PlanCard key={item.tripId} item={item} />
            ))}
          </div>
        ) : (
          <EmptyItem parentClassName={styles.empty} />
        )}

        {count > 10 && (
          <div className={styles.button_box}>
            <Button
              variant={"ghost"}
              size="lg"
              onClick={() =>
                navigate(
                  `${
                    PageEndPoints.PLAN_LIST
                  }?page=1&keyword=${encodeURIComponent(keyword)}`
                )
              }
            >
              더보기
            </Button>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.header_title}>
          <p className={styles.title}>게시판 검색 결과 {communityCount}건</p>
        </div>

        {communityCount > 0 ? (
          <div className={styles.content}>
            <ul className={styles.content_list}>
              {communities?.items.map((item) => {
                return <BoardItem item={item} key={item.postId} />;
              })}
            </ul>
          </div>
        ) : (
          <EmptyItem parentClassName={styles.empty} />
        )}

        {communityCount > 10 && (
          <div className={styles.button_box}>
            <Button
              variant={"ghost"}
              size="lg"
              onClick={() =>
                navigate(
                  `${
                    PageEndPoints.PLAN_LIST
                  }?page=1&keyword=${encodeURIComponent(keyword)}`
                )
              }
            >
              더보기
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchDetail;
