import {Field} from "../../types";

export default {
  title: (options: Field[]) => !options?.some((option) => !option.title),
  radioOptionsTitle: (options: Field[]) =>
    !options?.some(
      (option) => option.type === "radio" && option.options?.some((option) => !option.title),
    ),
};
