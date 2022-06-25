import * as yup from "yup";

const TypesOfNudges = ["dot", "overlay"];

const NudgePosition = [
  "top-left",
  "top-middle",
  "top-right",
  "middle-left",
  "middle-middle",
  "middle-right",
  "bottom-left",
  "bottom-middle",
  "bottom-right",
];

export const dotNudgeSchema = yup
  .object({
    elementId: yup.string().trim().required(),
    backgroundColor: yup.string().trim().default("#0067b5"),
    position: yup.string().trim().oneOf(NudgePosition).default("top-right"),
    size: yup.string().trim().default("12px"),
  })
  .noUnknown(true)
  .required();

export const overlayNudgeSchema = yup
  .object({
    children: yup.string().trim(),
    border_color: yup.string().trim(),
  })
  .noUnknown(true)
  .required();

export const NudgesSchemas = [dotNudgeSchema, overlayNudgeSchema];

export const postNudgeSchema = yup
  .object({
    event_label: yup.string().trim().required(),
    nudge: yup
      .object({
        label: yup.string().trim().required(),
        type: yup.string().trim().oneOf(TypesOfNudges).required(),
        config: yup.mixed().oneOf(NudgesSchemas).required(),
      })
      .noUnknown(true)
      .required(),
  })
  .noUnknown(true)
  .required();

export type PostNudgeType = yup.InferType<typeof postNudgeSchema>;
