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
          <img src="/naver_icon.png" className={styles.social_btn} 
            onClick={async () => {window.location.href =
              `https://nid.naver.com/oauth2.0/authorize?client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173${PageEndPoints.NAVER_JOIN}&state=${import.meta.env.VITE_NAVER_CLIENT_SECRET}`
              }}
          />
          <img src="/kakao_icon.png" className={styles.social_btn} 
            onClick={async () => {window.location.href =
              `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=http://localhost:5173${PageEndPoints.KAKAO_JOIN}&response_type=code`
              }}
          />
          <img src="/google_icon.png" className={styles.social_btn} />
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
