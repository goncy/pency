import schemas from "../../schemas";

import {Product} from "~/product/types";

export default function validator(product: Product) {
  try {
    schemas.bulk.validateSync(product);

    return true;
  } catch (e) {
    return e.message;
  }
}
