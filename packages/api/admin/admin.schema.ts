import * as yup from "yup";

export const adminRegisterSchema = yup
  .object({
    username: yup.string().trim().required(),
    password: yup.string().trim().required(),
  })
  .noUnknown(true)
  .required();

export type AdminRegisterType = yup.InferType<typeof adminRegisterSchema>;

export const adminLoginSchema = yup
  .object({
    username: yup.string().trim().required(),
    password: yup.string().trim().required(),
  })
  .noUnknown(true)
  .required();

export type AdminLoginType = yup.InferType<typeof adminLoginSchema>;

export interface userInfo {
  user: string;
}
