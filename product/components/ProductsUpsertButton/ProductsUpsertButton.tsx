import React from "react";
import {Stack, StackProps} from "@chakra-ui/core";

import ProductsUpsertDrawer from "../ProductsUpsertDrawer";
import ProductsUpsertModal from "../ProductsUpsertModal";

import UploadIcon from "~/ui/icons/Upload";
import IconButton from "~/ui/controls/IconButton";
import EditIcon from "~/ui/icons/Edit";
import {Product} from "~/product/types";

interface Props extends Omit<StackProps, "onSubmit"> {
  products: Product[];
  onSubmit: (products: Product[]) => Promise<void>;
}

const ProductsUpsertButton: React.FC<Props> = ({products: base, onSubmit, ...props}) => {
  // Store products to edit
  const [products, setProducts] = React.useState<Product[]>([]);

  // Store modal open flag
  const [isImportModalShown, toggleImportModal] = React.useState(false);

  function handleImport(products: Product[]) {
    // Open drawer with imported products
    setProducts(products);
  }

  function handleImportOpen() {
    // Open import modal
    toggleImportModal(true);
  }

  function handleImportClose() {
    // Close import modal
    toggleImportModal(false);
  }

  function handleBulkEdit() {
    // Open drawer with prop-passed products
    setProducts(base);
  }

  async function handleSubmit(products: Product[]) {
    // Upsert products
    await onSubmit(products);

    // Close drawer
    setProducts([]);
  }

  function handleClose() {
    // Close drawer
    setProducts([]);
  }

  return (
    <>
      <Stack isInline spacing={2} {...props}>
        <IconButton
          isCollapsable
          data-test-id="import-button"
          leftIcon={UploadIcon}
          size="md"
          onClick={handleImportOpen}
        >
          Importar
        </IconButton>
        <IconButton
          isCollapsable
          data-test-id="bulk-edit-button"
          leftIcon={EditIcon}
          size="md"
          onClick={handleBulkEdit}
        >
          Edicion en lote
        </IconButton>
      </Stack>
      {isImportModalShown && (
        <ProductsUpsertModal onChange={handleImport} onClose={handleImportClose} />
      )}
      {Boolean(products?.length) && (
        <ProductsUpsertDrawer
          defaultValues={products}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default ProductsUpsertButton;
