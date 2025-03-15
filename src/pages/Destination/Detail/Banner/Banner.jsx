import Header from "@/layouts/BaseLayout/Header";
import styles from "./Banner.module.css";

const Banner = ({ item }) => {
  return (
    <div
      className={styles.banner_container}
      style={{ backgroundImage: `url(${item.imageUrl})` }}
    >
      <div className={styles.header_wrapper}>
        <div className={styles.header}>
          <Header forceDark={true} />
        </div>
      </div>

      <div className={styles.header_centered}>
        <p>
          {item.country.name}, {item.name}
        </p>
      </div>
    </div>
  );
};

export default Banner;
