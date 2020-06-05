import fetch from "~/utils/fetch";
import {CartItem} from "~/cart/types";
import {ClientTenant} from "~/tenant/types";

export default {
  create: (slug: ClientTenant["slug"], items: CartItem[], orderId: string) =>
    fetch("POST", `/api/payment`, {slug, items, orderId}).then(({url}) => url),
};
