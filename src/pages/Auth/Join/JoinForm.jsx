import { Button, Field, Input } from "@/components";
import styles from "./JoinForm.module.css";

const JoinForm = ({
  joinUseForm,
  onSubmit,
  handleDuplicateEmail,
  handleDuplicateNickname,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = joinUseForm;

  return (
    <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.name}>
        <Field
          label="성"
          error={errors.firstName}
          isRequire
          style={{
            flex: 1,
          }}
        >
          <Input
            register={register}
            name={"firstName"}
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            size="sm"
          />
        </Field>
        <Field
          label="이름"
          error={errors.lastName}
          isRequire
          style={{
            flex: 1,
          }}
        >
          <Input
            register={register}
            name={"lastName"}
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            size="sm"
          />
        </Field>
      </div>

      <Field label={"이메일"} error={errors.email} isRequire>
        <div className={styles.email}>
          <Input
            type="text"
            register={register}
            name={"email"}
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            size="sm"
          />
          <Button
            type="button"
            size="sm"
            style={{ width: "5.5rem" }}
            onClick={() => handleDuplicateEmail(getValues("email"))}
          >
            중복확인
          </Button>
        </div>
      </Field>

      <Field label={"닉네임"} error={errors.nickname} isRequire>
        <div className={styles.nickname}>
          <Input
            type="text"
            register={register}
            name={"nickname"}
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            size="sm"
          />
          <Button
            type="button"
            size="sm"
            style={{
              width: "5.5rem",
            }}
            onClick={() => handleDuplicateNickname(getValues("nickname"))}
          >
            중복확인
          </Button>
        </div>
      </Field>

      <Field label={"비밀번호"} error={errors.password} isRequire>
        <Input
          type="password"
          register={register}
          name={"password"}
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="sm"
        />
      </Field>

      <Field label={"비밀번호 확인"} error={errors.passwordConfirm} isRequire>
        <Input
          type="password"
          register={register}
          name={"passwordConfirm"}
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="sm"
        />
      </Field>

      <Button
        style={{
          width: "100%",
        }}
        size="lg"
      >
        JOIN
      </Button>
    </form>
  );
};

export default JoinForm;
