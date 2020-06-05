import {CartItem} from "./types";

import {Field} from "~/tenant/types";

export function getTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.count, 0);
}

export function getCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.count, 0);
}

export function getSummary(items: CartItem[]): string {
  return `[${getTotal(items)}] ${items.map(({title}) => title).join(", ")}`;
}

export function getItems(items: CartItem[]): string {
  return items
    .map(
      ({category, title, options, price, count}) =>
        `— ${[
          count > 1 ? `*[ ${count} ]*` : "",
          `[${category}]`,
          title,
          `_${options}_`,
          `> *$${price * count}*`,
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

  return `
----------

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
    getItems(items) +
    `\n\nTotal: $${getTotal(items)}` +
    (fields ? "\n\n" + getFields(fields) : "") +
    (preference ? getPreferenceFooter(preference) : "")
  );
}
