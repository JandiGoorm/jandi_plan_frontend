import styles from "./PlanDetailWrapper.module.css";
import { Button, EmptyItem, Loading } from "@/components";
import { usePlanDetail } from "./PlanDetailContext";
import Banner from "./Banner/Banner";
import PlanInfo from "./PlanInfo/PlanInfo";
import PlanMap from "./PlanMap/PlanMap";
import PlanDes from "./PlanDes/PlanDes";
import PlanBudget from "./PlanBudget/PlanBudget";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const PlanDetailWrapper = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const { tripDetail, tripDetailLoading } = usePlanDetail();

  if (tripDetailLoading) {
    return <Loading />;
  }

  if (!tripDetail) {
    return (
      <div className={styles.empty}>
        <div className={styles.flex_column}>
          <p className={styles.title}>비공개처리된 여행계획 입니다.</p>
          <EmptyItem />
          <Button variant="ghost" onClick={handleBack}>
            되돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.centered}>
        <PlanInfo />
        <PlanMap />
        <PlanDes />
        <PlanBudget />
      </div>
    </div>
  );
};

export default PlanDetailWrapper;
