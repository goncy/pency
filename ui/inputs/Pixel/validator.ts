import * as yup from "yup";

const schema = yup.lazy((value) =>
  value
    ? yup.number().typeError("Ingresá solamente el id del pixel, el cual consta solo de números.")
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
