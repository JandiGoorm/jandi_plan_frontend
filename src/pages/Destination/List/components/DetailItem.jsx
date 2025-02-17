import styles from "./DetailItem.module.css";

const DetailItem = ({ item }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.img_container}
        style={{
          backgroundImage: `url(${item.profile_url})`,
        }}
      />
      <div className={styles.content_container}>
        <div className={styles.plan_container}>
          <div className={styles.plan_title}>
            <p className={styles.destination}>{item.destination}</p>
            <p className={styles.title}>{item.continent}/{item.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
