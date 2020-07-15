import {Product} from "~/product/types";

export default function validator(variants: Product["options"] = []) {
  return function (type: Product["type"]) {
    if (!variants.length || !variants.some((variant) => variant.required)) {
      return "Al menos una variante requerida es necesaria para este tipo de producto";
    }

    return Boolean(type);
  };
}
