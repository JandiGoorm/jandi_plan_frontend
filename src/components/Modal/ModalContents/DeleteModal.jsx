import { Button } from "@/components";
import { useModal } from "@/components/Modal/ModalContext";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ callback }) => {
  const { closeModal } = useModal();

  return (
    <div className={styles.container}>
      <p className={styles.title}>정말 삭제하시겠습니까?</p>
      <div className={styles.flex_box}>
        <Button
          variant="solid"
          style={{
            flex: 1,
          }}
          onClick={async () => {
            await callback();
            closeModal();
          }}
          isInModal
        >
          삭제하기
        </Button>
        <Button
          variant="solid"
          style={{
            flex: 1,
          }}
          onClick={() => closeModal()}
          isInModal
        >
          돌아가기
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
