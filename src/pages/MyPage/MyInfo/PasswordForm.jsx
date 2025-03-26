import { Button, Input } from "@/components";
import styles from "./PasswordForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordScheme } from "../constants";
import { useCallback } from "react";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";

const PasswordForm = () => {
  const { fetchData } = useAxios();
  const { createToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordScheme),
  });

  const onSubmit = useCallback(
    async (data) => {
      await fetchData({
        url: APIEndPoints.USER_CHANGE_PASSWORD,
        method: "PUT",
        data: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      })
        .then(() => {
          createToast({
            text: "비밀번호가 변경되었습니다.",
            type: "success",
          });
        })
        .catch((error) => {
          const message = error.data.error;
          createToast({
            text: message,
            type: "error",
          });
        });
    },
    [createToast, fetchData]
  );

  return (
    <form className={styles.pw_info_box} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.title}>비밀번호 변경</p>
      <div className={styles.plan_columns}>
        <div className={styles.input_name}>현재 비밀번호</div>
        <div className={styles.input_box}>
          <Input
            size="md"
            type="password"
            style={{ width: "100%" }}
            register={register}
            name="currentPassword"
          />
          {errors.currentPassword && (
            <p className={styles.error_message}>
              {errors.currentPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className={styles.plan_columns}>
        <div className={styles.input_name}>새 비밀번호</div>
        <div className={styles.input_box}>
          <Input
            size="md"
            type="password"
            style={{ width: "100%" }}
            register={register}
            name="newPassword"
          />
          {errors.newPassword && (
            <p className={styles.error_message}>{errors.newPassword.message}</p>
          )}
        </div>
      </div>

      <div className={styles.plan_columns}>
        <div className={styles.input_name}>새 비밀번호 재입력</div>
        <div className={styles.input_box}>
          <Input
            size="md"
            type="password"
            style={{ width: "100%" }}
            register={register}
            name="newPasswordConfirm"
          />
          {errors.newPasswordConfirm && (
            <p className={styles.error_message}>
              {errors.newPasswordConfirm.message}
            </p>
          )}
        </div>
      </div>

      <Button
        size="md"
        variant="ghost"
        style={{
          alignSelf: "center",
          margin: "1rem 0",
        }}
        type="submit"
        isInModal
      >
        비밀번호 수정
      </Button>
    </form>
  );
};

export default PasswordForm;
