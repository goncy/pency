import React from "react";
import {Modal, ModalOverlay, ModalCloseButton, ModalContent, Image} from "@chakra-ui/core";

import {Product} from "../types";

interface Props {
  isOpen: boolean;
  image: Product["image"];
  onClose: () => void;
}

const ProductImageModal: React.FC<Props> = ({isOpen, onClose, image}) => (
  <Modal isCentered id="image" isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalCloseButton color="white" right={1} size="lg" top={1} zIndex={1500} />
    <ModalContent
      alignItems="center"
      backgroundColor="transparent"
      boxShadow="none"
      height="auto"
      justifyContent="center"
      margin={4}
      maxHeight="60vh"
      maxWidth="640px"
    >
      <Image height="100%" objectFit="contain" src={image} width="100%" />
    </ModalContent>
  </Modal>
);

export default ProductImageModal;
