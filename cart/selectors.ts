import {CartItem} from "./types";

import {Field} from "~/tenant/types";
import {getVariantsString, getVariantsPrice} from "~/product/selectors";
import {formatPrice} from "~/i18n/selectors";

export function getTotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + (item.product.price + getVariantsPrice(item.variants)) * item.count,
    0,
  );
}

export function getCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.count, 0);
}

function _getFields(fields: Field[]) {
  if (!fields) return "";

  return fields
    .filter(({title, value}) => title && value)
    .map(({title, value}) => `${title}: *${value}*`)
    .join("\n");
}

function _getPreferenceFooter(preference?: string) {
  if (!preference) return "";

  return `----------

Este es tu link de pago. _Una vez realizado envianos el número de operación_.
${preference}`;
}

function _getItems(items: CartItem[]): string {
  return items
    .map(
      ({product, count, variants}) =>
        `— ${[
          count > 1 ? `*[ ${count} ]*` : "",
          product.title,
          variants ? `_${getVariantsString(variants)}_` : "",
          `> *${formatPrice((product.price + getVariantsPrice(variants)) * count)}*`,
        ]
          .filter(Boolean)
          .join(" ")}`,
    )
    .join("\n");
}

export function getMessage(
  items: CartItem[],
  orderId: string,
  fields?: Field[],
  preference?: string,
): string {
  return (
    `PEDIDO: *${orderId}*` +
    "\n\n" +
    _getItems(items) +
    "\n\n" +
    `*Total: ${formatPrice(getTotal(items))}*` +
    (fields ? "\n\n" + _getFields(fields) : "") +
    (preference ? `\n\n${_getPreferenceFooter(preference)}` : "")
  );
}
