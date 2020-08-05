import React from "react";
import {Box, StackProps, Stack, Text} from "@chakra-ui/core";

import ProductCard from "../ProductCard";
import ProductsGrid from "../ProductsGrid";

import ProductRow from "./ProductRow";

import {Product} from "~/product/types";
import ChevronUpIcon from "~/ui/icons/ChevronUp";
import ChevronDownIcon from "~/ui/icons/ChevronDown";
import GridIcon from "~/ui/icons/Grid";
import MenuIcon from "~/ui/icons/Menu";
import {ClientTenant} from "~/tenant/types";

interface Props extends StackProps {
  layout: ClientTenant["layout"];
  products: Product[];
  isPreviewEnabled?: boolean;
  title?: string;
  onEdit: (product: Product) => void;
  onRemove: (id: Product["id"]) => Promise<void>;
}

const ProductsList: React.FC<Props> = ({
  title = null,
  isPreviewEnabled = false,
  products,
  onEdit,
  onRemove,
  layout,
  ...props
}) => {
  // If it doesn't have a title, show it
  const [isToggled, toggle] = React.useState(!Boolean(title));

  // Store preview mode
  const [previewMode, setPreviewMode] = React.useState("row");

  // Handle toggle when title is clicked
  function handleToggle() {
    toggle(!isToggled);
  }

  // Set card preview mode
  function handleCardPreviewMode() {
    setPreviewMode("card");
  }

  // Set row preview mode
  function handleRowPreviewMode() {
    setPreviewMode("row");
  }

  return (
    <Stack spacing={0} {...props}>
      {title && (
        <Stack
          isInline
          alignItems="center"
          fontSize="xl"
          fontWeight={500}
          paddingBottom={2}
          spacing={2}
        >
          {isPreviewEnabled && previewMode === "row" && (
            <GridIcon cursor="pointer" onClick={handleCardPreviewMode} />
          )}
          {isPreviewEnabled && previewMode === "card" && (
            <MenuIcon cursor="pointer" onClick={handleRowPreviewMode} />
          )}
          <Stack isInline alignItems="center" cursor="pointer" spacing={2} onClick={handleToggle}>
            <Text>{title}</Text>
            <Text color="gray.500">({products.length})</Text>
            {!isToggled && <ChevronDownIcon />}
            {isToggled && <ChevronUpIcon />}
          </Stack>
        </Stack>
      )}
      {isToggled && previewMode === "row" && (
        <Box as="table" borderTopWidth={1} width="100%">
          <Box as="tbody">
            {products.map((product) => (
              <ProductRow key={product.id} onEdit={onEdit} onRemove={onRemove} {...product} />
            ))}
          </Box>
        </Box>
      )}
      {isToggled && previewMode === "card" && (
        <ProductsGrid layout={layout}>
          {products.map((product) => (
            <ProductCard key={product.id} layout={layout} product={product} />
          ))}
        </ProductsGrid>
      )}
    </Stack>
  );
};

export default ProductsList;
