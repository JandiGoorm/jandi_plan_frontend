import styles from "./FormCreatePlan.module.css";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalTrigger,
  Field,
} from "@/components";
import Destination from "./ModalContents/Destination";

const FormCreatePlan = ({
  onSubmit,
  setSelectedCity,
  selectedCity,
  useForm,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm;

  return (
    <form className={styles.plan_box} onSubmit={onSubmit}>
      <div className={styles.plan_columns}>
        <Field label="여행지" isRequire>
          <div className={styles.place}>
            <Input
              style={{
                flex: 1,
              }}
              size="sm"
              value={selectedCity?.name || ""}
              readOnly
            />
            <Modal>
              <ModalTrigger>
                <Button type="button">선택</Button>
              </ModalTrigger>
              <ModalContent>
                <Destination setSelectedCity={setSelectedCity} />
              </ModalContent>
            </Modal>
          </div>

          {errors.cityId && (
            <p className={styles.error}>{errors.cityId.message}</p>
          )}
        </Field>
      </div>

      <div className={styles.plan_columns}>
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
      </div>

      <div className={styles.plan_columns}>
        <Field label="출발일" isRequire error={errors.startDate}>
          <Input
            type="date"
            style={{ width: "100%" }}
            size="sm"
            register={register}
            name="startDate"
          />
        </Field>
      </div>

      <div className={styles.plan_columns}>
        <Field label="도착일" isRequire error={errors.endDate}>
          <Input
            type="date"
            style={{ width: "100%" }}
            size="sm"
            register={register}
            name="endDate"
          />
        </Field>
      </div>

      <div className={styles.plan_columns}>
        <Field label="예산안" isRequire error={errors.budget}>
          <Input
            type="number"
            size="sm"
            style={{ width: "100%" }}
            register={register}
            name="budget"
          />
        </Field>
      </div>

      <div className={styles.plan_columns}>
        <Field label="공개 여부" isRequire>
          <div className={styles.private_box}>
            <div className={styles.radio_box}>
              <Input
                type="radio"
                name="privatePlan"
                value="no"
                register={register}
                defaultChecked
                style={{
                  width: "fit-content",
                }}
              />
              <div className={styles.radio_label}>공개</div>
            </div>

            <div className={styles.radio_box}>
              <Input
                type="radio"
                name="privatePlan"
                value="yes"
                register={register}
                style={{
                  width: "fit-content",
                }}
              />
              <div className={styles.radio_label}>비공개</div>
            </div>
          </div>
        </Field>
      </div>

      <div className={styles.button_container}>
        <Button size="lg" variant="ghost" type="submit">
          플랜 추가하기
        </Button>
      </div>
    </form>
  );
};

export default FormCreatePlan;
