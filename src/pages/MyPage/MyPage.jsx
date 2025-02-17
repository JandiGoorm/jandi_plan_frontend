import { BaseLayout } from "@/layouts";
import styles from "./MyPage.module.css";
import { Button, Modal, ModalContent, ModalTrigger, Slider } from "@/components";
import DetailItem from "./Components/DetailItem";
import { destinationItems, dummy } from "./constants";
import MyInfo from "./Components/MyInfo";

const MyPage = () => {

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.main_title_box}>
            <p className={styles.main_title}>민근 님, 반갑습니다!</p>
          <Modal>
            <ModalTrigger>
              <Button variant="ghost" size="lg">
                내 정보 수정
              </Button>
            </ModalTrigger>
            <ModalContent>
              <MyInfo />
            </ModalContent>
          </Modal>
        </div>
        <div className={styles.myplan_box}>
          <div className={styles.title_box}>
            <p className={styles.title}>여행 계획</p>
          </div>
          <Slider items={dummy} size="md">
            {(item) => <DetailItem key={item.plan.id} item={item} />}
          </Slider>
        </div>

        <div className={styles.interest_container}>
          <div className={styles.title_box}>
            <p className={styles.title}>관심 여행지 리스트</p>
            <Button variant="ghost" size="sm">
              관심 여행지 수정하기
            </Button>
          </div>
          <Slider items={destinationItems} size="sm">
            {(item) => (
              <>
                <div
                  className={styles.img_container}
                  style={{
                    backgroundImage: `url(${item.imgSrc})`,
                  }}
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

        <div className={styles.like_container}>
          <div className={styles.title_box}>
            <p className={styles.title}>좋아요한 플랜</p>
          </div>
          <Slider items={dummy} size="sm">
          {(item) => (
            <>
              <div
                className={styles.img_container}
                style={{
                  backgroundImage: `url(${item.plan.profile_url})`,
                }}
              />
              <div className={styles.plan_container}>
                <div className={styles.plan_title}>
                  <p className={styles.plan_name}>{item.plan.title}</p>
                  <p className={styles.plan_destination}>{item.plan.destination}</p>
                </div>
              </div>
            </>
          )}
        </Slider>
        </div>
      </div>
    </BaseLayout>
  );
};

export default MyPage;
