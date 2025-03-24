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
  const { getUserInfo } = AuthService;
  const [isLogin, setIsLogin] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const state = params.get("state");
  const requestParams = state ? { code, state } : { code };

  console.log(requestParams);

  const handlePrefer = useCallback(async (token) =>{

    if(!token) return;

    await fetchPrefer({
      method: "GET",
      url: APIEndPoints.PREFER_DEST,
    }).then((res) => {
      if (Array.isArray(res.data) && res.data.length === 0) {
        window.location.href = PageEndPoints.PREF_CONT;
      } else {
        window.location.href = PageEndPoints.HOME;
      }
    });
  },[fetchPrefer, requestParams, navigate])

  const fetchSocial = useCallback(
    async () => {
       await fetchLogin({
        method: "GET",
        url: fetchUrl,
        params: requestParams,
      }).then(async (res) => {
        console.log(res.data);
        localStorage.setItem("access-token", res.data?.accessToken);
        localStorage.setItem("refresh-token", res.data?.refreshToken);
        
        await handlePrefer(res.data?.accessToken);
      }).catch((err)=>{
        console.error("소셜 로그인 오류:");
      })
    }, [fetchLogin, fetchUrl, code])

  useEffect(()=> {
    fetchSocial();
  },[])

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
