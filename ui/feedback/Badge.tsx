import React from "react";
import {Badge as ChakraBadge, BadgeProps} from "@chakra-ui/core";

interface Props extends BadgeProps {
  count: number;
  hideUntil?: number;
}

const Badge: React.FC<Props> = ({count, hideUntil = 2, ...props}) =>
  count >= hideUntil ? <ChakraBadge {...props} children={count} /> : null;

export default Badge;
