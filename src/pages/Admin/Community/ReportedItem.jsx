import { formatDate } from "date-fns";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ConfirmModal,
  Button,
  DeleteModal,
} from "@/components";
import { useUserManger } from "../UserManagerContext";
import styles from "./ReportedItem.module.css";

const ReportedItem = ({ community, handleViewClick, deleteCommunity }) => {
  const { permitUser, deleteUser } = useUserManger();
  const date = formatDate(new Date(community.createdAt), "yyyy. MM. dd");

  return (
    <tr key={community.postId} className={styles.container}>
      <td>{community.postId}</td>
      <td>{community.title}</td>
      <td>
        <div className={styles.community_user}>
          <p>{community.user.userId}</p>
          <div className={styles.flex_row}>
            <Modal>
              <ModalTrigger>
                <Button size="sm" variant="ghost">
                  제한
                </Button>
              </ModalTrigger>
              <ModalContent>
                <ConfirmModal
                  confirmMessage={"정말 제한 하시겠습니까?"}
                  buttnMessage={"제한하기"}
                  callback={() => permitUser(community.user.userId)}
                />
              </ModalContent>
            </Modal>

            <Modal>
              <ModalTrigger>
                <Button size="sm" variant="ghost">
                  추방
                </Button>
              </ModalTrigger>
              <ModalContent>
                <ConfirmModal
                  confirmMessage={"정말 추방 하시겠습니까?"}
                  buttnMessage={"추방하기"}
                  callback={() => deleteUser(community.user.userId)}
                />
              </ModalContent>
            </Modal>
          </div>
        </div>
      </td>
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
              <DeleteModal callback={() => deleteCommunity(community.postId)} />
            </ModalContent>
          </Modal>
        </div>
      </td>
    </tr>
  );
};

export default ReportedItem;
