import React from "react";
import {Grid, Divider} from "@chakra-ui/core";

import ProductRow from "./ProductRow";

import {Product} from "~/product/types";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onRemove: (id: Product["id"]) => Promise<void>;
}

const ProductsList: React.FC<Props> = ({products, onEdit, onRemove}) => (
  <Grid alignItems="center" gridColumnGap={12} gridRowGap={2} gridTemplateColumns="repeat(5, auto)">
    {products.map((product) => (
      <ProductRow key={product.id} onEdit={onEdit} onRemove={onRemove} {...product} />
    ))}
  </Grid>
);

export default ProductsList;
