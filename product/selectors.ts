import {Product} from "~/product/types";

export function getOptionsString(options: Product["options"]): string {
  if (!options?.length) return "";

  return options
    .map((option) => {
      switch (option.type) {
        case "single": {
          return `${option.title}: ${option.value.title}`;
        }

        case "multiple": {
          return `${option.title}: ${option.value.map((value) => value.title).join(", ")}`;
        }

        default:
          return "";
      }
    })
    .join(" - ");
}

export function sortByFeatured(products: Product[]) {
  return [...products].sort((a, b) => (a.featured ? (b.featured ? 0 : 1) : b.featured ? -1 : 0));
}

export function getPrice(product: Product): number {
  const base = Number(product.price);

  return product.options?.length
    ? product.options.reduce((total, option) => {
        switch (option.type) {
          case "multiple": {
            return (
              total + option.value.reduce((total, option) => total + Number(option.price || 0), 0)
            );
          }

          case "single": {
            return total + Number(option.value.price);
          }

          default:
            return total;
        }
      }, base)
    : base;
}
