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
