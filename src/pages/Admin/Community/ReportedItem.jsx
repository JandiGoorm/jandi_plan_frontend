import { formatDate } from "date-fns";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  Button,
  DeleteModal,
} from "@/components";
import styles from "./ReportedItem.module.css";
import DeleteUserModal from "../Modals/DeleteUserModal";

const ReportedItem = ({
  community,
  handleViewClick,
  deleteCommunity,
  refetch,
}) => {
  const date = formatDate(new Date(community.createdAt), "yyyy. MM. dd");

  return (
    <tr key={community.postId} className={styles.container}>
      <td>{community.postId}</td>
      <td>{community.title}</td>
      <td>
        <div className={styles.community_user}>
          <p>{community.user.userId}</p>
          <DeleteUserModal
            id={community.user.userId}
            onSuccess={async () => await refetch()}
          />
        </div>
      </td>
      <td>{date}</td>
      <td>{community.reportCount}</td>
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
                callback={async () => {
                  await deleteCommunity(community.postId, true);
                  await refetch();
                }}
              />
            </ModalContent>
          </Modal>
        </div>
      </td>
    </tr>
  );
};

export default ReportedItem;
