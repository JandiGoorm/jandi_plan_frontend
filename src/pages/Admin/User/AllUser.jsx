import { Loading, Pagination } from "@/components";
import { usePagination } from "@/hooks";
import { useCallback, useEffect } from "react";
import { useUserManger } from "../UserManagerContext";
import styles from "./AllUser.module.css";
import AllUserTable from "./AllUserTable";

const AllUser = () => {
  const { users, fetchUsers, permitUser, userLoading, updateUserRole } =
    useUserManger();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const refetch = useCallback(async () => {
    await fetchUsers({ page: currentPage - 1 }, setTotalPage);
  }, [currentPage, fetchUsers, setTotalPage]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (userLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <p className={styles.title}>전체 회원 관리</p>

      <AllUserTable
        users={users}
        permitUser={permitUser}
        refetch={refetch}
        updateUserRole={updateUserRole}
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

export default AllUser;
