import shortid from "shortid";

import {SingleOption, MultipleOption} from "~/product/types";

export const DEFAULT_OPTIONS = {
  get single(): SingleOption {
    return {
      id: shortid.generate(),
      title: "",
      type: "single",
      options: [
        {
          id: shortid.generate(),
          title: "",
        },
      ],
    };
  },
  get multiple(): MultipleOption {
    return {
      id: shortid.generate(),
      title: "",
      type: "multiple",
      count: 2,
      options: [
        {
          id: shortid.generate(),
          title: "",
        },
      ],
    };
  },
};
