import { usePlan } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createPlanScheme } from "../constants";
import styles from "./CreatePlan.module.css";
import FormCreatePlan from "./FormCreatePlan";

const CreatePlanPage = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const planUseForm = useForm({
    resolver: zodResolver(createPlanScheme),
  });

  const { handleSubmit, setValue } = planUseForm;
  const { addPlan } = usePlan();

  useEffect(() => {
    if (selectedCity) {
      setValue("cityId", selectedCity.cityId);
    } else {
      setValue("cityId", null);
    }
  }, [selectedCity, setValue]);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div
          className={`${styles.plan_photo_box} ${
            selectedCity?.imageUrl ? styles.has_image : styles.no_image
          }`}
        >
          {selectedCity?.imageUrl ? (
            <img
              src={selectedCity.imageUrl}
              alt="destination_img"
              className={styles.plan_photo}
            />
          ) : null}
        </div>

        <div
          className={styles.plan_container}
          style={{
            marginRight: selectedCity ? "0px" : "1rem",
          }}
        >
          <p className={styles.title}>어디로 놀러가시나요?</p>

          <FormCreatePlan
            onSubmit={handleSubmit(addPlan)}
            setSelectedCity={setSelectedCity}
            selectedCity={selectedCity}
            useForm={planUseForm}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default CreatePlanPage;
