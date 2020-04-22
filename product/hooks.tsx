import React from "react";
import {Icon, Input, Flex, Select, InputGroup, InputLeftElement} from "@chakra-ui/core";

import ProductContext from "./context";
import {Product} from "./types";

import {extractUniqueBy, filterBy} from "~/selectors/filter";

export function useProducts() {
  const {
    state: {products},
  } = React.useContext(ProductContext);

  return products.map(
    (product, index): Product => ({
      ...product,
      options:
        index % 2 === 0
          ? null
          : [
              {
                id: "01",
                title: "Acompañamiento",
                type: "single",
                options: [
                  {
                    id: "01",
                    title: "Papas fritas",
                  },
                  {
                    id: "02",
                    title: "Batas fritas",
                  },
                ],
              },
              {
                id: "02",
                title: "Aderezos",
                type: "multiple",
                count: 2,
                options: [
                  {
                    id: "01",
                    title: "Mayonesa",
                  },
                  {
                    id: "02",
                    title: "Mostaza",
                  },
                  {
                    id: "03",
                    title: "Ketchup",
                  },
                ],
              },
            ],
    }),
  );
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
  const categories = extractUniqueBy(products, (product) => product.category);
  const productsBySearch = filterBy(products, {category, title: query, ...filters});

  return {
    products: productsBySearch,
    filters: (
      <Flex flexDirection={{base: "column", sm: "row"}} width="100%">
        <InputGroup mb={{base: 3, sm: 0}} mr={{base: 0, sm: 6}}>
          <InputLeftElement
            children={<Icon color="gray.300" name="search" />}
            color="gray.300"
            fontSize="1.2em"
          />
          <Input
            placeholder="Buscar..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </InputGroup>
        <Select
          maxW={{base: "100%", sm: "220px"}}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
        >
          <option value="">Todos los productos</option>
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
