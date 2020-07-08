import * as yup from "yup";

import {Product, Variant, Option} from "~/product/types";

interface Bulk {
  options: Pick<Variant, "options">[];
  price: Product["price"];
}

const schema = yup.object<Bulk>({
  price: yup.number().required("El precio es requerido"),
  options: yup
    .array(
      yup.object({
        options: yup.array(
          yup.object<Option>({
            price: yup.number().required("El precio de las opciones de variantes es requerido"),
            id: yup.string().required("El id de opciones de variantes es requerido"),
            title: yup.string().required("El titulo de las opciones de variantes es requerido"),
          }),
        ),
      }),
    )
    .default([]),
});

export default function validator(product: Product) {
  try {
    schema.validateSync(product);

    return true;
  } catch (e) {
    return e.message;
  }
}
