import { Loading, Pagination } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios, usePagination } from "@/hooks";
import { useEffect } from "react";
import styles from "./Plan.module.css";
import PlanTable from "./PlanTable";

const Plan = () => {
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const { fetchData, response, loading } = useAxios();

  useEffect(() => {
    fetchData({
      url: APIEndPoints.TRIP_ALL,
      method: "GET",
      params: { page: currentPage - 1 },
    }).then((res) => {
      setTotalPage(res.data.pageInfo?.totalPages || 0);
    });
  }, [currentPage, fetchData, setTotalPage]);

  if (loading) return <Loading />;
  return (
    <div className={styles.container}>
      <p className={styles.title}>여행계획 관리</p>

      <PlanTable plans={response?.items ?? []} />

      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          callback={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Plan;
