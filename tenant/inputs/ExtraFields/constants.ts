import shortid from "shortid";

import {RadioFieldOption, RadioField, TextField} from "../../types";

export const getTextField = (): TextField => {
  return {
    id: shortid.generate(),
    title: "",
    type: "text",
    note: "",
  };
};

export const getRadioField = (): RadioField => {
  return {
    id: shortid.generate(),
    title: "",
    type: "radio",
    options: [getRadioOption(), getRadioOption()],
  };
};

export const getRadioOption = (): RadioFieldOption => {
  return {
    id: shortid.generate(),
    title: "",
    note: "",
  };
};
