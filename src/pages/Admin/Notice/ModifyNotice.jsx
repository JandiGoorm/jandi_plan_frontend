import { useForm } from "react-hook-form";
import styles from "./ModifyNotice.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { noticeModifyScheme } from "./constants";
import FormEditor from "@/pages/Board/FormEditor";
import { useCallback, useEffect } from "react";
import { Button } from "@/components";
import { useQuillSetup } from "@/hooks";
import { useModal } from "@/components/Modal/ModalContext";

const ModifyNotice = ({ notice, callback }) => {
  const formController = useForm({
    resolver: zodResolver(noticeModifyScheme),
  });

  const { closeModal } = useModal();
  const { setValue } = formController;
  const { setQuill } = useQuillSetup(
    formController,
    "Notice",
    notice.noticeId,
    true
  );

  const parsedContent = JSON.parse(notice.content);

  const onSubmit = useCallback(
    async (data) => {
      await callback(notice.noticeId, data);
      closeModal();
    },
    [callback, closeModal, notice.noticeId]
  );

  useEffect(() => {
    setValue("title", notice.title);
    setValue("content", parsedContent);
  }, [notice.title, parsedContent, setValue]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>공지사항 수정</p>

      <div className={styles.form_container}>
        <FormEditor
          formController={formController}
          onSubmit={onSubmit}
          setQuill={setQuill}
          tempPostId={notice.noticeId}
          defaultValue={parsedContent}
          category="Notice"
        >
          <Button
            type="submit"
            variant="solid"
            style={{
              marginLeft: "auto",
            }}
            isInModal
          >
            수정하기
          </Button>
        </FormEditor>
      </div>
    </div>
  );
};

export default ModifyNotice;
