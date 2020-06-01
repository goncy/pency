import shortid from "shortid";

import {RadioFieldOption, RadioField, TextField} from "../../types";

export const getTextField = (overrides: Partial<TextField> = {}): TextField => {
  return {
    id: shortid.generate(),
    title: "",
    type: "text",
    note: "",
    ...overrides,
  };
};

export const getRadioField = (overrides: Partial<RadioField> = {}): RadioField => {
  return {
    id: shortid.generate(),
    title: "",
    type: "radio",
    options: [getRadioOption(), getRadioOption()],
    ...overrides,
  };
};

export const getRadioOption = (overrides: Partial<RadioFieldOption> = {}): RadioFieldOption => {
  return {
    id: shortid.generate(),
    title: "",
    note: "",
    ...overrides,
  };
};
