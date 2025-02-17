import { BaseLayout } from "@/layouts";
import styles from "./Destination.module.css";
import { planItems,dummy } from "./constants";
import Weather from "./components/Weather";
import { useState } from "react";
import DestinationMap from "./components/DestinationMap";
import {Slider} from "@/components";
import { IoIosStar } from "react-icons/io";

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
                        <DestinationMap />
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
                    <Slider items={dummy} size="sm">
                        {(item) => (
                            <>
                                <div
                                className={styles.img_container}
                                style={{
                                    backgroundImage: `url(${item.profile_url})`,
                                }}
                                />
                                <div className={styles.plan_box}>
                                <div className={styles.plan_title}>
                                    <p className={styles.plan_name}>{item.title}</p>
                                    <p className={styles.plan_destination}><IoIosStar size={16} color={"yellow"}/>{item.rate} ({item.likeCount})</p>
                                </div>
                                </div>
                            </>
                        )}
                    </Slider>
                </div>
                <div className={styles.plan_container}>
                    <div className={styles.title_box}>
                            <p className={styles.title}>Like / Favorite Trip</p>
                    </div>
                    <Slider items={planItems} size="sm">
                        {(item) => (
                        <>
                            <div
                            className={styles.img_container}
                            style={{
                                backgroundImage: `url(${item.plan.profile_url})`,
                            }}
                            />
                            <div className={styles.plan_box}>
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

export default Destination;