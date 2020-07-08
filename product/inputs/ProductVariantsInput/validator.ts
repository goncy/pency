import {Variant} from "../../types";

export default function validator(variants: Variant[] = []) {
  for (let index = 0; index < variants.length; index++) {
    if (!variants[index]?.title) return `${index}|title|Requerido`;

    for (let subindex = 0; subindex < variants[index]?.options?.length; subindex++) {
      if (
        variants[index]?.options?.[subindex]?.price === ("" as any) ||
        isNaN(Number(variants[index]?.options?.[subindex]?.price))
      ) {
        return `${index}|optionsPrice|${subindex}|Requerido`;
      }

      if (!variants[index]?.options?.[subindex]?.title) {
        return `${index}|optionsTitle|${subindex}|Requerido`;
      }
    }
  }
}
