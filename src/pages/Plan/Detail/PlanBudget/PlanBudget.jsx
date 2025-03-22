import { formatPrice } from "@/utils";
import styles from "./PlanBudget.module.css";
import { usePlanDetail } from "../PlanDetailContext";

const map = {
  TRANSPORTATION: "교통비",
  ACCOMMODATION: "숙박비",
  ETC: "기타",
};

const PlanBudget = () => {
  const { tripDetail, itineraries, reservations, flattendItinerary } =
    usePlanDetail();
  if (!tripDetail || !itineraries || !reservations || !flattendItinerary)
    return null;

  const { cost } = reservations;

  const itineraryTotal = flattendItinerary.reduce((acc, cur) => {
    return acc + cur.cost;
  }, 0);

  const remain =
    tripDetail.budget -
    itineraryTotal -
    (cost.TRANSPORTATION ?? 0) -
    (cost.ACCOMMODATION ?? 0) -
    (cost.ETC ?? 0);

  return (
    <div className={styles.container}>
      <p className={styles.title}>BUDGET PLAN</p>
      <div className={styles.budget_column_container}>
        <div className={styles.budget_row_container}>
          <div className={styles.budget_container}>
            <p>총 예산</p>
            <p>{formatPrice(tripDetail.budget)}원</p>
          </div>

          <div className={styles.budget_item}>
            {Object.keys(cost).map((item) => {
              const key = map[item];
              if (!key) return null;
              return (
                <div key={key} className={styles.flex_column}>
                  <p className={styles.budget_title}>{key}</p>
                  <p>{formatPrice(cost[item])}원</p>
                </div>
              );
            })}
          </div>

          <div className={styles.budget_item}>
            {flattendItinerary.map((item) => {
              return (
                <div key={item.date} className={styles.flex_column}>
                  <p className={styles.budget_title}>{item.day}일차</p>
                  <p>{formatPrice(item.cost)}원</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.remain_container}>
          <p className={styles.remain_title}>남은 예산</p>
          <p className={styles.remain_price}>{formatPrice(remain)}원</p>
        </div>
      </div>
    </div>
  );
};

export default PlanBudget;
