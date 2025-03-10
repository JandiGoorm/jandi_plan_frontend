import { Button, Pagination } from "@/components";
import { PageEndPoints } from "@/constants";
import { useCommunity, usePagination } from "@/hooks";
import { buildPath } from "@/utils";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReportedCommunities.module.css";
import ReportedItem from "./ReportedItem";

const ReportedCommunities = ({ set }) => {
  const navigate = useNavigate();
  const { reportedCommunities, fetchReportedCommunities, deleteCommunity } =
    useCommunity();

  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination("reportedCommunity");

  const handleViewClick = useCallback(
    (id) => {
      const path = buildPath(PageEndPoints.BOARD_DETAIL, { id });
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    fetchReportedCommunities({ page: currentPage - 1 }, setTotalPage);
  }, [currentPage, fetchReportedCommunities, setTotalPage]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>신고된 커뮤니티 글 관리</p>

        <Button size="sm" variant="ghost" onClick={set}>
          전체 게시글
        </Button>
      </div>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>작성자ID</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>좋아요 수</th>
              <th>댓글 수</th>
              <th>Actions</th>
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
