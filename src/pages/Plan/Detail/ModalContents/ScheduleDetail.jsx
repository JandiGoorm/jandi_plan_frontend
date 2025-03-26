import { Button, Field, Input } from "@/components";
import styles from "./CreateSchedule.module.css";
import { usePlanDetail } from "../PlanDetailContext";

const ScheduleDetail = ({
  formController,
  onSubmit,
  handleAddressStep,
  isModify = false,
  focusDay,
}) => {
  const { formState, register, watch } = formController;
  const { tripDetail } = usePlanDetail();
  const { errors } = formState;

  if (!tripDetail) return <p>상세일정을 가지고 올 수 없습니다.</p>;

  return (
    <div className={styles.container}>
      <p className={styles.title}>일정을 {isModify ? "수정" : "추가"}하세요!</p>
      <form className={styles.form_container} onSubmit={onSubmit}>
        <Field label="날짜" isRequire error={errors.date}>
          <Input
            type="date"
            style={{ width: "100%" }}
            register={register}
            name={"date"}
            min={tripDetail.startDate}
            max={tripDetail.endDate}
            defaultValue={focusDay}
          />
        </Field>

        <Field label="시간" isRequire error={errors.time}>
          <Input
            type="time"
            style={{ width: "100%" }}
            register={register}
            name={"startTime"}
          />
        </Field>

        <Field label="제목" isRequire error={errors.title}>
          <Input
            type="text"
            style={{ width: "100%" }}
            register={register}
            name={"title"}
          />
        </Field>

        <Field label="장소" isRequire error={errors.place}>
          <div className={styles.place}>
            <Input
              type="text"
              style={{ flex: 1 }}
              value={watch("placeName") || ""}
              readOnly
            />
            <Button type="button" onClick={handleAddressStep} isInModal>
              검색
            </Button>
          </div>
        </Field>

        <Field
          label="비용"
          isRequire
          helperText="현지 통화로 입력시 자동 환율 계산(당일기준)"
          error={errors.cost}
        >
          <Input
            type="text"
            style={{ width: "100%" }}
            register={register}
            name={"cost"}
          />
        </Field>

        <Button
          variant="ghost"
          style={{
            alignSelf: "end",
          }}
          type="submit"
          isInModal
        >
          {isModify ? "수정" : "추가"}하기
        </Button>
      </form>
    </div>
  );
};

export default ScheduleDetail;
