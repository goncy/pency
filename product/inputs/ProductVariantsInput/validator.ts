import {Variant} from "../../types";

export default {
  title: (options: Variant[]) => !options?.some((option) => !option.title),
  optionsCount: (options: Variant[]) =>
    !options?.some((option) => option.count > option.options.length),
  optionsPrice: (options: Variant[]) =>
    !options?.some((option) => option.options?.some((option) => isNaN(Number(option.price)))),
  optionsTitle: (options: Variant[]) =>
    !options?.some((option) => option.options?.some((option) => !option.title)),
};
