import { Button, Input, Loading, Pagination, PlanCard } from "@/components";
import { PageEndPoints,APIEndPoints } from "@/constants";
import { usePagination, usePlans } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { useEffect,useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MyPlanList.module.css";

const PlanList = () => {
  const { currentPage, totalPage, setTotalPage, handlePageChange } = usePagination();
  const {userPlans, fetchUserPlans, getLoading } = usePlans();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUrl = useMemo(() => {
    const pathParts = location.pathname.split("/"); // [ "", "plan", "my", "list" ]
    const secondSegment = pathParts[2] || ""; // "my" or ""

    return secondSegment === "my" ? APIEndPoints.TRIP_MY : APIEndPoints.TRIP_LIKED;
  }, [location.pathname]);

  useEffect(() => {
    if (!fetchUrl) return;

    fetchUserPlans(fetchUrl, {page: currentPage - 1}).then((res) =>{
      setTotalPage(res.data.pageInfo.totalPages || 0)
    });

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
            <PlanCard key={item.tripId} item={item} />
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
