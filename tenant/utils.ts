import shortId from "shortid";

import {ClientTenant} from "./types";
import {SHORTID_DICTIONARY} from "./constants";

export const generateOrderId = (slug: ClientTenant["slug"]) => {
  shortId.characters(SHORTID_DICTIONARY);

  return `${slug.slice(0, 3).toUpperCase()}-${shortId.generate().slice(0, 5).toUpperCase()}`;
};
