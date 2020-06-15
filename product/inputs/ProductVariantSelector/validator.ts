import {Variant} from "~/product/types";

export default function validator(variant: Variant) {
  if (variant.required) {
    if (variant.count && variant.value.length !== variant.count) {
      return `Debes seleccionar ${variant.count} opciones`;
    }

    if (!variant.count && !variant.value.length) {
      return "Debes seleccionar al menos una opcion";
    }
  }

  return true;
}
