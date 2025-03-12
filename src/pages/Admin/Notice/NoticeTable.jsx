import { formatDate } from "date-fns";
import styles from "./NoticeTable.module.css";
import {
  Button,
  DeleteModal,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components";
import ModifyNotice from "./ModifyNotice";

const NoticeTable = ({ notices, updateNotice, deleteNotice }) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>생성일</th>
            <th className={styles.action_title}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {notices.map((notice) => {
            const date = formatDate(new Date(notice.createdAt), "yyyy. MM. dd");

            return (
              <tr key={notice.noticeId}>
                <td>{notice.noticeId}</td>
                <td>{notice.title}</td>
                <td>{date}</td>
                <td>
                  <div className={styles.actions}>
                    <Modal>
                      <ModalTrigger>
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <ModifyNotice callback={updateNotice} notice={notice} />
                      </ModalContent>
                    </Modal>

                    <Modal>
                      <ModalTrigger>
                        <Button size="sm" variant="ghost">
                          Delete
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <DeleteModal
                          callback={() => deleteNotice(notice.noticeId)}
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

export default NoticeTable;
