import {AuthResponse} from "../types";

import fetch from "~/utils/fetch";
import {CartItem} from "~/cart/types";
import {ClientTenant} from "~/tenant/types";
import {getTotal} from "~/cart/selectors";

export default {
  create: async (items: CartItem[], slug: ClientTenant["slug"], orderId: string, token: string) =>
    fetch("POST", `https://api.mercadopago.com/checkout/preferences?access_token=${token}`, {
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category_id: item.category,
        quantity: item.count,
        currency_id: "ARS",
        unit_price: item.price * item.count,
      })),
      external_reference: `Orden: ${orderId}`,
      back_urls: {
        success: `${process.env.APP_URL}/${slug}`,
        failure: `${process.env.APP_URL}/${slug}`,
      },
      additional_info: `Compra en ${slug} - ${orderId}`,
      auto_return: "all",
      marketplace_fee: getTotal(items) * 0.01,
      payment_methods: {
        installments: 1,
        default_installments: 1,
        excluded_payment_types: [{id: "ticket"}, {id: "atm"}],
      },
    }).then((response) => ({
      url: response.init_point,
      orderId,
    })),
  get: async (collectionId: string, token: string) =>
    fetch("GET", `https://api.mercadopago.com/v1/payments/${collectionId}?access_token=${token}`),
  connect: async (code: string): Promise<AuthResponse> =>
    fetch("POST", `https://api.mercadopago.com/oauth/token`, {
      code,
      client_id: process.env.MERCADOPAGO_CLIENT_ID,
      client_secret: process.env.MERCADOPAGO_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: `${process.env.APP_URL}/api/payment/auth`,
    }),
  refresh: async (token: string): Promise<AuthResponse> =>
    fetch("POST", `https://api.mercadopago.com/oauth/token`, {
      client_id: process.env.MERCADOPAGO_CLIENT_ID,
      client_secret: process.env.MERCADOPAGO_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token,
    }),
  disconnect: async (id: ClientTenant["id"], slug: ClientTenant["slug"]) =>
    fetch("DELETE", `/api/payment/auth?id=${id}&slug=${slug}`),
};
