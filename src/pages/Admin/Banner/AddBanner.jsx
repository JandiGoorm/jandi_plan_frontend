import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bannerWriteScheme } from "./constants";
import styles from "./AddBanner.module.css";
import { Button, Field, Input } from "@/components";
import { useCallback, useState } from "react";

const AddBanner = ({ callback }) => {
  const [bannerImg, setBannerImg] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(bannerWriteScheme),
  });

  const onSubmit = useCallback(
    (data) => {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("title", data.title);
      formData.append("linkUrl", data.linkUrl);

      callback(formData);
    },
    [callback]
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>배너 추가</p>

      {bannerImg && (
        <img src={bannerImg} alt="banner" className={styles.banner_img} />
      )}

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Field label="배너 이미지" isRequire error={errors.file}>
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

        <Field label="제목" error={errors.title} isRequire>
          <Input
            register={register}
            name="title"
            placeholder={"제목을 입력하세요"}
            style={{ width: "100%" }}
          />
        </Field>

        <Field label="링크" error={errors.linkUrl} isRequire>
          <Input
            register={register}
            name="linkUrl"
            placeholder={"링크를 입력하세요"}
            style={{ width: "100%" }}
          />
        </Field>

        <Button
          variant="ghost"
          style={{
            alignSelf: "end",
          }}
          type="submit"
        >
          작성완료
        </Button>
      </form>
    </div>
  );
};

export default AddBanner;
