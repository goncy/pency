export interface Product {
  id: string;
  title: string;
  description?: string;
  category?: string;
  image?: string | undefined;
  price: number;
  available: boolean;
  options?: Variant[];
  featured?: boolean;
}

export interface Variant {
  id: string;
  title: string;
  count: number;
  options: Option[];
  value?: Option[];
}

export interface Option {
  id: string;
  title: string;
  price: number;
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
