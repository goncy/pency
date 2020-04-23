import {Product} from "../product/types";

export interface CartItem {
  id: Product["id"];
  product: Product;
}

export type Cart = CartItem[];

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
