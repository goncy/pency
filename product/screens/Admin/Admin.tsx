import React from "react";
import {Stack, Box, Flex} from "@chakra-ui/core";

import ProductDrawer from "../../components/ProductDrawer";
import {useFilteredProducts, useProductActions, useProductCategories} from "../../hooks";
import {Product} from "../../types";
import ProductsList from "../../components/ProductsList";

import {groupBy} from "~/selectors/group";
import PlusIcon from "~/ui/icons/Plus";
import IconButton from "~/ui/controls/IconButton";
import Content from "~/ui/structure/Content";
import NoResults from "~/ui/feedback/NoResults";
import {useTranslation} from "~/i18n/hooks";
import ProductsUpsertDrawer from "~/product/components/ProductsUpsertDrawer";
import {useTenant} from "~/tenant/hooks";
import UploadIcon from "~/ui/icons/Upload";
import ProductsCSVInput from "~/product/inputs/ProductsCSVInput";
import EditIcon from "~/ui/icons/Edit";

const AdminScreen: React.FC = () => {
  const [selected, setSelected] = React.useState<Partial<Product> | undefined>(undefined);
  const {flags} = useTenant();
  const {products, filters} = useFilteredProducts();
  const [bulkProducts, setBulkProducts] = React.useState([]);
  const {update, remove, create, upsert} = useProductActions();
  const categories = useProductCategories();
  const productsByCategory = groupBy(products, (product) => product.category);
  const t = useTranslation();

  async function handleSubmit(product: Product) {
    if (product.id) {
      await update(product);
    } else {
      await create(product);
    }

    closeProductDrawer();
  }

  async function handleBulkSubmit(products: Product[]) {
    await upsert(products);

    setBulkProducts([]);
  }

  function handleImport(products: Product[]) {
    setBulkProducts(products);
  }

  function handleBulkOpen() {
    setBulkProducts(products);
  }

  function handleBulkClose() {
    setBulkProducts([]);
  }

  function onCreate() {
    setSelected({
      available: true,
      image: "",
      options: [],
    });
  }

  function onProductEdit(product: Product) {
    setSelected(product);
  }

  function closeProductDrawer() {
    setSelected(undefined);
  }

  return (
    <>
      <Flex direction="column" height="100%" marginTop={4}>
        <Box flex={1}>
          <Flex alignItems="center" data-test-id="filters">
            <Content>
              <Flex alignItems="center" justifyContent="space-between" paddingX={4} width="100%">
                {filters}
                <Stack isInline shouldWrapChildren marginLeft={4} spacing={2}>
                  {flags?.includes("bulk") && (
                    <ProductsCSVInput isCollapsable leftIcon={UploadIcon} onChange={handleImport}>
                      Importar
                    </ProductsCSVInput>
                  )}
                  {flags?.includes("bulk") && (
                    <IconButton
                      isCollapsable
                      data-test-id="bulk-button"
                      leftIcon={EditIcon}
                      size="md"
                      onClick={handleBulkOpen}
                    >
                      Edicion en lote
                    </IconButton>
                  )}
                  <IconButton
                    isCollapsable
                    data-test-id="add-product"
                    leftIcon={PlusIcon}
                    size="md"
                    variantColor="primary"
                    onClick={onCreate}
                  >
                    {t("common.add")}
                  </IconButton>
                </Stack>
              </Flex>
            </Content>
          </Flex>
          <Content padding={4}>
            <Box width="100%">
              {products.length ? (
                <Stack spacing={6}>
                  {productsByCategory.map(([category, products]) => (
                    <Box key={category} id={category}>
                      <ProductsList
                        products={products}
                        title={category}
                        width="100%"
                        onEdit={onProductEdit}
                        onRemove={remove}
                      />
                    </Box>
                  ))}
                </Stack>
              ) : (
                <NoResults>{t("admin.empty")}</NoResults>
              )}
            </Box>
          </Content>
        </Box>
      </Flex>
      <ProductDrawer
        categories={categories}
        defaultValues={selected}
        isOpen={Boolean(selected)}
        onClose={closeProductDrawer}
        onSubmit={handleSubmit}
      />
      <ProductsUpsertDrawer
        defaultValues={bulkProducts}
        isOpen={Boolean(bulkProducts?.length)}
        onClose={handleBulkClose}
        onSubmit={handleBulkSubmit}
      />
    </>
  );
};

export default AdminScreen;
