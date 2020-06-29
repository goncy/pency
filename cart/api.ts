import {getMessage} from "./selectors";

import fetch from "~/utils/fetch";

export default {
  checkout: ({phone, items, orderId, fields, preference = null}) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(
      getMessage(items, orderId, fields, preference),
    )}`,
  hook: (hook, params) =>
    fetch("POST", hook, params)
      .then(() => console.info("Hook sent correctly"))
      .catch(() => console.warn("Hook failed")),
};
