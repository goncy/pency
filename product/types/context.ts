import {Product} from "./product";

export interface State {
  products: Product[];
}

export interface Actions {
  create: (product: Product) => Promise<void>;
  update: (product: Product) => Promise<void>;
  remove: (id: Product["id"]) => Promise<void>;
}

export interface Context {
  state: State;
  actions: Actions;
}
