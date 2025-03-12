import styles from "./FormCity.module.css";
import { Button, Input, Field } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCitySchema } from "./constants";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { useCallback, useEffect } from "react";
import { buildPath } from "@/utils";
import { useModal } from "@/components/Modal/ModalContext";

const FormCity = ({ forUse, data, onSuccess }) => {
  const { fetchData } = useAxios();
  const { createToast } = useToast();
  const { closeModal } = useModal();

  const formController = useForm({
    resolver: zodResolver(createCitySchema(forUse)),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formController;

  const addCity = useCallback(
    async (data) => {
      const formData = new FormData();
      formData.append("country", data.country);
      formData.append("city", data.city);
      formData.append("description", data.description);
      formData.append("file", data.file?.[0]);
      formData.append("latitude", parseFloat(data.latitude));
      formData.append("longitude", parseFloat(data.longitude));

      await fetchData({
        method: "POST",
        url: APIEndPoints.CITY_ADD,
        data: formData,
      })
        .then(() => {
          createToast({ type: "success", text: "등록에 성공하였습니다" });
          onSuccess?.();
        })
        .catch((err) => {
          createToast({ type: "error", text: err.data.message });
        });
    },
    [createToast, fetchData, onSuccess]
  );

  const updateCity = useCallback(
    async (changeData) => {
      const formData = new FormData();
      formData.append("country", changeData.country);
      formData.append("city", changeData.city);
      formData.append("description", changeData.description);
      if (changeData.file?.[0]) {
        formData.append("file", changeData.file[0]);
      }
      formData.append("latitude", parseFloat(changeData.latitude));
      formData.append("longitude", parseFloat(changeData.longitude));

      await fetchData({
        method: "PATCH",
        url: buildPath(APIEndPoints.CITY_MANAGE, { id: data.cityId }),
        data: formData,
      })
        .then(() => {
          createToast({ type: "success", text: "수정에 성공하였습니다" });
          onSuccess?.();
          closeModal();
        })
        .catch((err) => {
          createToast({ type: "error", text: err.data.message });
        });
    },
    [closeModal, createToast, data.cityId, fetchData, onSuccess]
  );

  const onSubmit = useCallback(
    (data) => {
      if (forUse === "PATCH") {
        // 수정 로직 추가
        updateCity(data);
      } else {
        // 추가 로직
        addCity(data);
      }
    },
    [addCity, forUse, updateCity]
  );

  useEffect(() => {
    if (forUse === "PATCH" && data) {
      setValue("country", data.country.name);
      setValue("city", data.name);
      setValue("description", data.description);
      setValue("latitude", data.latitude);
      setValue("longitude", data.longitude);
    }
  }, [forUse, data, setValue]);

  return (
    <form className={styles.form_box} onSubmit={handleSubmit(onSubmit)}>
      <Field
        label="나라 이름"
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

      <Field
        label="도시 이름"
        helperText="ex) 서울, 오사카..."
        isRequire
        error={errors.city}
      >
        <Input
          type="text"
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="sm"
          register={register}
          name="city"
        />
      </Field>

      <Field
        label="도시 설명"
        helperText="ex) 대표 여행지입니다."
        isRequire
        error={errors.description}
      >
        <Input
          type="text"
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="sm"
          register={register}
          name="description"
        />
      </Field>

      <Field
        label="도시 사진"
        helperText="도시 사진을 넣어주세요."
        isRequire
        error={errors.file}
      >
        <Input
          type="file"
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="sm"
          register={register}
          name="file"
        />
      </Field>

      <Field label="위도" isRequire error={errors.latitude}>
        <Input
          type="text"
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="sm"
          register={register}
          name="latitude"
        />
      </Field>

      <Field label="경도" isRequire error={errors.longitude}>
        <Input
          type="text"
          style={{
            boxSizing: "border-box",
            width: "100%",
          }}
          size="sm"
          register={register}
          name="longitude"
        />
      </Field>

      <Button
        variant="ghost"
        type="submit"
        size="md"
        style={{
          marginLeft: "auto",
        }}
      >
        {forUse === "PATCH" ? "수정완료" : "추가하기"}
      </Button>
    </form>
  );
};

export default FormCity;
