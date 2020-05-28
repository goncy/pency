import shortid from "shortid";

import {Option, Variant} from "../../types/options";

export const getVariant = (): Variant => {
  return {
    id: shortid.generate(),
    title: "",
    count: 0,
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
