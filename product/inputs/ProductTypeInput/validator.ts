import {Product} from "~/product/types";

export default function validator(variants: Product["options"] = []) {
  return function (type: Product["type"]) {
    if (type === "variant" && (!variants.length || !variants.some((variant) => variant.required))) {
      return "Es necesario crear al menos una variante obligatoria para este tipo de producto";
    }

    return Boolean(type);
  };
}
