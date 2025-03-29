import { formatDate } from "date-fns";
import styles from "./CommunityTable.module.css";
import {
  Button,
  DeleteModal,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components";

const CoummunityTable = ({
  communities,
  handleViewClick,
  deleteCommunity,
  refetch,
}) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자ID</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>좋아요 수</th>
            <th>댓글 수</th>
            <th className={styles.action_title}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {communities.map((community) => {
            const date = formatDate(
              new Date(community.createdAt),
              "yyyy. MM. dd"
            );
            return (
              <tr key={community.postId}>
                <td>{community.postId}</td>
                <td>{community.title}</td>
                <td>{community.user.userId}</td>
                <td>{date}</td>
                <td>{community.viewCount}</td>
                <td>{community.likeCount}</td>
                <td>{community.commentCount}</td>
                <td>
                  <div className={styles.actions}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewClick(community.postId)}
                    >
                      View
                    </Button>
                    <Modal>
                      <ModalTrigger>
                        <Button size="sm" variant="ghost">
                          Delete
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <DeleteModal
                          callback={() =>
                            deleteCommunity(community.postId).then(() =>
                              refetch()
                            )
                          }
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

export default CoummunityTable;
