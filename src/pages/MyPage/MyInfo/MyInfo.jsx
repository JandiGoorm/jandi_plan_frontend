import { Button } from "@/components";
import { formatDate } from "date-fns";
import styles from "./MyInfo.module.css";
import PasswordForm from "./PasswordForm";
import { useCallback, useState } from "react";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { useAuth, useToast } from "@/contexts";
import { handleApiCall } from "@/utils";
import NicknameForm from "./NicknameForm";

const MyInfo = ({ user, setNickname, nickname }) => {
  const [profile, setProfile] = useState(user.profileImageUrl);
  const { fetchData } = useAxios();
  const { createToast } = useToast();
  const { refetchUserInfo } = useAuth();

  const formatted = formatDate(user.updatedAt, "yyyy-MM-dd");

  const handleChangeProfileImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      handleApiCall(
        () =>
          fetchData({
            method: "POST",
            url: APIEndPoints.PROFILE_UPLOAD,
            data: formData,
          }),
        "프로필 이미지가 변경되었습니다.",
        "프로필 이미지 변경에 실패하였습니다.",
        createToast,
        (res) => {
          setProfile(res.data.imageUrl);
          refetchUserInfo();
        }
      );
    };
  }, [createToast, fetchData, refetchUserInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.basic_info_container}>
        <p className={styles.title}>기본 정보</p>
        <div className={styles.info_box}>
          <div className={styles.user_photo_box}>
            <img
              src={profile ?? "/none-user.webp"}
              alt="profile_img"
              className={styles.user_photo}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleChangeProfileImage}
              isInModal
            >
              이미지 변경
            </Button>
          </div>

          <div className={styles.basic_info_box}>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>이름</p>
              <p className={styles.info_value}>
                {user.firstName}
                {user.lastName}
              </p>
            </div>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>이메일</p>
              <p className={styles.info_value}>{user.email}</p>
            </div>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>생성일</p>
              <p className={styles.info_value}>{formatted}</p>
            </div>
            <div className={styles.basic_info}>
              <p className={styles.info_name}>닉네임</p>
              <p className={styles.info_value}>{nickname}</p>
            </div>
          </div>
        </div>
      </div>

      <NicknameForm setNickname={setNickname} />

      <PasswordForm />
    </div>
  );
};

export default MyInfo;
