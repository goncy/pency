import {Order} from "./types";

export function appendOrderId(url: string, orderId: Order["id"]) {
  return `${url}%0A${encodeURIComponent(`Referencia MercadoPago: *${orderId}*`)}`;
}
