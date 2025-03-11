import { Button, PlanCard, Loading } from "@/components";
import styles from "./SearhDetail.module.css";
import { useEffect, useState } from "react";
import { usePlans, usePagination, useCommunity } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { APIEndPoints, PageEndPoints } from "@/constants";
import BoardItem from "@/pages/Board/BoardItem";


const SearchDetail = ({ keyword }) => {
  const {plans, fetchPlans, getLoadings} = usePlans();
  const { communities, fetchCommunities, getLoading } = useCommunity();
  const [count, setCount] = useState();
  const [communityCount, setCommunityCount] = useState();
  const navigate = useNavigate();

  const { setTotalPage: setTotalPlanPage } = usePagination();
  const { setTotalPage: setTotalCommunityPage } = usePagination();


  useEffect(() => {
    fetchPlans(
      { page: 0, keyword, category: "BOTH"},
      setCount,
      setTotalPlanPage
    ),

    fetchCommunities(
      {
        page: 0, keyword, category: "BOTH"
      },
      setCommunityCount,
      setTotalCommunityPage,
    )

    console.log("검색어", keyword);
  }, [keyword]);

  console.log(communities);

  if(getLoading || getLoadings) {return <Loading />}
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
        ):(
          <p>검색 결과가 없습니다</p>
        )}
          <div className={styles.botton_box}>
            {count>10 &&
            <Button
              variant={"ghost"}
              size = "lg"
              onClick={() => navigate(`${PageEndPoints.PLAN_LIST}?page=1&keyword=${encodeURIComponent(keyword)}`)}
            >
              더보기
            </Button>
            }
          </div>
      </div>

      <div>
        <div className={styles.header_title}>
          <p className={styles.title}>게시판 검색 결과 {communityCount}건</p>
        </div>
        {communityCount>0 &&
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
        }
          <div className={styles.botton_box}>
          {communityCount>10 &&
            <Button
              variant={"ghost"}
              size = "lg"
              onClick={() => navigate(`${PageEndPoints.BOARD}?page=1&keyword=${encodeURIComponent(keyword)}`)}
            >
              더보기
            </Button>
            }
          </div>
      </div>

      
    </div>
  );
};

export default SearchDetail;
