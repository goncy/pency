import i18n from "~/i18n/instance";
import {Field} from "~/tenant/types";

export default function validator(field: Field) {
  return (value) => {
    if (field.required && !value) {
      return i18n.t("form.required");
    }

    return true;
  };
}
