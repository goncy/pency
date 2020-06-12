import {Option} from "~/product/types";

export default function validator(option) {
  return (values: Option[]) => {
    if (option.count === 1 && values.length === 0) {
      return "Este campo es requerido";
    }

    return true;
  };
}
