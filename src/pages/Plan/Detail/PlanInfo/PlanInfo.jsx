import styles from "./PlanInfo.module.css";
import { FaThumbsUp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BsPersonArmsUp } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { usePlanDetail } from "../PlanDetailContext";

const PlanInfo = (user) => {
  const { tripDetail } = usePlanDetail();
  console.log(user.user.userId);
  console.log(tripDetail);

  if (!tripDetail) return null;
  return (
    <div className={styles.container}>
      <div className={styles.header_box}>
        <p className={styles.title}>{tripDetail.title}</p>
        {tripDetail.user.userId === user.user.userId ?
          <div className={styles.header_menu}>
            <p className={styles.username}>수정</p>
            <p className={styles.username}>삭제</p>
          </div>
        : 
        <div className={styles.header_menu}>
          <p className={styles.username}>{user.user.username}</p>
        </div>
        }
      </div>
      <div className={styles.info}>
        <div className={styles.flex_row}>
          <IoLocationSharp size={20} />
          <p>
            {"나라"}, {"목적지"}
          </p>
        </div>
        <div className={styles.flex_row}>
          <BsPersonArmsUp size={20} />
          <p>1 명</p>
        </div>
        <div className={styles.flex_row}>
          <MdDateRange size={20} />
          <p>
            {tripDetail.startDate} ~ {tripDetail.endDate}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PlanInfo;
