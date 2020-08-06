import React from "react";
import {Box, Stack, Text} from "@chakra-ui/core";

import ProductsCSVInput from "../../inputs/ProductsCSVInput";

import Modal, {ModalBody, ModalTitle, ModalCloseButton} from "~/ui/controls/Modal";
import DownloadIcon from "~/ui/icons/Download";
import UploadIcon from "~/ui/icons/Upload";
import {Product} from "~/product/types";
import {download} from "~/utils/download";
import {CSV_TEMPLATE} from "~/product/constants";

interface Props {
  onChange: (products: Product[]) => void;
  onClose: VoidFunction;
}

const ProductsUpsertModal: React.FC<Props> = ({onClose, onChange}) => {
  function handleClose() {
    // Close drawer
    onClose();
  }

  function handleChange(products: Product[]) {
    // Pass products to parent
    onChange(products);

    // Close drawer
    onClose();
  }

  function handleDownload() {
    // Download the base CSV file
    download("pency.csv", CSV_TEMPLATE);
  }

  return (
    <Modal onClose={handleClose}>
      <ModalCloseButton size="lg" zIndex={1500} />
      <ModalBody height="auto" marginTop={4} padding={6}>
        <Stack spacing={6}>
          <ModalTitle>Importar catálogo</ModalTitle>
          <Stack spacing={4}>
            <Box position="relative">
              <ProductsCSVInput onChange={handleChange}>
                <Stack
                  alignItems="center"
                  backgroundColor="gray.100"
                  borderColor="gray.300"
                  borderRadius="lg"
                  borderStyle="dashed"
                  borderWidth={3}
                  display="flex"
                  height="100%"
                  justifyContent="center"
                  minHeight={180}
                  spacing={2}
                  width="100%"
                >
                  <UploadIcon color="gray.500" />
                  <Stack alignItems="center" spacing={0}>
                    <Text color="gray.500" fontSize="sm">
                      Arrastrá tu archivo CSV o
                    </Text>
                    <Text color="primary.500" fontSize="sm">
                      Seleccionalo desde tu computadora
                    </Text>
                  </Stack>
                </Stack>
              </ProductsCSVInput>
            </Box>
            <Box color="gray.500" fontSize="sm">
              <Box as="span">
                El archivo .CSV tiene que tener un formato particular. Si no sabés cual es
              </Box>
              <Stack
                isInline
                alignItems="baseline"
                as="span"
                color="primary.500"
                cursor="pointer"
                display="inline-flex"
                marginX={2}
                spacing={1}
                onClick={handleDownload}
              >
                <DownloadIcon marginBottom="auto" size={18} />
                <Text>bajá este archivo</Text>
              </Stack>
              <Box as="span">para usarlo como referencia.</Box>
            </Box>
          </Stack>
        </Stack>
      </ModalBody>
    </Modal>
  );
};

export default ProductsUpsertModal;
