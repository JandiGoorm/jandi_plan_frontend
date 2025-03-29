import { Button } from "@/components";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAuth, useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { loginScheme } from "../constants";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm";
import { handleApiCall } from "@/utils";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn } = useAuth();
  const { fetchData } = useAxios();
  const { createToast } = useToast();
  const { fetchData: fetchLogin } = useAxios();

  const formController = useForm({
    resolver: zodResolver(loginScheme),
  });

  const { handleSubmit } = formController;

  const onSubmit = useCallback(
    async (data) => {
      handleApiCall(
        () => signIn(data),
        "로그인에 성공하셨습니다.",
        null,
        createToast,
        null,
        (err) => createToast({ type: "error", text: err.message })
      );
    },
    [createToast, signIn]
  );

  const handleNaver = () => {
    fetchLogin({
      method: "GET",
      url: APIEndPoints.NAVER_LOGIN_URL,
    })
      .then((res) => {
        console.log(res.data);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.error("소셜 로그인 오류:");
      });
  };
  useEffect(() => {
    if (!user) return;

    fetchData({
      method: "GET",
      url: APIEndPoints.PREFER_DEST,
    }).then((res) => {
      if (Array.isArray(res.data) && res.data.length === 0) {
        navigate(PageEndPoints.PREF_CONT, {
          replace: true,
          state: { mode: "create" },
        });
      } else {
        const redirectPath = location.state?.from || PageEndPoints.HOME;
        navigate(redirectPath, { replace: true });
      }
    });
  }, [fetchData, location.state?.from, navigate, user]);

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <div className={styles.logo}>Just Plan It !</div>

        <LoginForm
          onSubmit={handleSubmit(onSubmit)}
          formController={formController}
        />
        <div className={styles.divider} />

        <div className={styles.social_login_btns}>
          <img
            src="/naver_icon.png"
            className={styles.social_btn}
            onClick={handleNaver}
          />
          <img
            src="/kakao_icon.png"
            className={styles.social_btn}
            onClick={async () => {
              window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
                import.meta.env.VITE_KAKAO_REST_API_KEY
              }&redirect_uri=https://justplanit.site${
                PageEndPoints.KAKAO_JOIN
              }&response_type=code`;
            }}
          />
          <img
            src="/google_icon.png"
            className={styles.social_btn}
            onClick={async () => {
              window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
                import.meta.env.VITE_GOOGLE_CLIENT_ID
              }&redirect_uri=https://justplanit.site${
                PageEndPoints.GOOGLE_JOIN
              }&response_type=code&scope=openid%20email%20profile`;
            }}
          />
        </div>
      </div>

      <Button
        variant="none"
        style={{
          color: `var(--color-text-dynamic)`,
        }}
        onClick={() => navigate(PageEndPoints.JOIN)}
      >
        새로운 계정을 만들어보세요
      </Button>
    </div>
  );
};

export default LoginPage;
