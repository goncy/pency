import * as yup from "yup";

const schema = yup
  .string()
  .matches(
    /G-[a-zA-Z0-9]{10}/g,
    "Ingresá solamente el numero de seguimiento, que se ve algo como G-XXXXXXXXXX.",
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
