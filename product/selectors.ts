import {Product, Variant} from "./types";

import {groupBy} from "~/selectors/group";

export function getVariantsString(variants: Variant[]): string {
  if (!variants?.length) return "";

  return variants
    .map((option) => {
      const groups = groupBy(option.value, ({title}) => title);

      if (!groups?.length) return "";

      return `${option.title}: ${groups
        .map(([title, items]) => `${title}${items.length > 1 ? ` X${items.length}` : ``}`)
        .join(", ")}`;
    })
    .filter(Boolean)
    .join(" - ");
}

export function getVariantsPrice(variants: Variant[]): number {
  if (!variants?.length) return 0;

  return variants?.reduce((total, option) => {
    if (!option.value?.length) return total;

    return total + option.value.reduce((total, option) => total + Number(option.price || 0), 0);
  }, 0);
}

export function getPrice(product: Product): number {
  const base = Number(product.price);

  return product.options?.length
    ? product.options.reduce((total, option) => {
        return total + option.value.reduce((total, option) => total + Number(option.price || 0), 0);
      }, base)
    : base;
}

export function hasPriceChanged(changed: Product, base: Product) {
  // And its price has changed return true
  if (base.price !== changed.price) return true;

  // If base product has variants
  if (base.options?.length) {
    // Iterate over its variants
    for (let variantIndex = 0; variantIndex < base.options?.length; variantIndex++) {
      // And its variant options
      for (
        let optionIndex = 0;
        optionIndex < base.options[variantIndex]?.options.length;
        optionIndex++
      ) {
        // And if the variant price has changed
        if (
          base.options[variantIndex].options[optionIndex].price !==
          changed.options[variantIndex].options[optionIndex].price
        ) {
          // Return true
          return true;
        }
      }
    }
  }
}
