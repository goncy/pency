import {Field, RadioField} from "../../types";

export default function validator(options: Field[]) {
  for (let index = 0; index < options.length; index++) {
    if (!options[index]?.title) return `${index}|title|Requerido`;

    if (options[index]?.type === "radio") {
      const field = options[index] as RadioField;

      for (let subindex = 0; subindex < field?.options?.length; subindex++) {
        if (!field?.options?.[subindex]?.title) {
          return `${index}|radioOptionsTitle|${subindex}|Requerido`;
        }
      }
    }
  }
}
