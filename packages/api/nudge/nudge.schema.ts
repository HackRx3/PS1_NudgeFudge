import * as yup from "yup";

const NudgeConfigXPosition = ["left", "right", "middle"];

const NudgeConfigYPosition = ["top", "bottom", "center"];

export const dotNudgeSchema = yup.object({
  color: yup.string().trim().default("#0067b500"),
  x_position: yup.string().trim().oneOf(NudgeConfigXPosition),
  y_position: yup.string().trim().oneOf(NudgeConfigYPosition),
});
// .noUnknown(true);

export const overlayNudgeSchema = yup.object({
  children: yup.string().trim(),
  border_color: yup.string().trim(),
});
// .noUnknown(true);

export const alertNudgeSchema = yup.object({
  background_color: yup.string().trim(),
});
// .noUnknown(true);

export const NudgesSchemas = [
  dotNudgeSchema,
  overlayNudgeSchema,
  alertNudgeSchema,
];

export const postNudgeSchema = yup
  .object({
    event_label: yup.string().trim().required(),
    nudge_label: yup.string().trim().required(),
    // nudge: yup.mixed().oneOf(NudgesSchemas).required(),
  })
  .noUnknown(true)
  .required();

export type PostNudgeType = yup.InferType<typeof postNudgeSchema>;
