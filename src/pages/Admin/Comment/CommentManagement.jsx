import { useAxios, usePagination } from "@/hooks";
import styles from "./CommentManagement.module.css";
import { useCallback, useEffect } from "react";
import { APIEndPoints } from "@/constants";
import {
  Button,
  DeleteModal,
  Modal,
  ModalContent,
  ModalTrigger,
  Pagination,
} from "@/components";
import { formatDate } from "date-fns";
import { buildPath, handleApiCall } from "@/utils";
import CommentModal from "./CommentModal";
import { useToast } from "@/contexts";

const CommentManagement = () => {
  const { createToast } = useToast();
  const { fetchData, response } = useAxios();
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

  return (
    <div className={styles.container}>
      <p className={styles.title}>신고된 댓글 관리</p>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>내용</th>
              <th>작성자ID</th>
              <th>작성일</th>
              <th>신고 수</th>
              <th>
                <p className={styles.action_title}>Actions</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {response?.items.map((comment) => {
              const date = formatDate(
                new Date(comment.createdAt),
                "yyyy. MM. dd"
              );

              return (
                <tr key={comment.commentId}>
                  <td>{comment.commentId}</td>
                  <td>{comment.contents}</td>
                  <td>{comment.user.userId}</td>
                  <td>{date}</td>
                  <td>{comment.reportCount}</td>
                  <td>
                    <div className={styles.actions}>
                      <CommentModal comment={comment} />

                      <Modal>
                        <ModalTrigger>
                          <Button size="sm" variant="ghost">
                            Delete
                          </Button>
                        </ModalTrigger>
                        <ModalContent>
                          <DeleteModal
                            callback={() => handleDelete(comment.commentId)}
                          />
                        </ModalContent>
                      </Modal>
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

export default CommentManagement;
