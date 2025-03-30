import { Button, Input, Loading, Pagination, PlanCard } from "@/components";
import { PageEndPoints,APIEndPoints } from "@/constants";
import { usePagination, usePlans } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { useEffect,useMemo, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MyPlanList.module.css";
import { buildPath } from "@/utils";

const PlanList = () => {
  const { currentPage, totalPage, setTotalPage, handlePageChange } = usePagination();
  const {userPlans, fetchUserPlans, getLoading } = usePlans();
  const navigate = useNavigate();
  const location = useLocation();
  const [dest, setDest]= useState();

  const fetchUrl = useMemo(() => {
    const pathParts = location.pathname.split("/"); // [ "", "plan", "my", "list" ]
    const secondSegment = pathParts[2] || ""; // "my" or ""
    const destSegment = pathParts[3] || "list";
    const decodedDestSegment = decodeURIComponent(destSegment);  // URL 디코딩

    console.log(decodedDestSegment);
    if (decodedDestSegment !== "list") {
      setDest(decodedDestSegment);
    }

    return secondSegment === "my" ? APIEndPoints.TRIP_MY : secondSegment === "like" ? APIEndPoints.TRIP_LIKED : APIEndPoints.TRIP_SEARCH;
  }, [location.pathname]);

  const handleNavigate = useCallback(
    (id) => {
      const path = buildPath(PageEndPoints.PLAN_DETAIL, { id });
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    if (!fetchUrl) return;

    if(fetchUrl===APIEndPoints.TRIP_SEARCH){
      fetchUserPlans(fetchUrl, {page: currentPage - 1, category:"CITY", keyword: dest}).then((res) =>{
        setTotalPage(res.data.pageInfo.totalPages || 0)
      });
    }else{
      fetchUserPlans(fetchUrl, {page: currentPage - 1}).then((res) =>{
        setTotalPage(res.data.pageInfo.totalPages || 0)
      });
    }

  }, [fetchUrl, currentPage, setTotalPage, fetchUserPlans]);

  if (getLoading) return <Loading />;
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <p className={styles.title}>이런 여행 일정은 어때요?</p>
            <Button
              variant={"solid"}
              size="sm"
              onClick={() => navigate(PageEndPoints.PLAN_CREATE)}
            >
              계획 만들기
            </Button>
          </div>
        </div>

        <div className={styles.plan_container}>
          {userPlans?.items.map((item) => (
            <div
            key={item.tripId}
            onClick={() => handleNavigate(item.tripId)}
           >
              <PlanCard item={item} />
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            callback={handlePageChange}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default PlanList;
