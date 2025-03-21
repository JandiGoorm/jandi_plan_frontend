import { Button, Field, Input } from "@/components";
import styles from "./ModifyBanner.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bannerModifyScheme } from "./constants";
import { useCallback, useState } from "react";
import { useModal } from "@/components/Modal/ModalContext";

const ModifyBanner = ({ item, callback }) => {
  const [bannerImg, setBannerImg] = useState(item.imageUrl);
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bannerModifyScheme),
    defaultValues: item,
  });

  const onSubmit = useCallback(
    async (data) => {
      const formData = new FormData();
      formData.append(
        "file",
        data.file ?? new File([""], "empty.txt", { type: "text/plain" })
      );
      formData.append("title", data.title);
      formData.append("linkUrl", data.linkUrl);
      formData.append("subtitle", data.subtitle);

      await callback(item.bannerId, formData).then(() => closeModal());
    },
    [callback, closeModal, item.bannerId]
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>배너 수정</p>

      <img src={bannerImg} alt="banner" className={styles.banner_img} />

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Field label="배너 이미지">
          <Input
            type="file"
            style={{ width: "100%" }}
            onChange={(e) => {
              const file = e.target.files[0];
              setValue("file", file);
              setBannerImg(URL.createObjectURL(file));
            }}
          />
        </Field>

        <Field label="제목" isRequire error={errors.title}>
          <Input
            placeholder="제목을 입력해주세요"
            register={register}
            name="title"
            style={{ width: "100%" }}
          />
        </Field>

        <Field label="부제목" isRequire error={errors.title}>
          <Input
            placeholder="부제목을 입력해주세요"
            register={register}
            name="subtitle"
            style={{ width: "100%" }}
          />
        </Field>

        <Field label="링크" isRequire error={errors.linkUrl}>
          <Input
            placeholder="링크를 입력해주세요"
            register={register}
            name="linkUrl"
            style={{ width: "100%" }}
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
          수정완료
        </Button>
      </form>
    </div>
  );
};

export default ModifyBanner;
