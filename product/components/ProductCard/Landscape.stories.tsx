import React from "react";
import {Box} from "@chakra-ui/core";
import {action} from "@storybook/addon-actions";

import productMock from "../../mock";

import ProductCard from ".";

export default {
  title: "Product/Components/ProductCard/Landscape",
  decorators: [(storyFn) => <Box maxWidth="400px">{storyFn()}</Box>],
};

export const base = () => (
  <ProductCard
    layout="landscape"
    product={{...productMock.full, originalPrice: 0}}
    onClick={action("onClick")}
  />
);

export const withOriginalPrice = () => (
  <ProductCard layout="landscape" product={productMock.full} onClick={action("onClick")} />
);

export const raised = () => (
  <ProductCard isRaised layout="landscape" product={productMock.full} onClick={action("onClick")} />
);

export const noStock = () => (
  <ProductCard
    layout="landscape"
    product={{...productMock.withoutVariants, type: "unavailable"}}
    onClick={action("onClick")}
  />
);

export const custom = () => (
  <ProductCard
    layout="landscape"
    product={{...productMock.withoutVariants, type: "variant"}}
    onClick={action("onClick")}
  />
);

export const hidden = () => (
  <ProductCard
    layout="landscape"
    product={{...productMock.withoutVariants, type: "hidden"}}
    onClick={action("onClick")}
  />
);
