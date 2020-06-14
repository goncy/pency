import {Option, Variant} from "~/product/types";

export default function validator(variant: Variant) {
  return (values: Option[]) => {
    if (variant.required) {
      if (variant.count && values.length !== variant.count) {
        return `Debes seleccionar ${variant.count} opciones`;
      }

      if (!variant.count && !values.length) {
        return "Debes seleccionar al menos una opcion";
      }
    }

    return true;
  };
}
