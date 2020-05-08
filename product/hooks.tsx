import React from "react";
import {useDisclosure} from "@chakra-ui/core";

import ProductContext from "./context";
import {Product} from "./types";
import ProductFiltersDrawer from "./components/ProductFiltersDrawer";

import {extractUniqueBy, filterBy} from "~/selectors/filter";

export function useProducts() {
  const {
    state: {products},
  } = React.useContext(ProductContext);

  return products;
}

export function useProductActions() {
  const {
    actions: {create, update, remove},
  } = React.useContext(ProductContext);

  return {create, update, remove};
}

export function useProductCategories() {
  const products = useProducts();

  return {
    categories: extractUniqueBy(products, (product) => product.category),
    subcategories: extractUniqueBy(products, (product) => product.subcategory),
  };
}

export function useFilteredProducts(filters: Partial<Product> = {}) {
  const products = useProducts();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("");
  const {isOpen, onOpen, onClose} = useDisclosure();
  const categories = extractUniqueBy(products, (product) => product.category);
  const productsBySearch = filterBy(products, {category, title: query, ...filters});

  function handleCategoryChange(selected) {
    setCategory(selected);

    onClose();
  }

  return {
    products: productsBySearch,
    hasFilters: Boolean(query || category),
    open: onOpen,
    filters: (
      <ProductFiltersDrawer
        categories={categories}
        category={category}
        isOpen={isOpen}
        query={query}
        onCategoryChange={handleCategoryChange}
        onClose={onClose}
        onQueryChange={setQuery}
      />
    ),
  };
}
