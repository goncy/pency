import {CartItem} from "./types";

export function getTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.count, 0);
}

export function getSummary(items: CartItem[]): string {
  return `[${getTotal(items)}] ${items.map(({title}) => title).join(", ")}`;
}

export function getMessage(items: CartItem[]): string {
  return `Hola, quería pedir:

${items
  .map(
    ({category, title, options, price, count}) =>
      `* ${[
        `[${category}]`,
        title,
        options,
        `${count > 1 ? `(X${count})` : ""}`,
        `$${price * count}`,
      ]
        .filter(Boolean)
        .join(" - ")}`,
  )
  .join("\n")}

Total: $${getTotal(items)}

Gracias.`;
}
