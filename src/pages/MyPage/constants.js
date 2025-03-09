import { z } from "zod";

export const changePasswordScheme = z
  .object({
    currentPassword: z
      .string()
      .min(6, {
        message: "6자 이상 입력하세요.",
      })
      .nonempty(),
    newPassword: z
      .string()
      .min(6, {
        message: "6자 이상 입력하세요.",
      })
      .nonempty(),
    newPasswordConfirm: z
      .string()
      .min(6, {
        message: "6자 이상 입력하세요.",
      })
      .nonempty(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "새로운 비밀번호가 일치하지 않습니다.",
    path: ["newPasswordConfirm"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "현재 비밀번호와 새 비밀번호가 같습니다.",
    path: ["newPassword"],
  });