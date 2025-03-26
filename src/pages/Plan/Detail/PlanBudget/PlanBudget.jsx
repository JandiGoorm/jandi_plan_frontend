import { formatPrice } from "@/utils";
import { IoSearch } from "react-icons/io5";
import { usePlanDetail } from "../PlanDetailContext";
import styles from "./PlanBudget.module.css";

const map = {
  TRANSPORTATION: "교통비",
  ACCOMMODATION: "숙박비",
  ETC: "기타",
  TOTAL: "총 예약 금액",
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
      <div className={styles.title}>
        <IoSearch />
        <p>예산을 한눈에 확인해보세요 !</p>
      </div>

      <div className={styles.invoice_container}>
        <div className={styles.invoice}>
          <div className={styles.invoice_detail}>
            <p className={styles.info}>예산 요약</p>

            <div className={styles.summary}>
              <div className={styles.summary_item}>
                <span className={styles.item_title}>총 예산</span>
                <span>{formatPrice(tripDetail.budget)}원</span>
              </div>
              <div className={styles.summary_item}>
                <span className={styles.item_title}>사용 금액</span>
                <span>{formatPrice(tripDetail.budget - remain)}원</span>
              </div>
              <div className={styles.summary_item}>
                <span className={styles.item_title}>남은 예산</span>
                <span
                  className={styles.remain}
                  style={{
                    color:
                      remain < 0
                        ? "var(--color-red-500)"
                        : "var(--color-blue-600)",
                  }}
                >
                  {formatPrice(remain)}원
                </span>
              </div>
            </div>
          </div>

          <div className={styles.invoice_detail}>
            <p className={styles.info}>예약 항목별 금액 상세 내역</p>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>예산 항목</th>
                  <th>금액</th>
                </tr>
              </thead>

              <tbody>
                {cost &&
                  Object.entries(map).map(([key, value]) => {
                    const detailCost = cost[key];

                    return (
                      <tr
                        className={
                          key === "TOTAL"
                            ? styles.service_title
                            : styles.service
                        }
                        key={key}
                      >
                        <td className={styles.table_item}>{value}</td>

                        <td className={styles.table_item}>
                          {formatPrice(detailCost)}원
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.invoice}>
          <div className={styles.invoice_detail}>
            <p className={styles.info}>일정별 예산 상세 내역</p>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>일정</th>
                  <th>금액</th>
                </tr>
              </thead>

              <tbody>
                {flattendItinerary.map((item) => (
                  <tr className={styles.service} key={item.date}>
                    <td className={styles.table_item}>
                      {item.day}일차 ({item.date})
                    </td>
                    <td className={styles.table_item}>
                      {formatPrice(item.cost)}원
                    </td>
                  </tr>
                ))}
                <tr className={styles.service_title}>
                  <td className={styles.table_item}>
                    일정에 사용된 금액 ({flattendItinerary.length}일)
                  </td>
                  <td className={styles.table_item}>
                    {formatPrice(itineraryTotal)}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanBudget;
