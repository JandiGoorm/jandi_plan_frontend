import { Button, Field, Input } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { modifyPlanScheme } from "../../constants";
import { usePlanDetail } from "../PlanDetailContext";
import styles from "./ModifyPlan.module.css";
import { useModal } from "@/components/Modal/ModalContext";
import { useCallback } from "react";

const ModifyPlan = ({ plan }) => {
  const { updatePlan } = usePlanDetail();
  const { closeModal } = useModal();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(modifyPlanScheme),
    defaultValues: {
      title: plan.title,
      privatePlan: plan.privatePlan ? "yes" : "no",
    },
  });

  const onSubmit = useCallback(
    (data) => {
      updatePlan(data);
      closeModal();
    },
    [closeModal, updatePlan]
  );

  if (!plan) return <p>해당 계획을 불러오기 실패했습니다.</p>;

  return (
    <div className={styles.container}>
      <p className={styles.title}>계획 수정</p>

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Field
          label="플랜 제목"
          helperText="ex)오사카 가족여행"
          isRequire
          error={errors.title}
        >
          <Input
            type="text"
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            size="sm"
            register={register}
            name="title"
          />
        </Field>

        <Field label="공개 여부" isRequire error={errors.privatePlan}>
          <div className={styles.private_box}>
            <div className={styles.radio_box}>
              <Input
                type="radio"
                name="privatePlan"
                value="no"
                register={register}
              />
              <div className={styles.radio_label}>공개</div>
            </div>

            <div className={styles.radio_box}>
              <Input
                type="radio"
                name="privatePlan"
                value="yes"
                register={register}
              />
              <div className={styles.radio_label}>비공개</div>
            </div>
          </div>
        </Field>

        <Button
          variant="ghost"
          style={{
            alignSelf: "end",
          }}
          type="submit"
          isInModal
        >
          수정완료
        </Button>
      </form>
    </div>
  );
};

export default ModifyPlan;
