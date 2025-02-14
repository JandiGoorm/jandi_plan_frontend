import { FaCommentAlt, FaUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { TiHeartFullOutline } from "react-icons/ti";
import styles from "./DetailItem.module.css";

const DetailItem = ({ item }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.img_container}
        style={{
          backgroundImage: `url(${item.plan.profile_url})`,
        }}
      />
      <div className={styles.content_container}>
        <div className={styles.content_header}>
          <div className={styles.header_title}>
            <img src={item.user.profile_url} className={styles.user_img} />
            <div className={styles.user_info}>
              <div className={styles.user_name}>
                <FaUserCircle size={20} />
                <p>{item.user.nickname}</p>
              </div>
              <div className={styles.create_at}>
                <MdDateRange size={20} />
                <p>{item.plan.create_at}</p>
              </div>
            </div>
          </div>

          <div className={styles.header_stats}>
            <div className={styles.header_like}>
              <TiHeartFullOutline size={20} color="var(--color-red-500)" />
              <p>{item.plan.like}</p>
            </div>

            <div className={styles.header_comment}>
              <FaCommentAlt size={15} color="var(--color-indigo-500)" />
              <p>{item.plan.comment}</p>
            </div>
          </div>
        </div>

        <div className={styles.plan_container}>
          <div className={styles.plan_title}>
            <p className={styles.destination}>{item.plan.destination}</p>
            <p className={styles.title}>{item.plan.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
