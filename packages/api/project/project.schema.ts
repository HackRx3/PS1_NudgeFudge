import * as yup from "yup";

const PLATFORMS = ["javascript"];

export const postProjectSchema = yup
  .object({
    name: yup.string().trim().required(),
    platform: yup.string().trim().oneOf(PLATFORMS).required(),
  })
  .noUnknown(true)
  .required();

export type PostCampaignType = yup.InferType<typeof postProjectSchema>;
