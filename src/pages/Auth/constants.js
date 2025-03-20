import { z } from "zod";

export const joinScheme = z
  .object({
    firstName: z.string().nonempty({ message: "성을 입력하세요." }),
    lastName: z.string().nonempty({ message: "이름을 입력하세요." }),
    email: z
      .string()
      .email({ message: "유효한 이메일을 입력하세요." })
      .nonempty({ message: "이메일을 입력하세요." }),
    password: z
      .string()
      .min(6, { message: "6자 이상 입력하세요." })
      .nonempty({ message: "비밀번호를 입력하세요." }),
    passwordConfirm: z
      .string()
      .min(6, { message: "6자 이상 입력하세요." })
      .nonempty({ message: "비밀번호를 입력하세요." }),
    nickname: z
      .string()
      .min(2, { message: "2자 이상 입력하세요." })
      .nonempty({ message: "닉네임을 입력하세요." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export const loginScheme = z.object({
  id: z
    .string()
    .email({ message: "유효한 이메일을 입력하세요." })
    .nonempty({ message: "ID를 입력하세요." }),
  password: z.string().nonempty({ message: "비밀번호를 입력하세요." }),
});

export const finderScheme = z.object({
  email: z
    .string()
    .email({ message: "유효한 이메일을 입력하세요." })
    .nonempty({ message: "이메일을 입력하세요." }),
});
