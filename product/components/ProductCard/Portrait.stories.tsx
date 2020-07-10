import React from "react";
import {Box} from "@chakra-ui/core";
import {action} from "@storybook/addon-actions";

import productMock from "../../mock";

import ProductCard from ".";

export default {
  title: "Product/Components/ProductCard/Portrait",
  decorators: [(storyFn) => <Box maxWidth="240px">{storyFn()}</Box>],
};

export const base = () => (
  <ProductCard
    layout="portrait"
    product={{...productMock.full, originalPrice: 0}}
    onClick={action("onClick")}
  />
);

export const withOriginalPrice = () => (
  <ProductCard layout="portrait" product={productMock.full} onClick={action("onClick")} />
);

export const raised = () => (
  <ProductCard isRaised layout="portrait" product={productMock.full} onClick={action("onClick")} />
);

export const noStock = () => (
  <ProductCard
    layout="portrait"
    product={{...productMock.withoutVariants, visibility: "unavailable"}}
    onClick={action("onClick")}
  />
);

export const ask = () => (
  <ProductCard
    layout="portrait"
    product={{...productMock.withoutVariants, visibility: "ask"}}
    onClick={action("onClick")}
  />
);

export const hidden = () => (
  <ProductCard
    layout="portrait"
    product={{...productMock.withoutVariants, visibility: "hidden"}}
    onClick={action("onClick")}
  />
);
