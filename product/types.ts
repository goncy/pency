export interface Product {
  id: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  image?: string | undefined;
  price: number;
  available: boolean;
}

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

export interface CartItem {
  id: Product["id"];
  count: number;
  product: Product;
}

export type Cart = Record<Product["id"], CartItem>;
