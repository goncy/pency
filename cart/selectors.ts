import {CartItem} from "./types";

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
      ({category, subcategory, title, options, price, count}) =>
        `* ${[
          `[${category}]`,
          subcategory ? `[${subcategory}]` : "",
          title,
          options,
          count > 1 ? `(X${count})` : "",
          `$${price * count}`,
        ]
          .filter(Boolean)
          .join(" - ")}`,
    )
    .join("\n");
}

export function getMessage(message: string, items: CartItem[]): string {
  return message
    .replace(`{{productos}}`, getItems(items))
    .replace(`{{total}}`, `$${getTotal(items)}`);
}
