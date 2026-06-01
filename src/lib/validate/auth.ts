import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email không được để trống." })
    .email({ message: "Địa chỉ email không hợp lệ." }),
  password: z
    .string()
    .min(6, { message: "Mật khẩu phải chứa ít nhất 6 ký tự." }),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Họ và tên không được để trống." })
    .min(2, { message: "Họ và tên phải chứa ít nhất 2 ký tự." }),
  email: z
    .string()
    .min(1, { message: "Email không được để trống." })
    .email({ message: "Địa chỉ email không hợp lệ." }),
  password: z
    .string()
    .min(6, { message: "Mật khẩu phải chứa ít nhất 6 ký tự." }),
});
export const profileSchema = z.object({
  displayName: z
    .string()
    .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự" })
    .max(50, { message: "Họ và tên quá dài" }),
  photoURL: z
    .string()
    .url({ message: "Địa chỉ URL không hợp lệ." })
    .or(z.literal("")),

});
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;


