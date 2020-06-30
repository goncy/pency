import React from "react";
import {FlexProps} from "@chakra-ui/core";

import {Product} from "../../types";

import LandscapeProductCard from "./Landscape";
import PortraitProductCard from "./Portrait";

interface Props extends Omit<FlexProps, "onClick"> {
  product: Product;
  onClick: (product: Product) => void;
  isRaised?: boolean;
  layout?: "portrait" | "landscape";
}

const ProductCard: React.FC<Props> = ({layout = "portrait", ...props}) => {
  if (layout === "landscape") return <LandscapeProductCard {...props} />;
  if (layout === "portrait") return <PortraitProductCard {...props} />;

  return null;
};

export default ProductCard;
