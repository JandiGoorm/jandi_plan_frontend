import styles from "./CityCard.module.css";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils";
import { PageEndPoints } from "@/constants";

const CityCard = ({ item }) => {
  const navigate = useNavigate();
  const path = buildPath(PageEndPoints.DESTINATION_DETAIL, { id: item.cityId });

  return (
    <div className={styles.container}>
      <div
        className={styles.img_container}
        style={{
          backgroundImage: `url(${item.imageUrl})`,
        }}
      />

      <div className={styles.plan_container}>
        <div className={styles.destination}>
          <p className={styles.city}>{item.name}</p>
          <p className={styles.country}>
            {item.country.continent.name}/{item.country.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
