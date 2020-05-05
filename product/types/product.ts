import {Option} from "./options";

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
  featured?: boolean;
}
