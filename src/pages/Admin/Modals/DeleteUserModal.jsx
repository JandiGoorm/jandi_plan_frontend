import { useUserManger } from "../UserManagerContext";
import {
  Modal,
  ModalContent,
  ModalTrigger,
  ConfirmModal,
  Button,
} from "@/components";

const DeleteUserModal = ({ id, onSuccess }) => {
  const { deleteUser } = useUserManger();

  return (
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
          callback={async () => {
            await deleteUser(id);
            if (onSuccess) {
              onSuccess();
            }
          }}
        />
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
