import shortid from "shortid";

import {
  SingleOption,
  MultipleOption,
  SingleOptionItem,
  MultipleOptionItem,
} from "../../types/options";

export const DEFAULT_OPTIONS = {
  get single(): SingleOption {
    return {
      id: shortid.generate(),
      title: "",
      type: "single",
      options: [DEFAULT_OPTION.single],
    };
  },
  get multiple(): MultipleOption {
    return {
      id: shortid.generate(),
      title: "",
      type: "multiple",
      count: 0,
      options: [DEFAULT_OPTION.multiple, DEFAULT_OPTION.multiple],
    };
  },
};

export const DEFAULT_OPTION = {
  get single(): SingleOptionItem {
    return {
      id: shortid.generate(),
      title: "",
      price: 0,
    };
  },
  get multiple(): MultipleOptionItem {
    return {
      id: shortid.generate(),
      title: "",
      price: 0,
    };
  },
};
