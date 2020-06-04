import {Order} from "./types";

import fetch from "~/utils/fetch";
import {CartItem} from "~/cart/types";
import {ClientTenant} from "~/tenant/types";

export default {
  create: async (
    items: CartItem[],
    order: Order,
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
      additional_info: `Compra para ${order.slug}`,
      external_reference: {
        orderId: order.id,
      },
      back_urls: {
        success: `${process.env.APP_URL}/api/payment/complete`,
      },
      marketplace_fee: 10,
      auto_return: "approved",
      payment_methods: {
        installments: 1,
        default_installments: 1,
        excluded_payment_types: [{id: "ticket"}, {id: "atm"}],
      },
    }).then((response) => response.sandbox_init_point);
  },
  get: async (collectionId: string, token: string) =>
    fetch("GET", `https://api.mercadopago.com/v1/payments/${collectionId}?access_token=${token}`),
  disconnect: async (id: ClientTenant["id"]) => fetch("DELETE", `/api/payment/auth?id=${id}`),
};

// https://donar.me/vamos?collection_id=26364187&collection_status=approved&external_reference={%22slug%22:%22goncy%22}&payment_type=credit_card&merchant_order_id=1511375655&preference_id=474601836-fb378478-c0e9-43bc-a477-1ae63de8d8cd&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
