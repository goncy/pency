import React from "react";
import {
  Icon,
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
  Divider,
} from "@chakra-ui/core";

import ProductContext from "./context";
import {Product} from "./types";

import {extractUniqueBy, filterBy} from "~/selectors/filter";
import {sort} from "~/selectors/sort";
import {groupBy} from "~/selectors/group";

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
  const [query, setQuery] = React.useState("");
  const productsBySearch = filterBy(products, {title: query, ...filters});
  const categories = groupBy(products, (product) => product.category).map(([category, products]): [
    Product["category"],
    number,
  ] => [category, products.length]);

  function onChange(category: Product["category"]) {
    setQuery("");

    if (category) {
      setTimeout(
        () => document.querySelector(`#${category}`)?.scrollIntoView({behavior: "smooth"}),
        0,
      );
    }
  }

  return {
    products: productsBySearch,
    filters: (
      <Flex
        borderBottomWidth={1}
        borderColor="gray.300"
        borderTopWidth={1}
        data-test-id="filters"
        paddingY={2}
      >
        <Menu>
          <MenuButton
            // @ts-ignore
            as={Button}
            // @ts-ignore
            rightIcon="chevron-down"
            // @ts-ignore
            variant="ghost"
          >
            Categorías
          </MenuButton>
          <MenuList padding={0} placement="bottom-start">
            {categories.map(([category, count]) => (
              <MenuItem
                key={category}
                _notLast={{
                  borderBottomWidth: 1,
                }}
                borderBottomColor="gray.200"
                justifyContent="space-between"
                minHeight={12}
                onClick={() => onChange(category)}
              >
                <Text fontWeight={500}>{category}</Text>
                <Text color="gray.400" fontWeight={500}>
                  {count}
                </Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Divider marginY={2} orientation="vertical" />
        <InputGroup flex={{base: 1, sm: "inherit"}}>
          <InputLeftElement
            children={<Icon color="gray.300" name="search" />}
            color="gray.300"
            fontSize="1.2em"
          />
          <Input
            placeholder="Buscar..."
            value={query}
            variant="unstyled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Flex>
    ),
  };
}
