import { Pagination } from "@/components";
import { PageEndPoints } from "@/constants";
import { useCommunity, usePagination } from "@/hooks";
import { buildPath } from "@/utils";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReportedCommunities.module.css";
import ReportedItem from "./ReportedItem";

const ReportedCommunities = () => {
  const navigate = useNavigate();
  const { reportedCommunities, fetchReportedCommunities, deleteCommunity } =
    useCommunity();

  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const handleViewClick = useCallback(
    (id) => {
      const path = buildPath(PageEndPoints.BOARD_DETAIL, { id });
      navigate(path);
    },
    [navigate]
  );

  const refetch = useCallback(async () => {
    await fetchReportedCommunities({ page: currentPage - 1 }, setTotalPage);
  }, [currentPage, fetchReportedCommunities, setTotalPage]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>신고된 커뮤니티 글 관리</p>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>작성자ID</th>
              <th>작성일</th>
              <th>신고 수</th>
              <th>
                <p className={styles.action_title}>Actions</p>
              </th>
            </tr>
          </thead>

          <tbody>
            {reportedCommunities?.items.map((community) => {
              return (
                <ReportedItem
                  community={community}
                  handleViewClick={handleViewClick}
                  deleteCommunity={deleteCommunity}
                  key={community.postId}
                  refetch={refetch}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <Pagination
          callback={handlePageChange}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default ReportedCommunities;
