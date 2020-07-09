import {Variant, Product, Option} from "./types";

export const CSV_TEMPLATE =
  "title;description;price;category;available;featured\n;-;-;-;TRUE;FALSE";

export const DEFAULT_PRODUCT: Omit<Product, "id"> = {
  title: "",
  description: "",
  category: null,
  image: "",
  price: 0,
  available: false,
  featured: false,
  options: [],
};

export const DEFAULT_PRODUCT_VARIANT: Omit<Variant, "id"> = {
  title: "",
  count: 1,
  options: [],
  value: [],
  required: false,
};

export const DEFAULT_PRODUCT_OPTION: Omit<Option, "id"> = {
  title: "",
  price: 0,
};
