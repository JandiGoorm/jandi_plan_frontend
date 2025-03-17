import { Button, Field, Input } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { manageBannerScheme } from "../../constants";
import { usePlanDetail } from "../PlanDetailContext";
import styles from "./ModifyBanner.module.css";
import { useModal } from "@/components/Modal/ModalContext";
import { useCallback } from "react";

const ModifyBanner = ({ banner, id }) => {
  const { updatePlan } = usePlanDetail();
  const { closeModal } = useModal();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(manageBannerScheme)
  });

  const onSubmit = useCallback(
    (data) => {
      updatePlan(data);
      closeModal();
    },
    [closeModal, updatePlan]
  );

  if (!banner) return <p>해당 플랜 사진을 불러오기 실패했습니다.</p>;

  return (
    <div className={styles.container}>
      <p className={styles.title}>사진 수정</p>

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <img src={banner} alt="banner" className={styles.banner_img} />
        <Field
          label="플랜 사진"
          helperText="플랜 사진을 넣어주세요."
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

        <Button
          variant="ghost"
          style={{
            alignSelf: "end",
          }}
          type="submit"
        >
          수정완료
        </Button>
      </form>
    </div>
  );
};

export default ModifyBanner;
