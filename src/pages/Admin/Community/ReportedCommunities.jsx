import { Loading, Pagination } from "@/components";
import { PageEndPoints } from "@/constants";
import { useCommunity, usePagination } from "@/hooks";
import { buildPath } from "@/utils";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReportedCommunities.module.css";
import ReportedCommunityTable from "./ReportedCommunityTable";

const ReportedCommunities = () => {
  const navigate = useNavigate();
  const {
    reportedCommunities,
    fetchReportedCommunities,
    deleteCommunity,
    reportedCommunitiesLoading,
  } = useCommunity();

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
    await fetchReportedCommunities({ page: currentPage - 1 }).then((res) =>
      setTotalPage(res.data.pageInfo.totalPages || 0)
    );
  }, [currentPage, fetchReportedCommunities, setTotalPage]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (reportedCommunitiesLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <p className={styles.title}>신고된 커뮤니티 글 관리</p>

      <ReportedCommunityTable
        reportedCommunities={reportedCommunities?.items ?? []}
        refetch={refetch}
        handleViewClick={handleViewClick}
        deleteCommunity={deleteCommunity}
      />

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
