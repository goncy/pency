export interface Product {
  id: string;
  title: string;
  available?: boolean; // @TODO: Remove when visibility is widely adopted
  description?: string;
  category?: string;
  image?: string | undefined;
  price: number;
  originalPrice?: number;
  priceLabel?: string;
  visibility: "available" | "unavailable" | "custom" | "hidden" | "promotional" | "ask";
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
