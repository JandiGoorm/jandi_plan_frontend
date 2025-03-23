import styles from "./Social.module.css";
import { Button, Input, Field, Loading } from "@/components";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useToast } from "@/contexts";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthService } from "@/apis";

const SocialPage = ({fetchUrl}) => {
  const { response: loginInfo, fetchData: fetchLogin, loading } = useAxios();
  const { fetchData: fetchPrefer } = useAxios();
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  const redirectPath = location.state?.from || PageEndPoints.HOME;

  const handlePrefer = useCallback(async (token) =>{
    if(!token) return;

    fetchPrefer({
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
  },[fetchPrefer, navigate, redirectPath])

  const fetchSocial = useCallback(
    async () => {
      fetchLogin({
        method: "GET",
        url: fetchUrl,
        params: { code },
      }).then(async (res) => {
        localStorage.setItem("access-token", res.data?.accessToken);
        localStorage.setItem("refresh-token", res.data?.refreshToken);
        
        await handlePrefer(res.data?.accessToken);
      }).catch((err)=>{
        console.log(err);
      })
    }, [fetchLogin, fetchUrl, code, handlePrefer])

  useEffect(()=> {
    fetchSocial();
  },[fetchSocial])

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <p className={styles.title}>로그인 오류가 발생하였습니다. 다시 시도해주세요.</p>
      <Button onClick={() => navigate(PageEndPoints.LOGIN)}>뒤로가기</Button>
    </div>
  );
};

export default SocialPage;
