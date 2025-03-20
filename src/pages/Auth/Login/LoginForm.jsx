import { Field, Input, Button } from "@/components";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { PageEndPoints } from "@/constants";

const LoginForm = ({ onSubmit, formController }) => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
  } = formController;

  return (
    <form className={styles.form_box} onSubmit={onSubmit}>
      <div className={styles.input_box}>
        <Field label="이메일" error={errors.id} isRequire>
          <Input
            type="text"
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            placeholder="이메일"
            size="md"
            register={register}
            name={"id"}
          />
        </Field>
        <Field label="비밀번호" error={errors.password} isRequire>
          <Input
            type="password"
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            size="md"
            placeholder="비밀번호"
            register={register}
            name={"password"}
          />
        </Field>
      </div>

      <div className={styles.btn_box}>
        <p
          onClick={() => navigate(PageEndPoints.FINDPW)}
          className={styles.find_btn}
        >
          Find ID / PW
        </p>
        <Button size="md" variant="solid">
          로그인
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
