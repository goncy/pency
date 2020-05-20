import React from "react";
import {Box} from "@chakra-ui/core";
import faker from "faker";

import ProductsGrid from "./ProductsGrid";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const getFakeProduct = (data = {}) => ({
  id: faker.random.uuid(),
  category: faker.commerce.department(),
  image: `${faker.image.food()}?t=${Math.random()}`, // Add custom number to prevent caching (getting always the same img)
  description: faker.lorem.paragraph(),
  title: faker.commerce.productName(),
  price: Number(faker.commerce.price()),
  available: true,
  ...data,
});

export default {title: "ProductCard"};

export const noData = () => (
  <Box m={6}>
    <ProductsGrid>
      <ProductCard add={() => {}} product={getFakeProduct({description: null})} remove={() => {}} />
      <ProductCard add={() => {}} product={getFakeProduct({image: null})} remove={() => {}} />
    </ProductsGrid>
  </Box>
);

export const loading = () => (
  <Box m={6}>
    <ProductsGrid>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </ProductsGrid>
  </Box>
);

export const list = () => (
  <Box m={6}>
    <ProductsGrid>
      <ProductCard add={() => {}} product={getFakeProduct()} remove={() => {}} />
      <ProductCard add={() => {}} product={getFakeProduct()} remove={() => {}} />
      <ProductCard add={() => {}} product={getFakeProduct()} remove={() => {}} />
      <ProductCard add={() => {}} product={getFakeProduct()} remove={() => {}} />
      <ProductCard add={() => {}} product={getFakeProduct()} remove={() => {}} />
    </ProductsGrid>
  </Box>
);
