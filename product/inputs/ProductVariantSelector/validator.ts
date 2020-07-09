import i18n from "~/i18n/instance";
import {Variant} from "~/product/types";

export default function validator(variant: Variant) {
  // If variant is required
  if (variant.required) {
    // And we have count and it's different to the value count
    if (variant.count && variant.value?.length !== variant.count) {
      // Return a countError
      return i18n.t("products.variants.countError", {count: variant.count});
    }

    // If we have unlimited as count but non selected
    if (!variant.count && !variant.value?.length) {
      // Return an empty error
      return i18n.t("products.variants.emptyError");
    }
  }

  return true;
}
