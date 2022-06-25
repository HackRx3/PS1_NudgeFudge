export interface Validation {
  isError?: boolean;
  validationType?: string;
  validations?: {
    type: string;
    params?: (string | number | RegExp | any)[];
  }[];
}

interface CustomFieldProps extends Validation {
  name: string;
  id: string;
  placeholder?: string;
  type:
    | "text"
    | "textarea"
    | "date"
    | "select"
    | "email"
    | "number"
    | "password"
    | "checkbox"
    | "radio";
  description?: string;
  label?: string;
  classNames?: Partial<{
    wrapper: string;
    input: string;
    description: string;
    label: string;
    option: string;
  }>;
}

export interface CustomInputProps extends CustomFieldProps {
  type: "text" | "date" | "email" | "password" | "number";
}

export interface CustomTextareaProps extends CustomFieldProps {
  type: "textarea";
}

export interface CustomSelectProps extends CustomFieldProps {
  type: "select";
  choices: { value: string; text: string }[];
  placeholder?: string;
}

export interface CustomRadioBoxProps extends CustomFieldProps {
  type: "radio" | "checkbox";
  choices: { value: string; text: string }[];
}

export type CustomFieldTypes =
  | CustomInputProps
  | CustomTextareaProps
  | CustomSelectProps
  | CustomRadioBoxProps;

export const NUDGE_TYPES = ["dot", "overlay"] as const;

export const COMMON_NUDGE_INPUTS: CustomFieldTypes[] = [
  {
    name: "nudge_label",
    id: "nudge_label",
    label: "Event Label",
    type: "text",
    placeholder: "Enter nudge name",
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["This field is required"],
      },
    ],
  },
  {
    name: "type",
    id: "type",
    label: "Event Label",
    type: "select",
    placeholder: "Enter nudge name",
    choices: [
      {
        text: "dot",
        value: "dot",
      },
      {
        text: "overlay",
        value: "overlay",
      },
    ],
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["This field is required"],
      },
    ],
  },
];

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

export const DOT_NUDGE_INPUTS: CustomFieldTypes[] = [
  {
    name: "elementId",
    id: "elementId",
    label: "Element Id",
    type: "text",
    placeholder: "Enter target element id",
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["Required"],
      },
    ],
  },
  {
    name: "backgroundColor",
    id: "backgroundColor",
    label: "Dot Color",
    type: "text",
    placeholder: "#ffab00 / blue / rgba(20, 100, 20, 0.6)",
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["Required"],
      },
    ],
  },
  {
    name: "position",
    id: "position",
    label: "Alignment",
    type: "select",
    placeholder: "Choose alignment",
    choices: NUDGE_POSITION.map((pos) => ({ value: pos, text: pos })),
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["Required"],
      },
    ],
  },
  {
    name: "size",
    id: "size",
    label: "Dot Size",
    type: "text",
    placeholder: "20px / 1.5rem / 10pt",
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["Required"],
      },
    ],
  },
];

export const OVERLAY_NUDGE_INPUTS: CustomFieldTypes[] = [
  {
    name: "text",
    id: "text",
    label: "Text Content",
    type: "text",
    placeholder: "Enter overlay content",
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["This field is required"],
      },
    ],
  },
  {
    name: "textAlign",
    id: "textAlign",
    label: "Text Alignment",
    type: "select",
    placeholder: "Select alignment",
    validationType: "string",
    choices: TEXT_ALIGNMENT.map((pos) => ({ value: pos, text: pos })),
    validations: [
      {
        type: "required",
        params: ["This field is required"],
      },
    ],
  },
  {
    name: "fontSize",
    id: "fontSize",
    label: "Font Size",
    type: "text",
    placeholder: "10.5pt / 16px / 1.25rem",
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["This field is required"],
      },
    ],
  },
  // {
  //   name: "backgroundColor",
  //   id: "backgroundColor",
  //   label: "Dot Color",
  //   type: "text",
  //   placeholder: "#ffab00 / blue / rgba(20, 100, 20, 0.6)",
  //   validationType: "string",
  //   validations: [
  //     {
  //       type: "required",
  //       params: ["Required"],
  //     },
  //   ],
  // },
];

// color: yup.string().trim().default("#1A1A1A"),
// backdropColor: yup.string().trim().default("#23232375"),
// backgroundColor: yup.string().trim().default("##FAFAFA"),
// borderColor: yup.string().trim().default("#0067b575"),
// borderWidth: yup.string().trim().default("0.5rem"),
// borderRadius: yup.string().trim().default("4rem"),
// width: yup.string().trim().default("85%"),
// height: yup.string().trim().default("fit-content"),
