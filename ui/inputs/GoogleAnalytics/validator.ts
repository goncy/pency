import * as yup from "yup";

const schema = yup.lazy((value) =>
  value
    ? yup
        .string()
        .matches(
          /(UA|G)(\w|-){8,12}/g,
          "Ingresá solamente el numero de seguimiento, que se ve algo como UA-XXXXXXXXX-X.",
        )
    : yup.string().equals([""]),
);

export default function validator(id: number) {
  try {
    schema.validateSync(id);

    // Return true if no errors were found
    return true;
  } catch (error) {
    // Validate sync will throw so we return the error message
    return error.message;
  }
}
