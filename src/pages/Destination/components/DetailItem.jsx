import { IoIosStar } from "react-icons/io";
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
        <div className={styles.content_header}>
          <div className={styles.header_title}>
            <div className={styles.user_info}>
              <div className={styles.user_name}>
                <p>{item.title}</p>
              </div>
              <div className={styles.create_at}>
                <p>{item.address}</p>
              </div>
            </div>
          </div>

          <div className={styles.header_stats}>
            <div className={styles.header_like}>
              <IoIosStar size={18} color={"yellow"}/>
              <p>{item.rate}({item.likeCount})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
