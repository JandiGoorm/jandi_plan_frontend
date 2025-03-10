import styles from "./MainContent.module.css";
import { Button, Slider } from "@/components";

const MainContent = ({title, items}) => {
    console.log(items);

    const getImageUrl = (item) => item.imageUrl || item.cityImageUrl;
    const getName = (item) => item.name || item.title;

    return(
        <div className={styles.interest_container}>
            <div className={styles.title_box}>
                <p className={styles.title}>{title}</p>
            </div>
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
}

export default MainContent;