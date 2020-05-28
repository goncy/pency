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
