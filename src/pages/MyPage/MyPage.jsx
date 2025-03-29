import { BaseLayout } from "@/layouts";
import styles from "./MyPage.module.css";
import {
  Button,
  CityCard,
  Loading,
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
  const { user } = useAuth();
  const { fetchData, response, loading } = useAxios();
  const [nickname, setNickname] = useState(user.username);

  const navigate = useNavigate();

  const handleCityCardClick = useCallback(
    (id) => {
      const url = buildPath(PageEndPoints.DESTINATION_DETAIL, {
        id,
      });

      navigate(url);
    },
    [navigate]
  );

  useEffect(() => {
    fetchData({
      method: "GET",
      url: APIEndPoints.PREFER_DEST,
    });
  }, [fetchData]);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.main_title_box}>
          <p className={styles.main_title}>{nickname}님, 반갑습니다!</p>
          <Modal>
            <ModalTrigger>
              <Button variant="ghost" size="lg">
                내 정보 수정
              </Button>
            </ModalTrigger>
            <ModalContent>
              <MyInfo
                user={user}
                setNickname={setNickname}
                nickname={nickname}
              />
            </ModalContent>
          </Modal>
        </div>

        <MyPlan
          title="여행 계획"
          fetchUrl={APIEndPoints.TRIP_MY}
          goUrl={PageEndPoints.PLAN_MY_LIST}
        />

        <div className={styles.interest_container}>
          <div className={styles.title_box}>
            <p className={styles.title}>관심 여행지 리스트</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(PageEndPoints.PREF_CONT)}
            >
              관심 여행지 재설정하기
            </Button>
          </div>

          {loading ? (
            <Loading
              isSection
              style={{
                minHeight: "18rem",
              }}
            />
          ) : (
            <Slider items={response ?? []} size="sm">
              {(item) => (
                <div
                  className={styles.item_wrapper}
                  onClick={() => handleCityCardClick(item.name)}
                >
                  <CityCard item={item} />
                </div>
              )}
            </Slider>
          )}
        </div>

        <MyPlan
          title="좋아요 한 플랜"
          fetchUrl={APIEndPoints.TRIP_LIKED}
          goUrl={PageEndPoints.PLAN_LIKE_LIST}
        />
      </div>
    </BaseLayout>
  );
};

export default MyPage;
