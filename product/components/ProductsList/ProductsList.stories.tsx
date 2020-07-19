import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../../mock";

import ProductsList from "./ProductsList";

export const full = () => (
  <ProductsList
    layout="landscape"
    products={[mock.withoutVariants, mock.full, mock.withoutImage]}
    title={mock.full.category}
    width="100%"
    onEdit={action("edit")}
    onRemove={() => Promise.resolve(action("remove")())}
  />
);

export const noCategory = () => (
  <ProductsList
    layout="portrait"
    products={[mock.withoutVariants, mock.full, mock.withoutImage]}
    width="100%"
    onEdit={action("edit")}
    onRemove={() => Promise.resolve(action("remove")())}
  />
);

export const withPreviewLandscape = () => (
  <ProductsList
    isPreviewEnabled
    layout="landscape"
    products={[mock.withoutVariants, mock.full, mock.withoutImage]}
    title={mock.full.category}
    width="100%"
    onEdit={action("edit")}
    onRemove={() => Promise.resolve(action("remove")())}
  />
);

export const withPreviewPortrait = () => (
  <ProductsList
    isPreviewEnabled
    layout="portrait"
    products={[mock.withoutVariants, mock.full, mock.withoutImage]}
    title={mock.full.category}
    width="100%"
    onEdit={action("edit")}
    onRemove={() => Promise.resolve(action("remove")())}
  />
);

export default {title: "Product/Components/ProductsList"};
