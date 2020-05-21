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
        () => document.querySelector(`[id="${category}"]`)?.scrollIntoView({behavior: "smooth"}),
        0,
      );
    }
  }

  return {
    products: productsBySearch,
    filters: (
      <Flex alignItems="center">
        <Menu>
          <MenuButton
            _hover={{
              textDecoration: "none",
            }}
            as={Button}
            color="black"
            fontWeight={500}
            // @ts-ignore
            rightIcon="chevron-down"
            variant="link"
          >
            Categorías
          </MenuButton>
          <MenuList margin={0} padding={0} placement="bottom-start" zIndex={3}>
            {categories.map(([category, count]) => (
              <MenuItem
                key={category}
                _notLast={{
                  borderBottomWidth: 1,
                }}
                borderBottomColor="gray.200"
                data-test-id={`category-${category}`}
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
        <Divider height={4} marginLeft={4} marginRight={1} orientation="vertical" />
        <InputGroup alignItems="center" flex={{base: 1, sm: "inherit"}} height={10}>
          <InputLeftElement
            children={<Icon color="gray.300" name="search" />}
            color="gray.300"
            fontSize="1.2em"
            top="inherit"
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
