import { z } from "zod";

export const createPlanScheme = z
  .object({
    cityId: z
      .number()
      .nonnegative("도시를 선택해주세요")
      .nullable()
      .refine((value) => value !== null, {
        message: "도시를 선택해주세요",
      }),
    title: z.string().nonempty("플랜 제목을 입력해주세요"),
    startDate: z.string().nonempty("시작일을 선택해주세요"),
    endDate: z.string().nonempty("종료일을 선택해주세요"),
    privatePlan: z.string().nonempty("공개 여부를 선택해주세요"),
    budget: z.coerce
      .number()
      .positive("예산을 입력해주세요")
      .refine((value) => !isNaN(value), {
        message: "숫자만 입력해주세요",
      }),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (new Date(startDate) > new Date(endDate)) {
      ctx.addIssue({
        path: ["endDate"],
        code: "custom",
        message: "종료일은 시작일보다 빠를 수 없습니다.",
      });
    }
  });

export const createReservationScheme = z.object({
  category: z.enum(["교통편", "숙박", "기타"]),
  title: z.string().nonempty("제목을 입력해주세요"),
  cost: z.coerce
    .number()
    .positive("비용을 입력해주세요")
    .refine((value) => !isNaN(value), {
      message: "숫자만 입력해주세요",
    }),
});

export const createScheduleScheme = z.object({
  date: z.string().nonempty({ message: "날짜를 입력하세요." }),
  startTime: z.string().nonempty({ message: "시간을 입력하세요." }),
  title: z.string().nonempty({ message: "제목을 입력하세요." }),
  placeId: z.number().positive({ message: "장소를 선택하세요." }),
  cost: z.coerce
    .number()
    .positive("비용을 입력해주세요")
    .refine((value) => !isNaN(value), {
      message: "숫자만 입력해주세요",
    }),
});

export const modifyPlanScheme = z.object({
  title: z.string().nonempty("플랜 제목을 입력해주세요"),
  privatePlan: z.string().nonempty("공개 여부를 선택해주세요"),
});

export const manageBannerScheme = z.object({
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
})

export const manageFriendsScheme = z.object({
  participantUserName: z.string().nonempty("친구 닉네임을 입력해주세요"),
})

export const searchPlansScheme = z.object({
  keyword: z
    .string()
    .min(2, { message: "검색어는 2글자 이상이어야 합니다." })
    .nonempty({ message: "검색어를 입력하세요." }),
});