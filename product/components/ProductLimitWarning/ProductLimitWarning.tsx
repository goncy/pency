import React from "react";
import {ModalCloseButton, Stack, Text} from "@chakra-ui/core";

import Modal, {ModalBody, ModalTitle} from "~/ui/controls/Modal";
import WhatsAppButton from "~/ui/controls/WhatsAppButton";
import Link from "~/ui/controls/Link";

interface Props {
  onClose: VoidFunction;
}

const ProductLimitWarning: React.FC<Props> = ({onClose}) => (
  <Modal onClose={onClose}>
    <ModalCloseButton size="lg" zIndex={1500} />
    <ModalBody height="auto" marginTop={4} padding={6}>
      <Stack spacing={2}>
        <ModalTitle>¡Llegaste al límite!</ModalTitle>
        <Stack spacing={2}>
          <Text>
            Para poder seguir agregando nuevos productos tenés que contratar un plan mejor.
          </Text>
          <Text color="gray.500" fontSize="sm">
            También podés reducir la cantidad de productos usando variantes, los clientes compran
            más en tiendas con menos productos.
          </Text>
        </Stack>
        <Link
          isExternal
          href={`https://wa.me/${process.env.MANTAINER_PHONE}?text=Necesito un plan mejor para mi tienda`}
        >
          <WhatsAppButton marginTop={2}>Preguntanos por WhatsApp</WhatsAppButton>
        </Link>
      </Stack>
    </ModalBody>
  </Modal>
);

export default ProductLimitWarning;
