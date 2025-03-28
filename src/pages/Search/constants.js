import { z } from "zod";

export const searchScheme = z.object({
  keyword: z
    .string()
    .min(2, { message: "검색어는 2글자 이상이어야 합니다." })
    .nonempty({ message: "검색어를 입력하세요." }),
});
