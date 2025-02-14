import { BaseLayout } from "@/layouts";
import styles from "./MyPage.module.css";
import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import DetailItem from "./Components/DetailItem";
import { destinationItems, dummy } from "./constants";
import MyInfo from "./Components/MyInfo";


const MyPage = () => {

    return (
        <BaseLayout>
            <div className={styles.continer}>
                <div className={styles.info_edit_box}>
                    <Modal>
                        <ModalTrigger>
                            <Button variant="outline" size="md">내 정보 수정</Button>
                        </ModalTrigger>
                        <ModalContent>
                            <MyInfo />
                        </ModalContent>
                    </Modal>                   
                </div>
                <div className={styles.my_travel_plan_box}>
                    <div className={styles.title_box}>
                        <p className={styles.title}>민근 님의 Travel Plan</p>
                    </div>
                    <div className={styles.plan_container}>
                    {dummy.map((item) => (
                    <DetailItem key={item.plan.id} item={item} />
                    ))}
                    </div>
                </div>
                <div>
                    <div className={styles.title_box}>
                        <p className={styles.title}>민근 님의 Interested Place</p>
                    </div>
                    <div className={styles.place_container}>
                        {destinationItems.map((item) => (
                            <div className={styles.place_box} key={item.name}>
                                <img
                                    src={item.imgSrc}
                                    alt="destination"
                                    className={styles.des_img}
                                />
                                <p className={styles.des_img_title}>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className={styles.title_box}>
                        <p className={styles.title}>Like / Favorite Trip</p>
                    </div>
                    <div className={styles.place_container}>
                        {destinationItems.map((item) => (
                            <div className={styles.place_box} key={item.name}>
                                <img
                                    src={item.imgSrc}
                                    alt="destination"
                                    className={styles.des_img}
                                />
                                <p className={styles.des_img_title}>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default MyPage;