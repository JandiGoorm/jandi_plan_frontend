import { Loading, Pagination } from "@/components";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios, usePagination } from "@/hooks";
import { buildPath, handleApiCall } from "@/utils";
import { useCallback, useEffect } from "react";
import styles from "./CommentManagement.module.css";
import CommentTable from "./CommentTable";

const CommentManagement = () => {
  const { createToast } = useToast();
  const { fetchData, response, loading } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const handleDelete = useCallback(
    async (id) => {
      await handleApiCall(
        () =>
          deleteApi({
            url: buildPath(APIEndPoints.DELETE_COMMENT, { id }),
            method: "DELETE",
          }),
        "댓글이 삭제되었습니다.",
        "댓글 삭제에 실패했습니다.",
        createToast,
        () => {
          fetchData({
            url: APIEndPoints.REPORTED_COMMNET,
            method: "GET",
            params: {
              page: currentPage - 1,
            },
          }).then((res) => {
            setTotalPage(res.data.pageInfo.totalPages || 0);
          });
        }
      );
    },
    [createToast, currentPage, deleteApi, fetchData, setTotalPage]
  );

  useEffect(() => {
    fetchData({
      url: APIEndPoints.REPORTED_COMMNET,
      method: "GET",
      params: {
        page: currentPage - 1,
      },
    }).then((res) => {
      setTotalPage(res.data.pageInfo.totalPages || 0);
    });
  }, [currentPage, fetchData, setTotalPage]);

  if (loading) return <Loading />;
  return (
    <div className={styles.container}>
      <p className={styles.title}>신고된 댓글 관리</p>

      <CommentTable
        comments={response?.items ?? []}
        deleteComment={handleDelete}
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

export default CommentManagement;
