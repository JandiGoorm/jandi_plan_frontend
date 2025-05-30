import { useDarkModeContext } from "@/contexts";
import { FaUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { TiHeartFullOutline } from "react-icons/ti";
import styles from "./PlanCard.module.css";
import { ImageWithPlaceholder } from "@/components";

const PlanCard = ({ item }) => {
  const { isDarkMode } = useDarkModeContext();

  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <ImageWithPlaceholder
          src={item.tripImageUrl || item.cityImageUrl}
          alt="여행지 이미지"
          className={styles.bg_img}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content_container}>
        <div className={styles.content_header}>
          <div className={styles.header_title}>
            <div className={styles.user_img_box}>
              <ImageWithPlaceholder
                src={item.user.profileImageUrl ?? "/none-user.webp"}
                alt="유저 프로필 이미지"
              />
            </div>

            <div className={styles.user_info}>
              <div className={styles.user_name}>
                <FaUserCircle size={20} />
                <p>{item.user.userName}</p>
              </div>
              <div className={styles.create_at}>
                <MdDateRange size={20} />
                <p>{item.startDate ? item.startDate + " ~ " : ""}</p>
              </div>
            </div>
          </div>

          <div className={styles.header_stats}>
            {item.privatePlan && (
              <RiLock2Fill size={18} color="var(--color-indigo-500)" />
            )}

            <div className={styles.header_like}>
              <TiHeartFullOutline size={20} color="var(--color-red-500)" />
              <p>{item.likeCount}</p>
            </div>
          </div>
        </div>

        <div className={styles.plan_container}>
          <div className={`${styles.plan_title} ${isDarkMode && styles.dark}`}>
            <p className={styles.title}>
              {item.title.trim() ? item.title : "비공개 여행"}
            </p>
            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
