import { buildPath } from "@/utils";
import styles from "./PlanCard.module.css";
import { FaUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { TiHeartFullOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";
import { RiLock2Fill } from "react-icons/ri";
import { useState } from "react";

const PlanCard = ({ item }) => {
  const navigate = useNavigate();
  const path = buildPath(PageEndPoints.PLAN_DETAIL, { id: item.tripId });

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseUp = (e) => {
    const deltaX = Math.abs(e.clientX - startX);
    const deltaY = Math.abs(e.clientY - startY);
    // 클릭으로 인정할 최소 이동 거리 (예: 5px 이하)
    if (deltaX < 5 && deltaY < 5) {
      navigate(path);
    }
  };

  return (
    <div
      className={styles.container}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className={styles.img_container}
        style={{
          backgroundImage: `url(${item.cityImageUrl})`,
        }}
      />
      <div className={styles.content_container}>
        <div className={styles.content_header}>
          <div className={styles.header_title}>
            <img
              src={item.user.profileImageUrl ?? "/user2.jpg"}
              className={styles.user_img}
            />
            <div className={styles.user_info}>
              <div className={styles.user_name}>
                <FaUserCircle size={20} />
                <p>{item.user.userName}</p>
              </div>
              <div className={styles.create_at}>
                <MdDateRange size={20} />
                <p>{item.startDate} ~ </p>
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
          <div className={styles.plan_title}>
            <p className={styles.title}>{item.title}</p>
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
