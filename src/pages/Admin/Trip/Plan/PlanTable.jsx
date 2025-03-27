import { Button } from "@/components";
import styles from "./PlanTable.module.css";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils";
import { PageEndPoints } from "@/constants";
import { useCallback } from "react";
import { usePlan } from "@/hooks";

const PlanTable = ({ plans, refetchPlans }) => {
  const navigate = useNavigate();
  const { deletePlan } = usePlan();

  const handleViewCilck = useCallback(
    (id) => {
      const url = buildPath(PageEndPoints.PLAN_DETAIL, { id });
      navigate(url);
    },
    [navigate]
  );

  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>여행지</th>
            <th>기간</th>
            <th>Private</th>
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
                <td>{trip.privatePlan ? "비공개" : "공개"}</td>
                <td>
                  <div className={styles.actions}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewCilck(trip.tripId)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deletePlan(refetchPlans, trip.tripId)}
                    >
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
