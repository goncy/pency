import {Option, Variant} from "~/product/types";
import {Field} from "~/tenant/types";

export default function validator(field: Field) {
  return (value) => {
    if (field.required && !value) {
      return "Este campo es requerido";
    }

    return true;
  };
}
