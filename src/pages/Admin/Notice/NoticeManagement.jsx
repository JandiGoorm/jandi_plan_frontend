import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import { useNotice } from "@/hooks";
import { formatDate } from "date-fns";
import AddNotice from "./AddNotice";
import styles from "./NoticeManagement.module.css";
import DeleteModal from "@/components/Modal/ModalContents/DeleteModal";
import ModifyNotice from "./ModifyNotice";

const NoticeManagement = () => {
  const { allNotice, addNotice, deleteNotice, updateNotice } = useNotice();

  return (
    <div className={styles.container} id="notice">
      <div className={styles.header}>
        <p className={styles.title}>공지사항 관리</p>
        <Modal>
          <ModalTrigger>
            <Button size="sm" variant="ghost">
              공지 추가하기
            </Button>
          </ModalTrigger>
          <ModalContent>
            <AddNotice callback={addNotice} />
          </ModalContent>
        </Modal>
      </div>

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
          {allNotice?.items.map((notice) => {
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

export default NoticeManagement;
