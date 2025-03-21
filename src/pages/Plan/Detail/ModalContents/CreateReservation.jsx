import { Button, Field, Input } from "@/components";
import styles from "./CreateReservation.module.css";
import { useForm } from "react-hook-form";
import { usePlanDetail } from "../PlanDetailContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReservationScheme } from "../../constants";

const CreateReservation = () => {
  const formController = useForm({
    resolver: zodResolver(createReservationScheme),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = formController;
  const { addReservation } = usePlanDetail();

  const onSubmit = (data) => {
    addReservation(data);
    formController.reset();
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>예약항목을 추가하세요!</p>
      <Field
        label="카테고리"
        isRequire
        helperText="카테고리를 선택해주세요"
        error={errors.category}
      >
        <select
          className={styles.select_container}
          {...register("category")}
          value={watch("category")}
        >
          <option value="교통편">교통편</option>
          <option value="숙박">숙박</option>
          <option value="기타">기타</option>
        </select>
      </Field>

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.public_container}>
          <Field
            label="제목"
            helperText="ex)출국 비행기, OO호텔, 보험료"
            isRequire
            error={errors.title}
          >
            <Input
              type="text"
              style={{ width: "100%" }}
              register={register}
              name="title"
            />
          </Field>

          <Field
            label="비용"
            helperText="현지 통화로 입력시 자동 환율 계산(당일기준)"
            isRequire
            error={errors.cost}
          >
            <Input
              type="text"
              style={{ width: "100%" }}
              register={register}
              name="cost"
            />
          </Field>
        </div>

        <Button
          variant="ghost"
          style={{
            alignSelf: "end",
          }}
          type="submit"
          isInModal
        >
          추가하기
        </Button>
      </form>
    </div>
  );
};

export default CreateReservation;
