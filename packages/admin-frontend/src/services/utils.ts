import * as Yup from "yup";
import {
  CustomFieldTypes,
  DOT_NUDGE_INPUTS,
  NUDGE_TYPES,
  OVERLAY_NUDGE_INPUTS,
} from "./constants";

export function createYupSchema(schema: any, config: CustomFieldTypes) {
  if (config) {
    const { name, validationType, validations = [] } = config;
    // @ts-ignore
    if (!Yup[validationType as string]) return schema;
    // @ts-ignore
    let validator = Yup[validationType as string]();
    validations.forEach((validation) => {
      const { params, type } = validation;
      if (!validator[type]) return;
      validator = validator[type](...(params as Array<any>));
    });
    schema[name] = validator;
    return schema;
  }
}

export const getInputsFromNudgeType = (
  type: typeof NUDGE_TYPES[number] | ""
) => {
  switch (type) {
    case "dot":
      return DOT_NUDGE_INPUTS;
    case "overlay":
      return OVERLAY_NUDGE_INPUTS;
    default:
      return [];
  }
};
