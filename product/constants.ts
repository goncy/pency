import {Variant, Product, Option} from "./types";

export const CSV_TEMPLATE = "title;description;price;category\n;;0;;";

export const DEFAULT_PRODUCT: Omit<Product, "id"> = {
  title: "",
  description: "",
  category: null,
  image: "",
  originalPrice: 0,
  price: 0,
  type: "available",
  featured: false,
  options: [],
  createdAt: 1594090800000,
  updatedAt: 1594090800000,
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
