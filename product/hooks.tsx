import React from "react";
import {Icon, Input, Flex, Select, InputGroup, InputLeftElement} from "@chakra-ui/core";

import ProductContext from "./context";
import {Product} from "./types";

import {extractUniqueBy, filterBy} from "~/selectors/filter";
import {sort} from "~/selectors/sort";

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
    categories: sort(extractUniqueBy(products, (product) => product.category)),
    subcategories: sort(extractUniqueBy(products, (product) => product.subcategory)),
  };
}

export function useFilteredProducts(filters: Partial<Product> = {}) {
  const products = useProducts();
  const {categories} = useProductCategories();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("");
  const productsBySearch = filterBy(products, {category, title: query, ...filters});

  return {
    products: productsBySearch,
    filters: (
      <Flex data-test-id="filters">
        <InputGroup flex={{base: 1, sm: "inherit"}} mr={4}>
          <InputLeftElement
            children={<Icon color="gray.300" name="search" />}
            color="gray.300"
            fontSize="1.2em"
          />
          <Input
            placeholder="Buscar..."
            value={query}
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </InputGroup>
        <Select
          flex={{base: 1, sm: "inherit"}}
          maxW={{base: "100%", sm: "220px"}}
          minWidth="128px"
          width="auto"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
        >
          <option value="">Todo</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Flex>
    ),
  };
}
