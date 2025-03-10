import { Modal, ModalTrigger, ModalContent, Button } from "@/components";
import styles from "./CommentModal.module.css";

const CommentModal = ({ comment }) => {
  const map = {
    ID: comment.commentId,
    내용: comment.contents,
    "답글 수": comment.repliesCount,
    "좋아요 수 ": comment.likeCount,
    "신고 수": comment.reportCount,
  };

  return (
    <Modal>
      <ModalTrigger>
        <Button size="sm" variant="ghost">
          View
        </Button>
      </ModalTrigger>

      <ModalContent>
        <div className={styles.container}>
          <p className={styles.title}>댓글 확인</p>

          <div className={styles.content}>
            {Object.entries(map).map(([key, value]) => (
              <div className={styles.content_item} key={key}>
                <p className={styles.label}>{key}</p>
                <div className={styles.value}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
