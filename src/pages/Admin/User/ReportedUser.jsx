import { usePagination } from "@/hooks";
import { useUserManger } from "../UserManagerContext";
import styles from "./ReportedUser.module.css";
import { Button, Pagination } from "@/components";
import { useCallback, useEffect } from "react";
import { formatDate } from "date-fns";
import DeleteUserModal from "../Modals/DeleteUserModal";

const ReportedUser = ({ set }) => {
  const { reportedUsers, fetchReportedUsers, permitUser } = useUserManger();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination("user");

  const refetch = useCallback(async () => {
    await fetchReportedUsers({ page: currentPage - 1 }, setTotalPage);
  }, [currentPage, fetchReportedUsers, setTotalPage]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>신고된 회원 관리</p>
        <Button variant="ghost" size="sm" onClick={set}>
          전체 회원 관리
        </Button>
      </div>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>생성일</th>
              <th>제한</th>
              <th className={styles.action_title}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reportedUsers?.items.map((user) => {
              const date = formatDate(user.createdAt, "yyyy. MM. dd");

              return (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.userName}</td>
                  <td className={styles.user_email}>{user.email}</td>
                  <td>{date}</td>
                  <td>{user.reported ? "true" : "false"}</td>
                  <td className={styles.actions}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        permitUser(user.userId).then(() => refetch())
                      }
                    >
                      제한해제
                    </Button>

                    <DeleteUserModal id={user.userId} onSuccess={refetch} />
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

export default ReportedUser;
