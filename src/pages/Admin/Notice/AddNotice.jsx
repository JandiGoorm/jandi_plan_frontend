import { Button } from "@/components";
import { useModal } from "@/components/Modal/ModalContext";
import { useQuillSetup } from "@/hooks";
import FormEditor from "@/pages/Board/FormEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import styles from "./AddNotice.module.css";
import { noticeWriteScheme } from "./constants";

const AddNotice = ({ callback }) => {
  const { closeModal } = useModal();

  const formController = useForm({
    resolver: zodResolver(noticeWriteScheme),
  });

  const { setQuill, tempId } = useQuillSetup(
    formController,
    "Notice",
    null,
    false
  );

  const onSubmit = useCallback(
    (data) => {
      callback(data);
      closeModal();
    },
    [callback, closeModal]
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>공지사항 추가</p>

      <FormEditor
        formController={formController}
        onSubmit={onSubmit}
        setQuill={setQuill}
        tempPostId={tempId}
        category="Notice"
      >
        <Button
          type="submit"
          variant="solid"
          size="md"
          style={{
            marginLeft: "auto",
          }}
          isInModal
        >
          공지 등록
        </Button>
      </FormEditor>
    </div>
  );
};

export default AddNotice;
