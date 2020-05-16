import {Product} from "~/product/types";
import {groupBy} from "~/selectors/group";

export function getOptionsString(options: Product["options"]): string {
  if (!options?.length) return "";

  return options
    .map((option) => {
      switch (option.type) {
        case "single": {
          return `${option.title}: ${option.value.title}`;
        }

        case "multiple": {
          const groups = groupBy(option.value, ({title}) => title);

          return `${option.title}: ${groups
            .map(([title, items]) => `${title}${items.length > 1 ? ` X${items.length}` : ``}`)
            .join(", ")}`;
        }

        default:
          return "";
      }
    })
    .join(" - ");
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
            return total + Number(option.value.price || 0);
          }

          default:
            return total;
        }
      }, base)
    : base;
}
