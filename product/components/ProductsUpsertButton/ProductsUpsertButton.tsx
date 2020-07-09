import React from "react";
import {Stack} from "@chakra-ui/core";

import ProductsCSVInput from "../../inputs/ProductsCSVInput";
import ProductsUpsertDrawer from "../ProductsUpsertDrawer";

import UploadIcon from "~/ui/icons/Upload";
import IconButton from "~/ui/controls/IconButton";
import EditIcon from "~/ui/icons/Edit";
import {Product} from "~/product/types";
import {download} from "~/utils/download";
import {CSV_TEMPLATE} from "~/product/constants";
import DownloadIcon from "~/ui/icons/Download";

interface Props {
  products: Product[];
  onSubmit: (products: Product[]) => Promise<void>;
}

const ProductsUpsertButton: React.FC<Props> = ({products: base, onSubmit}) => {
  // Store products to edit
  const [products, setProducts] = React.useState<Product[]>([]);

  function handleImport(products: Product[]) {
    // Open drawer with imported products
    setProducts(products);
  }

  function handleBulkOpen() {
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

  function handleDownload() {
    // Download the base CSV file
    download("pency.csv", CSV_TEMPLATE);
  }

  return (
    <>
      <Stack isInline spacing={2}>
        <ProductsCSVInput isCollapsable leftIcon={UploadIcon} onChange={handleImport}>
          Importar
        </ProductsCSVInput>
        <IconButton
          isCollapsable
          data-test-id="bulk-button"
          leftIcon={DownloadIcon}
          size="md"
          onClick={handleDownload}
        >
          Descargar planilla
        </IconButton>
        <IconButton
          isCollapsable
          data-test-id="bulk-button"
          leftIcon={EditIcon}
          size="md"
          onClick={handleBulkOpen}
        >
          Edicion en lote
        </IconButton>
      </Stack>
      <ProductsUpsertDrawer
        defaultValues={products}
        isOpen={Boolean(products?.length)}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ProductsUpsertButton;
