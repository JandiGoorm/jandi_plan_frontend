import { Button, Loading, PlanCard } from "@/components";
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
        <div className={styles.botton_box}>
          {count > 10 && (
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
          )}
        </div>
      </div>

      <div>
        <div className={styles.header_title}>
          <p className={styles.title}>게시판 검색 결과 {communityCount}건</p>
        </div>
        {communityCount > 0 && (
          <div className={styles.content}>
            <div className={styles.content_header}>
              <div className={styles.index}>번호</div>
              <div className={styles.community_title}>제목</div>
              <div className={styles.writer}>작성자</div>
              <div className={styles.date}>작성일</div>
              <div className={styles.recommend}>추천</div>
            </div>

            <ul className={styles.content_list}>
              {communities?.items.map((item) => {
                return <BoardItem item={item} key={item.postId} />;
              })}
            </ul>
          </div>
        )}
        <div className={styles.botton_box}>
          {communityCount > 10 && (
            <Button
              variant={"ghost"}
              size="lg"
              onClick={() =>
                navigate(
                  `${PageEndPoints.BOARD}?page=1&keyword=${encodeURIComponent(
                    keyword
                  )}`
                )
              }
            >
              더보기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;
