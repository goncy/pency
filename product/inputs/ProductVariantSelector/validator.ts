import i18n from "~/i18n/instance";
import {Variant} from "~/product/types";

export default function validator(variant: Variant) {
  if (variant.required) {
    if (variant.count && variant.value.length !== variant.count) {
      return i18n.t("products.variants.countError", {count: variant.count});
    }

    if (!variant.count && !variant.value.length) {
      return i18n.t("products.variants.emptyError");
    }
  }

  return true;
}
