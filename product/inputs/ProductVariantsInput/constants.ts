import shortid from "shortid";

import {Option, Variant} from "../../types";

export const getVariant = (): Variant => {
  return {
    id: shortid.generate(),
    title: "",
    required: false,
    count: 1,
    options: [getOption(), getOption()],
  };
};

export const getOption = (): Option => {
  return {
    id: shortid.generate(),
    title: "",
    price: 0,
  };
};
