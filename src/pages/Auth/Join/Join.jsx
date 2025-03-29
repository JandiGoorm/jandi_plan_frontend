import { APIEndPoints, PageEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { joinScheme } from "../constants";
import styles from "./Join.module.css";
import JoinForm from "./JoinForm";
import { useCallback, useState } from "react";
import { Button } from "@/components";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: false,
    nickname: false,
  });

  const { fetchData: fetchResister } = useAxios();
  const { fetchData: fetchDuplicateEmail } = useAxios();
  const { fetchData: fetchDuplicateNickname } = useAxios();

  const { createToast } = useToast();
  const navigate = useNavigate();

  const joinUseForm = useForm({
    resolver: zodResolver(joinScheme),
  });

  const { setError, clearErrors } = joinUseForm;

  const handleDuplicateCheck = useCallback(() => {
    if (!duplicateCheck.email) {
      setError("email", {
        type: "custom",
        message: "이메일 중복확인을 해주세요.",
      });
      return false;
    }

    if (!duplicateCheck.nickname) {
      setError("nickname", {
        type: "custom",
        message: "닉네임 중복확인을 해주세요.",
      });
      return false;
    }

    return true;
  }, [duplicateCheck.email, duplicateCheck.nickname, setError]);

  const onSubmit = useCallback(
    async (data) => {
      const isDuplicateCheck = handleDuplicateCheck();
      if (!isDuplicateCheck) return;

      // eslint-disable-next-line no-unused-vars
      const { passwordConfirm, nickname, ...rest } = data;

      await fetchResister({
        url: APIEndPoints.RESISTER,
        method: "POST",
        data: {
          ...rest,
          userName: nickname,
        },
      })
        .then(() => {
          navigate(PageEndPoints.LOGIN);
          createToast({
            type: "success",
            text: "회원가입 성공, 이메일 인증 후 사용가능합니다.",
          });
        })
        .catch((err) => {
          createToast({
            type: "error",
            text: err.message,
          });
        });
    },
    [createToast, fetchResister, handleDuplicateCheck, navigate]
  );

  const handleDuplicateEmail = useCallback(
    async (email) => {
      await fetchDuplicateEmail({
        url: APIEndPoints.USER_CHECK_EMAIL,
        method: "GET",
        params: {
          email,
        },
      })
        .then(() => {
          setDuplicateCheck((prev) => ({
            ...prev,
            email: true,
          }));
          clearErrors("email");
          createToast({
            type: "success",
            text: "사용가능한 이메일입니다.",
          });
        })
        .catch((err) => {
          setError("email", {
            type: "custom",
            message: err.message ?? "사용 불가능한 이메일 입니다.",
          });
        });
    },
    [clearErrors, createToast, fetchDuplicateEmail, setError]
  );

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
          clearErrors("nickname");
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
    [clearErrors, createToast, fetchDuplicateNickname, setError]
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>회원가입</p>

      <JoinForm
        joinUseForm={joinUseForm}
        onSubmit={onSubmit}
        handleDuplicateEmail={handleDuplicateEmail}
        handleDuplicateNickname={handleDuplicateNickname}
      />

      <div className={styles.divider} />

      <div className={styles.login_link_box}>
        <div>Already have an account?</div>

        <Button
          type="button"
          style={{
            color: "var(--color-blue-500)",
          }}
          variant="none"
          onClick={() => navigate(PageEndPoints.LOGIN)}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
