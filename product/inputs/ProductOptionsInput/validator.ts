import {Option} from "../../types/options";

export default {
  title: (options: Option[]) => !options?.some((option) => !option.title),
  count: (options: Option[]) =>
    !options?.some((option) => option.type === "multiple" && !option.count),
  optionsCount: (options: Option[]) =>
    !options?.some((option) => option.type === "multiple" && option.count > option.options.length),
  optionsPrice: (options: Option[]) =>
    !options?.some((option) => option.options?.some((option) => isNaN(Number(option.price)))),
  optionsTitle: (options: Option[]) =>
    !options?.some((option) => option.options?.some((option) => !option.title)),
};
