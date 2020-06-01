import {CartItem, CheckoutFields} from "./types";

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

export function getFields(fields: CheckoutFields) {
  if (!fields) return "";

  return Object.entries(fields)
    .map(([title, value]) => `${title}: *${value}*`)
    .join("\n");
}

export function getMessage(items: CartItem[], fields?: CheckoutFields): string {
  return (
    getItems(items) + `\n\nTotal: $${getTotal(items)}` + (fields ? "\n\n" + getFields(fields) : "")
  );
}
