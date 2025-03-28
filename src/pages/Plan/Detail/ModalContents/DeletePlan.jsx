import { Button } from "@/components";
import { useModal } from "@/components/Modal/ModalContext";
import styles from "./DeletePlan.module.css";
import { usePlanDetail } from "../PlanDetailContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";

const DeletePlan = () => {
  const { closeModal } = useModal();
  const { deletePlan } = usePlanDetail();
  const navigate = useNavigate();

  const deleteSuccessCallback = useCallback(() => {
    navigate(PageEndPoints.PLAN_LIST);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>정말 삭제하시겠습니까?</p>
      <div className={styles.flex_box}>
        <Button
          variant="solid"
          style={{
            flex: 1,
          }}
          onClick={() => deletePlan(deleteSuccessCallback)}
          isInModal
        >
          삭제하기
        </Button>
        <Button
          variant="solid"
          style={{
            flex: 1,
          }}
          onClick={() => closeModal()}
          isInModal
        >
          돌아가기
        </Button>
      </div>
    </div>
  );
};

export default DeletePlan;
