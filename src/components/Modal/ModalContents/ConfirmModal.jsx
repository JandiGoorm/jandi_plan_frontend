import { Button } from "@/components";
import { useModal } from "@/components/Modal/ModalContext";
import styles from "./DeleteModal.module.css";

const ConfirmModal = ({ confirmMessage, buttnMessage, callback }) => {
  const { closeModal } = useModal();

  return (
    <div className={styles.container}>
      <p className={styles.title}>{confirmMessage}</p>
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
          {buttnMessage}
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

export default ConfirmModal;
