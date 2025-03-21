import styles from "./Social.module.css";
import { Button, Input, Field } from "@/components";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useToast } from "@/contexts";
import { useCallback, useState } from "react";

const scheme = z.object({
  nickname: z
  .string()
  .min(2, { message: "2자 이상 입력하세요." })
  .nonempty({ message: "닉네임을 입력하세요." }),
});

const SocialPage = () => {
  const { fetchData: fetchDuplicateNickname } = useAxios();
  const navigate = useNavigate();
  const [duplicateCheck, setDuplicateCheck] = useState({
    nickname: false,
  });
  const { createToast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(scheme),
  });

  const handleDuplicateNickname = useCallback(
    async (name) => {
      await fetchDuplicateNickname({
        url: APIEndPoints.USER_CHECK_NICKNAME,
        method: "GET",
        params: {
          name,
        },
      })
        .then(() => {
          setDuplicateCheck((prev) => ({
            ...prev,
            nickname: true,
          }));
          createToast({
            type: "success",
            text: "사용가능한 닉네임입니다.",
          });
        })
        .catch((err) => {
          createToast({
            type: "error",
            text: err.message || "사용 불가능한 닉네임 입니다.",
          });
          setError("nickname", {
            type: "custom",
            message: "사용 불가능한 닉네임 입니다.",
          });
        });
    },
    [createToast, fetchDuplicateNickname, setError]
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>소셜 회원가입</p>
      <form className={styles.form_box} >
        <div className={styles.input_box}>
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
        </div>
        <div className={styles.btn_box}>
          <Button size="md" variant="solid">
            확인
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SocialPage;
