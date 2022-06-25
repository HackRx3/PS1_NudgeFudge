import * as yup from "yup";

const TypesOfNudges = ["dot", "overlay"];

const NUDGE_POSITION = [
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

const TEXT_ALIGNMENT = ["left", "center", "right", "justify"];

export const dotNudgeSchema = yup
  .object({
    elementId: yup.string().trim().required(),
    backgroundColor: yup.string().trim().default("#0067b5"),
    position: yup.string().trim().oneOf(NUDGE_POSITION).default("top-right"),
    size: yup.string().trim().default("12px"),
  })
  .noUnknown(true)
  .required();

export const overlayNudgeSchema = yup
  .object({
    text: yup.string().trim().required(),
    textAlign: yup.string().trim().oneOf(TEXT_ALIGNMENT).default("left"),
    fontSize: yup.string().trim().default("10.pt"),
    color: yup.string().trim().default("#1A1A1A"),
    backdropColor: yup.string().trim().default("#23232375"),
    backgroundColor: yup.string().trim().default("##FAFAFA"),
    borderColor: yup.string().trim().default("#0067b575"),
    borderWidth: yup.string().trim().default("0.5rem"),
    borderRadius: yup.string().trim().default("4rem"),
    width: yup.string().trim().default("85%"),
    height: yup.string().trim().default("fit-content"),
  })
  .noUnknown(true)
  .required();

export const postNudgeSchema = yup
  .object({
    app_id: yup.string().trim().required(),
    event_label: yup.string().trim(),
    nudge: yup
      .object({
        label: yup.string().trim().required(),
        type: yup.string().trim().oneOf(TypesOfNudges).required(),
        config: yup
          .object()
          .when("type", {
            is: "dot",
            then: dotNudgeSchema,
          })
          .when("type", {
            is: "overlay",
            then: overlayNudgeSchema,
          })
          .required()
          .noUnknown(true),
      })
      .noUnknown(true)
      .required(),
  })
  .noUnknown(true)
  .required();

export type PostNudgeType = yup.InferType<typeof postNudgeSchema>;
