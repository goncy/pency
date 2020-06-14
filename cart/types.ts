import {Product, Variant} from "~/product/types";
import {Field} from "~/tenant/types";

export interface CartItem {
  id: string | Product["id"];
  product: Product;
  variants: Variant[];
  count: number;
}

export type Cart = Record<string, CartItem>;

export interface State {
  items: CartItem[];
  cart: Cart;
}

export interface Actions {
  add: (product: Product, variants: Variant[], count: number) => void;
  remove: (id: CartItem["id"]) => void;
  checkout: (fields?: Field[]) => Promise<void>;
}

export interface Context {
  state: State;
  actions: Actions;
}

export type Status = "init" | "pending";
