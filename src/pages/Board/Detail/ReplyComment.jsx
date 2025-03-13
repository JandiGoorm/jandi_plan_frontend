import { useAxios } from "@/hooks";
import { useEffect, useMemo, useState,useCallback } from "react";
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
  const [totalPage, setTotalPage] = useState(0);
  const { response, fetchData } = useAxios();
  const { createToast } = useToast();
  const { fetchData: deleteApi } = useAxios();
  const { fetchData: fetchApi } = useAxios();

  const isNextPage = useMemo(() => {
    if (!response) return false;
    return totalPage > page+1 ;
  }, [response]);

  const fetchReplys = useCallback(async () => {
    console.log(commentId);
    await fetchData({
      url: buildPath(APIEndPoints.COMMENTS_REPLIES, { id: commentId }),
      method: "GET",
      params: {
        page,
      },
    }).then((res) => {
      console.log(res)
      setPage(res.data.pageInfo.currentPage);
      setTotalPage(res.data.pageInfo.totalPages);
      setData(res.data.items);
    })
  },[fetchData, commentId, user?.userId, page])

  const deleteReply = useCallback(
    (id) => {
      deleteApi({
      method: "DELETE",
      url: buildPath(APIEndPoints.COMMUNITY_COMMENTS, {id}),
    }).then((res) => {
      createToast({ type: "success", text: "댓글이 삭제되었습니다." });
      setPage(0); 
      fetchReplys();
    }).catch((err) => {
      createToast({
        type: "error",
        text: "댓글 삭제에 실패하였습니다",
      });
    })
  },
  [deleteApi, createToast, fetchReplys]);

  const handleLike = useCallback(
    (id, liked) => {
      let method="";
      if(liked){
        method="DELETE";
      }else{
        method="POST";
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
        const formatDate = formatDistanceToNow(new Date(comment.createdAt));

        return (
          <div className={styles.comment} key={comment.commentId}>
            <img src={comment.user.profileImageUrl} className={styles.comment_user_img} />
            <div className={styles.flex_column}>
              <div className={styles.comment_info}>
                <p className={styles.comment_user_name}>{comment.user.userName}</p>
                <p className={styles.comment_date}>{formatDate}</p>
                {user.userId===comment.user.userId ? 
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
                    <FaThumbsUp size={12} className={styles.thumbs}color={comment.liked? "var(--color-amber-400)": "var( --color-gray-300)"} onClick={()=>{handleLike(comment.commentId,comment.liked)}} />
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
