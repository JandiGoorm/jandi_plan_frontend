import { Loading, Pagination } from "@/components";
import { usePagination } from "@/hooks";
import { useCallback, useEffect } from "react";
import { useUserManger } from "../UserManagerContext";
import styles from "./ReportedUser.module.css";
import ReportedUserTable from "./ReportedUserTable";

const ReportedUser = () => {
  const { reportedUsers, fetchReportedUsers, permitUser, reportedUserLoading } =
    useUserManger();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const refetch = useCallback(async () => {
    await fetchReportedUsers({ page: currentPage - 1 }, setTotalPage);
  }, [currentPage, fetchReportedUsers, setTotalPage]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (reportedUserLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <p className={styles.title}>신고된 회원 관리</p>

      <ReportedUserTable
        reportedUsers={reportedUsers}
        permitUser={permitUser}
        refetch={refetch}
      />

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

export default ReportedUser;
