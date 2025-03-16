import styles from "./SliderSection.module.css";
import { Slider } from "@/components";

const SliderSection = ({ children, items }) => {
  const getImageUrl = (item) => item.imageUrl || item.cityImageUrl;
  const getName = (item) => item.name || item.title;

  return (
    <div className={styles.container}>
      {children}

      <Slider items={items} size="sm">
        {(item) => (
          <>
            <div
              className={styles.img_container}
              style={{
                backgroundImage: `url(${getImageUrl(item)})`,
              }}
            />
            <div className={styles.dest_container}>
              <div className={styles.dest_title}>
                <p className={styles.dest_name}>{getName(item)}</p>
              </div>
            </div>
          </>
        )}
      </Slider>
    </div>
  );
};

export default SliderSection;
