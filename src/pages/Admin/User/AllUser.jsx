import styles from "./AllUser.module.css";
import { Button, Pagination } from "@/components";
import { usePagination } from "@/hooks";
import { useCallback, useEffect } from "react";
import { formatDate } from "date-fns";
import { useUserManger } from "../UserManagerContext";

const AllUser = () => {
  const { users, fetchUsers, permitUser } = useUserManger();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const refetch = useCallback(async () => {
    await fetchUsers({ page: currentPage - 1 }, setTotalPage);
  }, [currentPage, fetchUsers, setTotalPage]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>전체 회원 관리</p>

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

          <tbody style={{ overflow: "hidden" }}>
            {users?.items.map((user) => {
              const date = formatDate(user.createdAt, "yyyy. MM. dd");

              return (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.userName}</td>
                  <td className={styles.user_email}>{user.email}</td>
                  <td>{date}</td>
                  <td>{user.reported ? "true" : "false"}</td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          permitUser(user.userId).then(() => refetch())
                        }
                      >
                        {user.reported ? "제한해제" : "제한"}
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

export default AllUser;
