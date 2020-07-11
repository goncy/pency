import * as yup from "yup";

import {Product, Variant, Option} from "~/product/types";

interface Bulk {
  options: Pick<Variant, "options">[];
  price: Product["price"];
  originalPrice: Product["originalPrice"];
  visibility: Product["visibility"];
}

const schema = yup.object<Bulk>({
  // We catch typeError as we can have an empty field ("")
  price: yup.number().typeError("El precio es requerido").required("El precio es requerido"),
  originalPrice: yup
    .number()
    .typeError("El precio original es requerido, indicá 0 en caso de no corresponder")
    .required("El precio original es requerido, indicá 0 en caso de no corresponder"),
  visibility: yup
    .string()
    .oneOf(["available", "unavailable", "ask", "hidden"])
    .required("La visibilidad es requerida"),
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
    // Check if product is valid
    schema.validateSync(product);

    // Return true if no errors were found
    return true;
  } catch (error) {
    // Validate sync will throw so we return the error message
    return error.message;
  }
}
