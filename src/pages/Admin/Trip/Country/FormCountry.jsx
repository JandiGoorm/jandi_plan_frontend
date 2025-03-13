import styles from "./FormCountry.module.css";
import { Button, Input, Field } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { useModal } from "@/components/Modal/ModalContext";
import { createCountrySchema } from "../constants";

const FormCountry = ({ forUse, data, onSuccess }) => {
  const { fetchData } = useAxios();
  const { createToast } = useToast();
  const { closeModal } = useModal();

  const formController = useForm({
    resolver: zodResolver(createCountrySchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formController;

  const addCountry = useCallback(
    async (data) => {
      const formData = new FormData();
      formData.append("continent", data.continent);
      formData.append("country", data.country);

      await fetchData({
        method: "POST",
        url: APIEndPoints.COUNTRY_ADD,
        data: formData,
      })
        .then(() => {
          createToast({ type: "success", text: "등록에 성공하였습니다" });
          formController.reset();
          onSuccess?.();
        })
        .catch((err) => {
          createToast({ type: "error", text: err.data.message });
        });
    },
    [createToast, fetchData, formController, onSuccess]
  );

  const updateCity = useCallback(
    async (changeData) => {
      const formData = new FormData();
      formData.append("country", changeData.country);

      await fetchData({
        method: "PATCH",
        url: buildPath(APIEndPoints.COUNTRY_MANAGE, { id: data.countryId }),
        data: formData,
      })
        .then(() => {
          createToast({ type: "success", text: "수정에 성공하였습니다" });
          closeModal();
          onSuccess?.();
        })
        .catch((err) => {
          createToast({ type: "error", text: err.data.message });
        });
    },
    [closeModal, createToast, data.countryId, fetchData, onSuccess]
  );

  const onSubmit = useCallback(
    (data) => {
      if (forUse === "PATCH") {
        // 수정 로직 추가
        updateCity(data);
      } else {
        // 추가 로직
        addCountry(data);
      }
    },
    [addCountry, forUse, updateCity]
  );

  useEffect(() => {
    if (forUse === "PATCH" && data) {
      setValue("continent", data.continent.name);
      setValue("country", data.name);
    }
  }, [forUse, data, setValue]);

  return (
    <form className={styles.form_box} onSubmit={handleSubmit(onSubmit)}>
      <Field
        label="대륙 이름"
        helperText="아시아,북미,남미,아프리카,유럽,오세아니아/대양주"
        isRequire
        error={errors.continent}
      >
        <Input
          type="text"
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="sm"
          register={register}
          name="continent"
          disabled={forUse === "PATCH"}
        />
      </Field>

      <Field
        label="국가 이름"
        helperText="ex) 대한민국, 일본..."
        isRequire
        error={errors.country}
      >
        <Input
          type="text"
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="sm"
          register={register}
          name="country"
        />
      </Field>

      <Button
        type="submit"
        size="md"
        variant="ghost"
        style={{
          marginLeft: "auto",
        }}
      >
        {forUse === "PATCH" ? "수정완료" : "추가하기"}
      </Button>
    </form>
  );
};

export default FormCountry;
