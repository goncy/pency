import {CartItem} from "./types";

import {Field, ClientTenant} from "~/tenant/types";

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
        `* ${[`[${category}]`, title, options, count > 1 ? `(X${count})` : "", `$${price * count}`]
          .filter(Boolean)
          .join(" - ")}`,
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
Siendo que elegiste Mercado Pago como forma de pago te generamos este link:
${preference}
Una vez que hagas el pago compartinos el número de orden.`;
}

export function getMessage(items: CartItem[], fields?: Field[], preference?: string): string {
  return (
    getItems(items) +
    `\n\nTotal: $${getTotal(items)}` +
    (fields ? "\n\n" + getFields(fields) : "") +
    (preference ? getPreferenceFooter(preference) : "")
  );
}
