import React from "react";
import LazyLoad from "react-lazy-load";
import {Box, useDisclosure} from "@chakra-ui/core";

import {Product} from "../types";

import ProductImageModal from "./ProductImageModal";

interface Props {
  image: Product["image"];
}

const ProductImage: React.FC<Props> = ({image}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <LazyLoad height={96} offsetVertical={512}>
        <Box
          backgroundImage={`url(${image})`}
          backgroundPosition="center"
          backgroundSize="cover"
          border={1}
          borderColor="gray.100"
          borderStyle="solid"
          cursor="pointer"
          flexShrink={0}
          height={24}
          rounded="lg"
          width={24}
          onClick={onOpen}
        />
      </LazyLoad>
      <ProductImageModal image={image} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ProductImage;
