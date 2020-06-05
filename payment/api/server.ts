import shortid from "shortid";

import {AuthResponse} from "../types";

import fetch from "~/utils/fetch";
import {CartItem} from "~/cart/types";
import {ClientTenant} from "~/tenant/types";

export default {
  create: async (
    items: CartItem[],
    slug: ClientTenant["slug"],
    token: string = "APP_USR-5868376219552098-060320-3d631d2ca54665e10e17ba2c6f140c9b-474601836",
  ) => {
    return fetch("POST", `https://api.mercadopago.com/checkout/preferences?access_token=${token}`, {
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category_id: item.category,
        quantity: item.count,
        currency_id: "ARS",
        unit_price: item.price * item.count,
      })),
      external_reference: {
        slug,
        orderId: shortid.generate(),
      },
      additional_info: `Compra en ${slug}`,
      marketplace_fee: 1,
      payment_methods: {
        installments: 1,
        default_installments: 1,
        excluded_payment_types: [{id: "ticket"}, {id: "atm"}],
      },
    }).then((response) => response.sandbox_init_point);
  },
  get: async (collectionId: string, token: string) =>
    fetch("GET", `https://api.mercadopago.com/v1/payments/${collectionId}?access_token=${token}`),
  connect: async (code: string): Promise<AuthResponse> =>
    await fetch("POST", `https://api.mercadopago.com/oauth/token`, {
      code,
      client_id: process.env.MERCADOPAGO_CLIENT_ID,
      client_secret: process.env.MERCADOPAGO_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: `${process.env.APP_URL}/api/payment/auth`,
    }),
  disconnect: async (id: ClientTenant["id"], slug: ClientTenant["slug"]) =>
    fetch("DELETE", `/api/payment/auth?id=${id}&slug=${slug}`),
};
