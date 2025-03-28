import { Loading, Pagination } from "@/components";
import { PageEndPoints } from "@/constants";
import { useCommunity, usePagination } from "@/hooks";
import { buildPath } from "@/utils";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Communities.module.css";
import CoummunityTable from "./CommunityTable";

const Communities = () => {
  const navigate = useNavigate();
  const { fetchCommunities, communities, deleteCommunity, communitiesLoading } =
    useCommunity();

  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const refetch = useCallback(() => {
    fetchCommunities({ page: currentPage - 1 }).then((res) =>
      setTotalPage(res.data.pageInfo.totalPages || 0)
    );
  }, [currentPage, fetchCommunities, setTotalPage]);

  const handleViewClick = useCallback(
    (id) => {
      const path = buildPath(PageEndPoints.BOARD_DETAIL, { id });
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (communitiesLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <p className={styles.title}>커뮤니티 글 관리</p>

      <CoummunityTable
        communities={communities?.items ?? []}
        handleViewClick={handleViewClick}
        deleteCommunity={deleteCommunity}
        refetch={refetch}
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

export default Communities;
