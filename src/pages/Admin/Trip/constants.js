import { z } from "zod";

export const createCountrySchema = z.object({
  continent: z.enum(["아시아", "북미", "유럽", "남미", "아프리카", "오세아니아/대양주"]),
  country: z.string().nonempty("나라 이름을 입력해주세요"),
});

export const createCitySchema = (forUse) => z.object({
  country:  z.string().nonempty("나라 이름을 입력해주세요"),
  city: z.string().nonempty("도시 이름을 입력해주세요"),
  description: z.string().nonempty("도시 설명을 입력해주세요"),
  file: z
    .instanceof(FileList)
    .refine((files) => {
      if (forUse === "PATCH") {
        return true; // PATCH일 때는 파일을 검증하지 않음
      }
      return files.length > 0; // 파일이 있을 때만 통과
    }, {
      message: "도시 파일을 넣어주세요",
    }),
  latitude: z.coerce
  .number()
  .positive("위도를 입력해주세요")
  .refine((value) => !isNaN(value), {
    message: "숫자만 입력해주세요",
  }),

longitude: z.coerce
.number()
.positive("경도를 입력해주세요")
.refine((value) => !isNaN(value), {
  message: "숫자만 입력해주세요",
}),

});
