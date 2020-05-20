import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

import ProductRow from "./ProductRow";

import {Product} from "~/product/types";

interface Props extends BoxProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onRemove: (id: Product["id"]) => Promise<void>;
}

const ProductsList: React.FC<Props> = ({products, onEdit, onRemove, ...props}) => (
  <Box as="table" {...props}>
    <Box as="tbody">
      {products.map((product) => (
        <ProductRow key={product.id} onEdit={onEdit} onRemove={onRemove} {...product} />
      ))}
    </Box>
  </Box>
);

export default ProductsList;
