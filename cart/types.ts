import {Product, SingleOptionItem, MultipleOptionItem} from "../product/types";

export interface CartItem {
  id: Product["id"];
  count: number;
  product: Product;
  options?: (SingleOptionItem | MultipleOptionItem)[];
}

export type Cart = Record<Product["id"], CartItem>;
export interface State {
  cart: Cart;
}

export interface Actions {
  add: (product: Product) => void;
  remove: (id: CartItem["id"]) => void;
}

export interface Context {
  state: State;
  actions: Actions;
}

export type Status = "init" | "pending";
