import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/core";

const Onboarding = () => {
  const [isShown, setShown] = React.useState(
    process.browser ? !Boolean(window.localStorage.getItem("onboarding:Products")) : false,
  );

  function handleClose() {
    window.localStorage.setItem("onboarding:Products", "completed");

    setShown(false);
  }

  if (!isShown) return null;

  return (
    <Modal isCentered isOpen onClose={handleClose}>
      <ModalOverlay backgroundColor="rgba(255,255,255,0.5)" zIndex={1400} />
      <ModalContent
        backgroundColor="transparent"
        bottom={{base: 0, sm: "auto"}}
        boxShadow="none"
        marginY={0}
        padding={4}
        position="absolute"
        top="auto"
      >
        <ModalCloseButton data-test-id="product-onboarding-close" right={6} top={6} />
        <ModalBody
          backgroundColor="primary.50"
          borderColor="primary.500"
          borderWidth={2}
          boxShadow="lg"
          padding={4}
          rounded="lg"
        >
          <Stack>
            <Stack spacing={0}>
              <Text fontSize="xl" fontWeight="bold">
                Hola!
              </Text>
              <Text color="gray.600">Armá tu pedido en simples pasos:</Text>
            </Stack>
            <Stack marginTop={4} spacing={6}>
              <Stack isInline alignItems="baseline" spacing={3}>
                <Flex
                  alignItems="center"
                  backgroundColor="primary.500"
                  borderRadius="50%"
                  color="white"
                  fontSize="sm"
                  height={6}
                  justifyContent="center"
                  lineHeight="1.5rem"
                  minWidth={6}
                  width={6}
                >
                  <Text>1</Text>
                </Flex>
                <Text>Elegí los productos que quieras</Text>
              </Stack>
              <Stack isInline alignItems="baseline" spacing={3}>
                <Flex
                  alignItems="center"
                  backgroundColor="primary.500"
                  borderRadius="50%"
                  color="white"
                  fontSize="sm"
                  height={6}
                  justifyContent="center"
                  lineHeight="1.5rem"
                  minWidth={6}
                  width={6}
                >
                  <Text>2</Text>
                </Flex>
                <Text>Revisá y completá tu pedido</Text>
              </Stack>
              <Stack isInline alignItems="baseline" spacing={3}>
                <Flex
                  alignItems="center"
                  backgroundColor="primary.500"
                  borderRadius="50%"
                  color="white"
                  fontSize="sm"
                  height={6}
                  justifyContent="center"
                  lineHeight="1.5rem"
                  minWidth={6}
                  width={6}
                >
                  <Text>3</Text>
                </Flex>
                <Text>¡Listo! Generamos tu pedido para que la tienda lo reciba por WhatsApp</Text>
              </Stack>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Onboarding;
