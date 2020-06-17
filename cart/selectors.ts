import {CartItem} from "./types";

import {Field} from "~/tenant/types";
import {getVariantsString, getVariantsPrice} from "~/product/selectors";

export function getTotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + (item.product.price + getVariantsPrice(item.variants)) * item.count,
    0,
  );
}

export function getCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.count, 0);
}

export function getSummary(items: CartItem[]): string {
  return `[${getTotal(items)}] ${items.map(({product}) => product.title).join(", ")}`;
}

export function getItems(items: CartItem[]): string {
  return items
    .map(
      ({product, count, variants}) =>
        `— ${[
          count > 1 ? `*[ ${count} ]*` : "",
          product.title,
          variants ? `_${getVariantsString(variants)}_` : "",
          `> *$${(product.price + getVariantsPrice(variants)) * count}*`,
        ]
          .filter(Boolean)
          .join(" ")}`,
    )
    .join("\n");
}

export function getFields(fields: Field[]) {
  if (!fields) return "";

  return fields
    .filter(({title, value}) => title && value)
    .map(({title, value}) => `${title}: *${value}*`)
    .join("\n");
}

export function getPreferenceFooter(preference?: string) {
  if (!preference) return "";

  return `----------

Este es tu link de pago. _Una vez realizado envianos el número de operación_.
${preference}`;
}

export function getOrderId(orderId: string) {
  return `PEDIDO: *${orderId}*`;
}

export function getMessage(
  items: CartItem[],
  orderId: string,
  fields?: Field[],
  preference?: string,
): string {
  return (
    getOrderId(orderId) +
    "\n\n" +
    getItems(items) +
    "\n\n" +
    `*Total: $${getTotal(items)}*` +
    (fields ? "\n\n" + getFields(fields) : "") +
    (preference ? `\n\n${getPreferenceFooter(preference)}` : "")
  );
}
