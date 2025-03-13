import { Button } from "@/components";
import styles from "./PlanTable.module.css";

const PlanTable = ({ plans }) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>여행지</th>
            <th>기간</th>
            <th>생성일</th>
            <th className={styles.action_title}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((trip) => {
            return (
              <tr key={trip.tripId}>
                <td>{trip.tripId}</td>
                <td>{trip.cityName}</td>
                <td>
                  {trip.startDate} ~ {trip.endDate}
                </td>
                <td>{trip.createdAt}</td>
                <td>
                  <div className={styles.actions}>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                    <Button size="sm" variant="ghost">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlanTable;
