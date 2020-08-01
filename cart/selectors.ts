import shortId from "shortid";

import {CartItem} from "./types";

import {Field, ClientTenant} from "~/tenant/types";
import {getVariantsString, getVariantsPrice} from "~/product/selectors";
import {formatPrice} from "~/i18n/selectors";

export function getTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + getPrice(item), 0);
}

export function getPrice(item: CartItem): number {
  switch (item.product.type) {
    // Price should not be modified
    case "hidden":
    case "unavailable":
    case "ask": {
      return 0;
    }

    // Price depends only on the variants
    case "variant": {
      return getVariantsPrice(item.variants) * item.count;
    }

    // Sum total and variants
    default: {
      return (item.product.price + getVariantsPrice(item.variants)) * item.count;
    }
  }
}

export function getFormattedPrice(item: CartItem): string {
  switch (item.product.type) {
    // This should never be shown
    case "hidden": {
      return "No disponible";
    }

    // No stock
    case "unavailable": {
      return "Sin stock";
    }

    // Ask price
    case "ask": {
      return "A consultar";
    }

    // Get price
    default: {
      return formatPrice(getPrice(item));
    }
  }
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
      (item) =>
        `— ${[
          item.count > 1 ? `*[ ${item.count} ]*` : "",
          item.product.title,
          item.variants ? `_${getVariantsString(item.variants)}_` : "",
          item.note ? `(${item.note})` : "",
          `> *${getFormattedPrice(item)}*`,
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

export const getOrderId = (slug: ClientTenant["slug"]) => {
  // Set characters
  shortId.characters("0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÑ");

  // Generate order id
  return `${slug.slice(0, 3).toUpperCase()}-${shortId.generate().slice(0, 5).toUpperCase()}`;
};
