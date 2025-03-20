import { BaseLayout } from "@/layouts";
import styles from "./MyPage.module.css";
import {
  Button,
  Modal,
  ModalContent,
  ModalTrigger,
  Slider,
} from "@/components";
import { useAuth } from "@/contexts";
import MyPlan from "./MyPlan/MyPlan";
import MyInfo from "./MyInfo/MyInfo";
import { useCallback, useEffect, useState } from "react";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [preferDest, setPreferDest] = useState([]);
  const { user } = useAuth();
  const { loading, fetchData } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.PREFER_DEST}`,
    }).then((res)=>{
      console.log(res.data);
      setPreferDest(res.data);
    })
  }, []);

  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.main_title_box}>
          <p className={styles.main_title}>{user.username}님, 반갑습니다!</p>
          <Modal>
            <ModalTrigger>
              <Button variant="ghost" size="lg">
                내 정보 수정
              </Button>
            </ModalTrigger>
            <ModalContent>
              <MyInfo user={user} />
            </ModalContent>
          </Modal>
        </div>

        <MyPlan title="여행 계획" fetchUrl={APIEndPoints.TRIP_MY} goUrl={PageEndPoints.PLAN_MY_LIST}/>

        <div className={styles.interest_container}>
          <div className={styles.title_box}>
            <p className={styles.title}>관심 여행지 리스트</p>
            <Button variant="ghost" size="sm" onClick={()=>navigate(PageEndPoints.PREF_CONT, { replace: true, state:{ mode: "edit"} })}>
              관심 여행지 재설정하기
            </Button>
          </div>
          <Slider items={preferDest} size="sm">
            {(item) => (
              <>
                <div
                  className={styles.img_container}
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                  }}
                  onClick={() => navigate(buildPath(PageEndPoints.DESTINATION_DETAIL, { id: item.cityId }), { state: { cityName: item.name } })}
                />
                <div className={styles.dest_container}>
                  <div className={styles.dest_title}>
                    <p className={styles.dest_name}>{item.name}</p>
                  </div>
                </div>
              </>
            )}
          </Slider>
        </div>

        <MyPlan title="좋아요 한 플랜"  fetchUrl={APIEndPoints.TRIP_LIKED} goUrl={PageEndPoints.PLAN_LIKE_LIST}/>
        
      </div>
    </BaseLayout>
  );
};

export default MyPage;
