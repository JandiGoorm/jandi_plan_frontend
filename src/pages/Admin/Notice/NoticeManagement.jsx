import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import { useNotice } from "@/hooks";
import AddNotice from "./AddNotice";
import styles from "./NoticeManagement.module.css";
import NoticeTable from "./NoticeTable";

const NoticeManagement = () => {
  const { allNotice, addNotice, deleteNotice, updateNotice } = useNotice();

  return (
    <div className={styles.container}>
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

      <NoticeTable
        notices={allNotice?.items ?? []}
        updateNotice={updateNotice}
        deleteNotice={deleteNotice}
      />
    </div>
  );
};

export default NoticeManagement;
