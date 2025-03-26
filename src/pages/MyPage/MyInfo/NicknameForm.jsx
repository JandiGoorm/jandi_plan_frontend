import { Button, Input } from "@/components";
import styles from "./NicknameForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeNicknameScheme } from "../constants";
import { useCallback } from "react";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";

const NicknameForm = ({onProfileChange, setNickname}) => {
  const { fetchData } = useAxios();
  const { createToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changeNicknameScheme),
  });

  const onSubmit = useCallback(
    async (data) => {
      await fetchData({
        url: APIEndPoints.USER_CHANGE_PASSWORD,
        method: "PATCH",
        data: {
          newUserName: data.nickname,
        },
      })
        .then((res) => {
          console.log(res);
          createToast({
            text: "닉네임이 변경되었습니다.",
            type: "success",
          });
          setNickname(data.nickname);
          onProfileChange();
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
      <p className={styles.title}>닉네임 변경</p>
      <div className={styles.plan_columns}>
        <div className={styles.input_name}>새 닉네임</div>
        <div className={styles.input_box}>
          <Input
            size="md"
            type="text"
            style={{ width: "100%" }}
            register={register}
            name="nickname"
          />
          {errors.nickname && (
            <p className={styles.error_message}>
              {errors.nickname.message}
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
        닉네임 수정
      </Button>
    </form>
  );
};

export default NicknameForm;
