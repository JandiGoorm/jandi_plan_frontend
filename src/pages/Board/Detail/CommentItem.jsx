import {
  Button,
  ImageWithPlaceholder,
  Input,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { buildPath, formatISO } from "@/utils";
import { useCallback, useRef, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import styles from "./CommentItem.module.css";
import ReportModal from "./components/ReportModal";
import ReplyComment from "./ReplyComment";

const CommentItem = ({
  comment,
  deleteComment,
  user,
  fetchComments,
  handleLike,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const ref = useRef(null);
  const formmatDate = formatISO(comment.createdAt);
  const { fetchData: postApi } = useAxios();

  const id = comment.commentId;

  const { createToast } = useToast();

  const addReply = useCallback(() => {
    const text = ref.current.value;

    if (text === "" || text === null) {
      createToast({
        type: "error",
        text: "답글 내용을 입력해주세요",
      });
    } else {
      postApi({
        method: "POST",
        url: buildPath(APIEndPoints.COMMENTS_REPLIES, { id }),
        data: {
          contents: text,
        },
      })
        .then(() => {
          ref.current.value = "";
          fetchComments();
          createToast({
            type: "success",
            text: "답글이 등록되었습니다",
          });
        })
        .catch(() => {
          createToast({
            type: "error",
            text: "답글 등록에 실패하였습니다",
          });
        });
    }
  }, [createToast, fetchComments, id, postApi]);

  return (
    <div className={styles.comment_item}>
      <div className={styles.comment}>
        <div className={styles.user_img_box}>
          <ImageWithPlaceholder
            src={comment.user.profileImageUrl}
            alt="user profile"
          />
        </div>

        <div className={styles.flex_column}>
          <div className={styles.comment_info}>
            <div className={styles.comment_box}>
              <p className={styles.comment_user_name}>
                {comment.user.userName}
              </p>
              <p className={styles.comment_date}>{formmatDate}</p>
            </div>

            <div className={styles.comment_box}>
              <p
                className={styles.recomment}
                onClick={() => setIsReplying(!isReplying)}
              >
                답글
              </p>
              {comment.mine ? (
                <>
                  <p
                    className={styles.report}
                    onClick={() => deleteComment(comment.commentId)}
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
                  <div className={styles.up_icon}>
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
                  </div>
                </>
              )}
            </div>
          </div>
          <p className={styles.comment_text}>{comment.contents}</p>
        </div>
      </div>

      {isReplying && (
        <form
          className={styles.form_box}
          onSubmit={(e) => {
            e.preventDefault();
            addReply();
          }}
        >
          <div className={styles.user_img_box}>
            <ImageWithPlaceholder
              src={user?.profileImageUrl}
              alt="user profile"
              className={styles.user_img}
            />
          </div>

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
          <Button
            variant="ghost"
            size="md"
            type="submit"
            style={{
              whiteSpace: "nowrap",
            }}
          >
            등록
          </Button>
        </form>
      )}

      {comment.repliesCount > 0 && (
        <div className={styles.recomment_container}>
          <div
            className={styles.recomment_info}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
            <p>답글 {comment.repliesCount}개</p>
          </div>
          {isOpen && (
            <ReplyComment
              commentId={comment.commentId}
              user={user}
              fetchComments={fetchComments}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
