import { useCallback } from "react";
import styles from "./DestinationInfo.module.css";
import Weather from "./Weather";

const DestinationInfo = ({ latitude, longitude }) => {
  const handleClick = useCallback((value) => {
    const map = {
      plane: `https://www.skyscanner.co.kr/`,
      hotel: `https://www.agoda.com/`,
    };

    window.open(map[value], "_blank");
  }, []);

  return (
    <div className={styles.info_box}>
      <div className={styles.weather_box}>
        <Weather latitude={latitude} longitude={longitude} />
      </div>
      <div className={styles.plane_box} onClick={() => handleClick("plane")}>
        <p className={styles.item_title}>비행기 값 알아보기</p>
      </div>
      <div className={styles.hotel_box} onClick={() => handleClick("hotel")}>
        <p className={styles.item_title}>숙소 알아보기</p>
      </div>
    </div>
  );
};

export default DestinationInfo;
