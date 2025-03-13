import { formatDate } from "date-fns";
import styles from "./CommentTable.module.css";
import CommentModal from "./CommentModal";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  Button,
  DeleteModal,
} from "@/components";

const CommentTable = ({ comments, deleteComment }) => {
  return (
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
          {comments.map((comment) => {
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
                          callback={() => deleteComment(comment.commentId)}
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
  );
};

export default CommentTable;
