import { BaseLayout } from "@/layouts";
import styles from "./Destination.module.css";
import { destinationItems,dummy } from "./constants";
import Weather from "./components/Weather";
import { useState } from "react";
import DetailItem from "./components/DetailItem";

const Destination = () => {
    const [selectedPlace, setSelectedPlace] = useState("Osaka");

    return(
        <BaseLayout>
            <div className={styles.container}>
                <div className={styles.title_box}>
                    <p className={styles.main_title}>OSAKA</p>
                </div>
                <div className={styles.info_container}>
                    <div className={styles.map_container}>
                        <h1>지도</h1>
                    </div>
                    <div className={styles.info_box}>
                        <div className={styles.weather_box}>
                            <Weather city={selectedPlace}/>
                        </div>
                        <div className={styles.plane_box}>
                            <p className={styles.item_title}>비행기 값 알아보기</p>
                        </div>
                        <div className={styles.hotel_box}>
                            <p className={styles.item_title}>숙소 알아보기</p>
                        </div>
                    </div>
                </div>
                <div className={styles.restraunt_container}>
                    <div className={styles.title_box}>
                            <p className={styles.title}>Famous Restraunt</p>
                    </div>
                    <div className={styles.restraunt_box}>
                        {dummy.map((item) => (
                        <DetailItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
                <div className={styles.plan_container}>
                    <div className={styles.title_box}>
                            <p className={styles.title}>Like / Favorite Trip</p>
                    </div>
                    <div className={styles.plan_box}>
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

export default Destination;