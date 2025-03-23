import styles from "./Social.module.css";
import { Button, Input, Field } from "@/components";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useToast } from "@/contexts";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SocialPage = ({fetchUrl}) => {
  const { response: loginInfo, fetchData: fetchLogin } = useAxios();
  const navigate = useNavigate();
  const [duplicateCheck, setDuplicateCheck] = useState({
    nickname: false,
  });
  const { createToast } = useToast();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  const redirectPath = location.state?.from || PageEndPoints.HOME;

  useEffect(()=> {
    fetchLogin({
      method: "GET",
      url: fetchUrl,
      params: { code },
    }).then((res) => {
      console.log(res.data);
      localStorage.setItem("access-token", res.data?.accessToken);
      localStorage.setItem("refresh-token", res.data?.refreshToken);

      navigate(PageEndPoints.HOME);
    }).catch((err)=>{
      console.log(err);
    })
  },[fetchLogin, code])

  return (
    <div className={styles.container}>
      <p className={styles.title}>소셜 회원가입</p>
      
    </div>
  );
};

export default SocialPage;
