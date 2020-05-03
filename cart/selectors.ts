import {CartItem} from "./types";

export function getTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.count, 0);
}

export function getSummary(items: CartItem[]): string {
  return `[${getTotal(items)}] ${items.map(({title}) => title).join(", ")}`;
}
