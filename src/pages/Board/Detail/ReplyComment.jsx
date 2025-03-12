import { useAxios } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import styles from "./ReplyComment.module.css";
import { formatDistanceToNow } from "date-fns";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";
import { useAuth, useToast} from "@/contexts";
import { FaThumbsUp } from "react-icons/fa";
import ReportModal from "./components/ReportModal";
import { Modal, ModalContent, ModalTrigger } from "@/components";

const ReplyComment = ({ commentId, user }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const { response, fetchData } = useAxios();
  const { createToast } = useToast();

  const hashId = useMemo(() => new Set(), []);

  const isNextPage = useMemo(() => {
    if (!response) return false;
    return response.pageInfo.totalPage > response.pageInfo.currentPage + 1;
  }, [response]);

  useEffect(() => {
    fetchData({
      url: buildPath(APIEndPoints.COMMENTS_REPLIES, { id: commentId }),
      method: "GET",
      params: {
        page,
      },
    });
  }, [commentId, fetchData, page]);

  useEffect(() => {
    if (!response) return;

    const itemsWithMine = response.items.map((comment) => ({
      ...comment,
      mine: comment.user.userId === user?.userId,
    }));

    const newItems = itemsWithMine.filter((item) => {
      if (hashId.has(item.commentId)) {
        return false;
      }

      hashId.add(item.commentId);
      return true;
    });

    setData((prev) => [...prev, ...newItems]);
  }, [hashId, response]);

  const deleteReply = (id) => {
    fetchData({
      method: "DELETE",
      url: buildPath(APIEndPoints.COMMUNITY_COMMENTS, {id}),
    }).then((res) => {
      createToast({ type: "success", text: "댓글이 삭제되었습니다." });
      setPage(0); 
    }).catch((err) => {
      createToast({
        type: "error",
        text: "댓글 삭제에 실패하였습니다",
      });
    })
  }

  return (
    <div className={styles.container}>
      {data.map((comment) => {
        const formatDate = formatDistanceToNow(new Date(comment.createdAt));

        return (
          <div className={styles.comment} key={comment.commentId}>
            <img src={comment.user.profileImageUrl} className={styles.comment_user_img} />
            <div className={styles.flex_column}>
              <div className={styles.comment_info}>
                <p className={styles.comment_user_name}>{comment.user.userName}</p>
                <p className={styles.comment_date}>{formatDate}</p>
                {comment.mine ? 
                  <>
                    <p className={styles.report} onClick={()=>deleteReply(comment.commentId)}>삭제</p> 
                  </>
                : 
                  <>
                  <Modal>
                    <ModalTrigger>
                      <p className={styles.report}>신고</p>
                    </ModalTrigger>
                    <ModalContent>
                      <ReportModal id={comment.commentId} getUrl="commentReport"/>
                    </ModalContent>
                  </Modal>
                    <FaThumbsUp size={12} color={comment.isRecommended? "var(--color-amber-400)": "var( --color-gray-300)"} onClick={()=>{handleLike()}} />
                    <p className={styles.likeCount}> {comment.likeCount}</p>
                  </>}
              </div>
              <p className={styles.comment_text}>{comment.contents}</p>
            </div>
          </div>
        );
      })}

      {isNextPage && (
        <p
          className={styles.more_button}
          onClick={() => setPage((prev) => prev + 1)}
        >
          더보기
        </p>
      )}
    </div>
  );
};

export default ReplyComment;
