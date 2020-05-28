import shortid from "shortid";

import {DEFAULT_PRODUCT, DEFAULT_PRODUCT_VARIANT, DEFAULT_PRODUCT_OPTION} from "./constants";
import {Product} from "./types";

import {groupBy} from "~/selectors/group";

export function getOptionsString(options: Product["options"]): string {
  if (!options?.length) return "";

  return options
    .map((option) => {
      const groups = groupBy(option.value, ({title}) => title);

      return `${option.title}: ${groups
        .map(([title, items]) => `${title}${items.length > 1 ? ` X${items.length}` : ``}`)
        .join(", ")}`;
    })
    .join(" - ");
}

export function getPrice(product: Product): number {
  const base = Number(product.price);

  return product.options?.length
    ? product.options.reduce((total, option) => {
        return total + option.value.reduce((total, option) => total + Number(option.price || 0), 0);
      }, base)
    : base;
}

export function parseProduct(product: any): Product {
  if (!product?.id) {
    throw new Error("Este producto es inválido");
  }

  return {
    id: product.id,
    title: product.title || DEFAULT_PRODUCT.title,
    description: product.description,
    category: product.category,
    image: product.image,
    price: product.price || DEFAULT_PRODUCT.price,
    available: product.available || DEFAULT_PRODUCT.available,
    options: product.options?.length
      ? product.options.map((variant) => ({
          id: variant.id || shortid.generate(),
          title: variant.title || DEFAULT_PRODUCT_VARIANT.title,
          count: variant.count === undefined ? DEFAULT_PRODUCT_VARIANT.count : variant.count,
          options: variant.options?.length
            ? variant.options.map((option) => ({
                id: option.id || shortid.generate(),
                title: option.title || DEFAULT_PRODUCT_OPTION.title,
                price: option.price || DEFAULT_PRODUCT_OPTION.price,
              }))
            : [],
        }))
      : [],
    featured: product.featured || DEFAULT_PRODUCT.featured,
  };
}

export function formatProduct(product: Partial<Product>): Partial<Product> {
  return {
    ...DEFAULT_PRODUCT,
    ...product,
    options: product.options?.length
      ? product.options.map((variant) => ({
          ...DEFAULT_PRODUCT_VARIANT,
          ...variant,
          options: variant.options?.length
            ? variant.options.map((option) => ({
                ...DEFAULT_PRODUCT_OPTION,
                ...option,
              }))
            : [],
        }))
      : [],
  };
}
