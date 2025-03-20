import { Button } from "@/components";
import { formatDate } from "date-fns";
import styles from "./MyInfo.module.css";
import PasswordForm from "./PasswordForm";
import { useCallback, useState } from "react";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";

const MyInfo = ({ user, onProfileChange  }) => {
  console.log(user);
  const { loading, fetchData, response } = useAxios();
  const { createToast } = useToast();
  const formatted = formatDate(user.updatedAt, "yyyy-MM-dd");
  const [profile, setProfile] = useState(user.profileImageUrl);
  const handleChangeProfileImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      // 프로필 이미지 변경 API 호출 추가
      fetchData({
        method: "POST",
        url: APIEndPoints.PROFILE_UPLOAD,
        data: formData,
      }).then((res)=>{
        createToast({
          type: "success",
          text: "프로필 이미지가 변경되었습니다.",
        });
        setProfile(res.data.imageUrl);
        onProfileChange();
      }).catch((err)=>{
        console.log(err)
        createToast({
          type: "error",
          text: "프로필 이미지 변경에 실패하였습니다.",
        });
      })
    };
  }, [onProfileChange]);

  return (
    <div className={styles.container}>
      <div className={styles.basic_info_container}>
        <p className={styles.title}>기본 정보</p>
        <div className={styles.info_box}>
          <div className={styles.user_photo_box}>
            <img
              src={profile ?? "/user1.png"}
              alt="profile_img"
              className={styles.user_photo}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleChangeProfileImage}
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
              <p className={styles.info_value}>{user.username}</p>
            </div>
          </div>
        </div>
      </div>

      <PasswordForm />
    </div>
  );
};

export default MyInfo;
