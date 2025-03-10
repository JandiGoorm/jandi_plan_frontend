import { z } from "zod";

export const bannerModifyScheme = z.object({
  file: z.instanceof(File).nullable().optional(),
  title: z.string().nonempty({ message: "제목을 입력하세요." }),
  linkUrl: z.string().nonempty({ message: "링크 URL을 입력하세요." }),
});

export const bannerWriteScheme = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "이미지 파일을 첨부하세요." }),
  title: z.string().nonempty({ message: "제목을 입력하세요." }),
  linkUrl: z.string().nonempty({ message: "링크 URL을 입력하세요." }),
});
