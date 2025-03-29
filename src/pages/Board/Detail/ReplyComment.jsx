import { Modal, ModalContent, ModalTrigger } from "@/components";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { buildPath, formatISO } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import ReportModal from "./components/ReportModal";
import styles from "./ReplyComment.module.css";

const ReplyComment = ({ commentId, user, fetchComments }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const { response, fetchData } = useAxios();
  const { createToast } = useToast();
  const { fetchData: deleteApi } = useAxios();
  const { fetchData: fetchApi } = useAxios();

  const isNextPage = useMemo(() => {
    if (!response) return false;
    return totalPage > page + 1;
  }, [page, response, totalPage]);

  const fetchReplys = useCallback(async () => {
    await fetchData({
      url: buildPath(APIEndPoints.COMMENTS_REPLIES, { id: commentId }),
      method: "GET",
      params: {
        page,
      },
    }).then((res) => {
      setPage(res.data.pageInfo.currentPage);
      setTotalPage(res.data.pageInfo.totalPages);
      setData(res.data.items);
    });
  }, [fetchData, commentId, page]);

  const deleteReply = useCallback(
    (id) => {
      deleteApi({
        method: "DELETE",
        url: buildPath(APIEndPoints.COMMUNITY_COMMENTS, { id }),
      })
        .then(() => {
          createToast({ type: "success", text: "댓글이 삭제되었습니다." });
          setPage(0);
          fetchReplys();
          fetchComments();
        })
        .catch(() => {
          createToast({
            type: "error",
            text: "댓글 삭제에 실패하였습니다",
          });
        });
    },
    [createToast, deleteApi, fetchComments, fetchReplys]
  );

  const handleLike = useCallback(
    (id, liked) => {
      let method = "";
      if (liked) {
        method = "DELETE";
      } else {
        method = "POST";
      }
      fetchApi({
        method: method,
        url: buildPath(APIEndPoints.COMMENTS_LIKE, { id }),
      })
        .then(() => {
          fetchReplys();
        })
        .catch(() =>
          createToast({
            type: "error",
            text: "좋아요 설정에 실패하였습니다",
          })
        );
    },
    [createToast, fetchApi, fetchReplys]
  );

  useEffect(() => {
    fetchReplys();
  }, [fetchReplys, commentId]);

  return (
    <div className={styles.container}>
      {data.map((comment) => {
        const formatDate = formatISO(comment.createdAt);

        return (
          <div className={styles.comment} key={comment.commentId}>
            <img
              src={comment.user.profileImageUrl}
              className={styles.comment_user_img}
            />
            <div className={styles.flex_column}>
              <div className={styles.comment_info}>
                <p className={styles.comment_user_name}>
                  {comment.user.userName}
                </p>
                <p className={styles.comment_date}>{formatDate}</p>
                {user.userId === comment.user.userId ? (
                  <>
                    <p
                      className={styles.report}
                      onClick={() => deleteReply(comment.commentId)}
                    >
                      삭제
                    </p>
                  </>
                ) : (
                  <>
                    <Modal>
                      <ModalTrigger>
                        <p className={styles.report}>신고</p>
                      </ModalTrigger>
                      <ModalContent>
                        <ReportModal
                          id={comment.commentId}
                          getUrl="commentReport"
                        />
                      </ModalContent>
                    </Modal>
                    <FaThumbsUp
                      size={12}
                      className={styles.thumbs}
                      color={
                        comment.liked
                          ? "var(--color-amber-400)"
                          : "var( --color-gray-300)"
                      }
                      onClick={() => {
                        handleLike(comment.commentId, comment.liked);
                      }}
                    />
                    <p className={styles.likeCount}> {comment.likeCount}</p>
                  </>
                )}
              </div>
              <p className={styles.comment_text}>{comment.contents}</p>
            </div>
          </div>
        );
      })}

      {isNextPage && (
        <p
          className={styles.more_btn}
          onClick={() => setPage((prev) => prev + 1)}
        >
          더보기
        </p>
      )}
    </div>
  );
};

export default ReplyComment;
