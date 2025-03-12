import { useAxios, usePagination } from "@/hooks";
import styles from "./Plan.module.css";
import { useEffect } from "react";
import { APIEndPoints } from "@/constants";
import { Button, Pagination } from "@/components";

const Plan = () => {
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const { fetchData, response } = useAxios();

  useEffect(() => {
    fetchData({
      url: APIEndPoints.TRIP_ALL,
      method: "GET",
      params: { page: currentPage - 1 },
    }).then((res) => {
      setTotalPage(res.data.pageInfo?.totalPages || 0);
    });
  }, [currentPage, fetchData, setTotalPage]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>여행계획 관리</p>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>여행지</th>
              <th>기간</th>
              <th>생성일</th>
              <th className={styles.action_title}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {response?.items.map((trip) => {
              return (
                <tr key={trip.tripId}>
                  <td>{trip.tripId}</td>
                  <td>{trip.cityName}</td>
                  <td>
                    {trip.startDate} ~ {trip.endDate}
                  </td>
                  <td>{trip.createdAt}</td>
                  <td>
                    <div className={styles.actions}>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                      <Button size="sm" variant="ghost">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
