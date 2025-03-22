import styles from "./Find.module.css";
import { Button, Input, Field } from "@/components";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useToast } from "@/contexts";
import { finderScheme } from "../constants";

const FindPWPage = () => {
  const { fetchData } = useAxios();

  const navigate = useNavigate();

  const { createToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(finderScheme),
  });

  const onSubmit = (data) => {
    fetchData({
      method: "POST",
      url: APIEndPoints.FINDPW,
      data,
    }).then(() => {
      navigate(PageEndPoints.LOGIN);
      createToast({
        type: "success",
        text: "이메일을 보냈습니다. 이메일을 확인해 주세요.",
      });
    });
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>비밀번호 찾기</p>

      <form className={styles.form_box} onSubmit={handleSubmit(onSubmit)}>
        <Field label="이메일" error={errors.email} isRequire>
          <Input
            type="text"
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            placeholder="이메일을 입력하세요."
            size="md"
            register={register}
            name={"email"}
          />
        </Field>

        <div className={styles.btn_box}>
          <p
            onClick={() => navigate(PageEndPoints.LOGIN)}
            className={styles.prev_btn}
          >
            이전
          </p>
          <Button size="md" variant="solid">
            확인
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FindPWPage;
