export interface Product {
  id: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  image?: string | undefined;
  price: number;
  available: boolean;
  options?: Option[];
}

export type Option = SingleOption | MultipleOption;

interface SingleOption {
  type: "single";
  id: string;
  title: string;
  options: SingleOptionItem[];
  value?: SingleOptionItem;
}

interface MultipleOption {
  type: "multiple";
  id: string;
  title: string;
  count: number;
  options: MultipleOptionItem[];
  value?: MultipleOptionItem;
}

export interface SingleOptionItem {
  id: string;
  title: string;
}

export interface MultipleOptionItem {
  id: string;
  title: string;
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
