import { useDarkModeContext } from "@/contexts";
import styles from "./CityCard.module.css";
import { ImageWithPlaceholder } from "@/components";

const CityCard = ({ item, isInModal = false }) => {
  const { isDarkMode } = useDarkModeContext();

  return (
    <div className={styles.container}>
      <ImageWithPlaceholder
        src={item.imageUrl ?? "/none-image.png"}
        alt="도시 이미지"
        className={styles.bg_img}
      />

      <div className={styles.plan_container}>
        <div className={`${styles.destination} ${isDarkMode && styles.dark}`}>
          <p
            className={`${styles.city} ${
              isInModal && isDarkMode && styles.dark_text
            }`}
          >
            {item.name}
          </p>
          <p className={styles.country}>
            {item.country.continent.name}/{item.country.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
