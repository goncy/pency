import {CartItem, Field} from "./types";

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

export function getMessage(message: string, items: CartItem[], fields?: Field): string {
  let final = message
    .replace(`{{productos}}`, getItems(items))
    .replace(`{{total}}`, `$${getTotal(items)}`);

  if (fields) {
    Object.entries(fields).forEach(([title, value]) => {
      final = final.replace(`{{${title}}}`, value);
    });
  }

  return final;
}
