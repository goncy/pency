import {Product} from "~/product/types";

export function getOptionsString(options: Product["options"]) {
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
