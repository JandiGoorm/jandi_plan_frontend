import { useState, useRef, useCallback } from "react";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./CommentItem.module.css";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import { formatDistanceToNow } from "date-fns";
import ReplyComment from "./ReplyComment";
import { Input, Button,  Modal, ModalContent, ModalTrigger } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useAuth, useToast } from "@/contexts";
import { buildPath } from "@/utils";
import ReportModal from "./components/ReportModal";


const CommentItem = ({ comment,deleteComment, user, fetchComments,handleLike }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const formmatDate = formatDistanceToNow(new Date(comment.createdAt));
  const id = comment.commentId; 
  const [likes, setLikes] = useState(comment.likeCount);
  const [isLiked, setIsLiked] = useState(comment.liked);
  const { loading, fetchData } = useAxios();
  const { fetchData: postApi } = useAxios();
  const [isReplying, setIsReplying] = useState(false); 
  const [commentText, setCommentText] = useState("");
  
  
  const { createToast } = useToast();

  const addReply = useCallback(() =>{
    const text = ref.current.value;

    if(text === "" || text === null){
      createToast({
        type: "error",
        text: "답글 내용을 입력해주세요",
      });
    }else{
      postApi({
        method: "POST",
        url: buildPath(APIEndPoints.COMMENTS_REPLIES, {id}),
        data: {
          contents: text,
        }
      }).then(() => {
        ref.current.value = "";
        fetchComments();
        createToast({
          type: "success",
          text: "답글이 등록되었습니다",
        });
      }).catch(() => {
        createToast({
          type: "error",
          text: "답글 등록에 실패하였습니다",
        });
      })
    }
  },[createToast, fetchComments,id,postApi]);

  return (
    <div className={styles.comment_item}>
      <div className={styles.comment}>
        <img src={comment.user.profileImageUrl} className={styles.comment_user_img} />
        <div className={styles.flex_column}>
          <div className={styles.comment_info}>
            <p className={styles.comment_user_name}>{comment.user.userName}</p>
            <p className={styles.comment_date}>{formmatDate}</p>
            <p className={styles.recomment}  onClick={() => setIsReplying(!isReplying)}>답글</p>
            {comment.mine ? 
              <>
                <p className={styles.report} onClick={()=> deleteComment(comment.commentId)}>삭제</p> 
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
                <FaThumbsUp size={12} className={styles.thumbs} color={comment.liked? "var(--color-amber-400)": "var( --color-gray-300)"} onClick={()=>{handleLike(comment.commentId,comment.liked)}} />
                <p className={styles.likeCount}> {likes}</p>
              </>}

          </div>
          <p className={styles.comment_text}>{comment.contents}</p>
        </div>
      </div>

      {isReplying && (
        <div className={styles.form_box}>
          <img src={user?.profileImageUrl} className={styles.current_user_img} />
          <Input
            size="sm"
            placeholder="답글을 입력해주세요."
            ref={ref}
            style={{
              borderRadius: "var(--radius-3xl)",
              padding: "0.8rem 1rem",
              flex: 1,
            }}
          />
          <Button variant="ghost" size="md" onClick={()=>{addReply()}}>
            등록하기
          </Button>
        </div>
      )}

      {comment.repliesCount > 0 && (
        <div
          className={styles.recomment_container}
          
        >
          <div className={styles.recomment_info} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
            <p>답글 {comment.repliesCount}개</p>
          </div>
          {isOpen && <ReplyComment commentId={comment.commentId} user={user}/>}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
