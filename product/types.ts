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
  required: boolean;
  options: Option[];
  value?: Option[];
}

export interface Option {
  id: string;
  title: string;
  price: number;
}
