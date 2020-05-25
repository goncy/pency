import React from "react";
import {Icon, Input, Flex, InputGroup, InputLeftElement, Divider, Select} from "@chakra-ui/core";

import ProductContext from "./context";
import {Product} from "./types";

import {extractUniqueBy, filterBy} from "~/selectors/filter";
import {sort} from "~/selectors/sort";
import {groupBy} from "~/selectors/group";
import {useTranslation} from "~/hooks/translation";

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
  const {t} = useTranslation();
  const [query, setQuery] = React.useState("");
  const productsBySearch = filterBy(products, {title: query, ...filters});
  const categories = groupBy(products, (product) => product.category).map(([category, products]): [
    Product["category"],
    number,
  ] => [category, products.length]);

  function handleCategoryChange(category: Product["category"]) {
    setQuery("");

    if (category) {
      document
        .querySelector(`[id="${category}"]`)
        ?.scrollIntoView({behavior: "smooth", block: "nearest", inline: "start"});
    }
  }

  return {
    products: productsBySearch,
    filters: (
      <Flex alignItems="center">
        <Select
          flex={{base: 1, sm: "inherit"}}
          fontWeight="500"
          height="100%"
          maxWidth={{base: "100%", sm: "220px"}}
          placeholder={t("filters.categories")}
          value=""
          variant="unstyled"
          width="auto"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleCategoryChange(e.target.value)
          }
        >
          {categories.map(([category, count]) => (
            <option key={category} value={category}>
              {category} ({count})
            </option>
          ))}
        </Select>
        <Divider height={4} orientation="vertical" />
        <InputGroup alignItems="center" flex={{base: 1, sm: "inherit"}} height={10}>
          <InputLeftElement
            children={<Icon color="gray.300" name="search" />}
            color="gray.300"
            fontSize="1.2em"
            top="inherit"
          />
          <Input
            placeholder={t("filters.search")}
            value={query}
            variant="unstyled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Flex>
    ),
  };
}
