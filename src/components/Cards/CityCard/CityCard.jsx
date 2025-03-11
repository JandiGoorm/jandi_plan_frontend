import styles from "./CityCard.module.css";

const CityCard = ({ item }) => {
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
