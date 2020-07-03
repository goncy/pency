import React from "react";
import {Image, PseudoBox} from "@chakra-ui/core";

import Link from "~/ui/controls/Link";

interface Props {
  title: string;
  image: string;
  store: string;
}

const Preview: React.FC<Props> = ({image, store}) => {
  return (
    <Link isExternal href={`https://pency.app/${store}`}>
      <PseudoBox
        _hover={{
          boxShadow: "xl",
          transform: "translateY(-4px)",
        }}
        borderRadius="lg"
        minWidth="276px"
        transition="all .25s"
        width={{base: "60vw", sm: "100%"}}
      >
        <Image
          alt={`Previsualización de la tienda Pency llamada ${store}`}
          borderRadius="lg"
          src={image}
        />
      </PseudoBox>
    </Link>
  );
};

export default Preview;
