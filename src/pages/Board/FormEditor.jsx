import { Editor, Input } from "@/components";
import styles from "./FormEditor.module.css";
import { useDarkModeContext } from "@/contexts";

const FormEditor = ({
  onSubmit,
  formController,
  tempPostId,
  children,
  setQuill,
  defaultValue,
  category,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formController;
  const { isDarkMode } = useDarkModeContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Input
        placeholder="제목을 입력해주세요"
        style={{
          boxSizing: "border-box",
          width: "100%",
        }}
        size="lg"
        register={register}
        name="title"
        isDarkMode={isDarkMode}
      />
      {errors.title && <p className={styles.error}>{errors.title.message}</p>}

      <div className={styles.editor}>
        <Editor
          onLoaded={setQuill}
          tempPostId={tempPostId}
          defaultValue={defaultValue}
          category={category}
        />
      </div>

      <div className={styles.submit}>
        {errors.content && <p className={styles.error}>내용을 입력해주세요.</p>}
        {children}
      </div>
    </form>
  );
};

export default FormEditor;
