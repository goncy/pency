import React from "react";
import {Badge as ChakraBadge, BadgeProps} from "@chakra-ui/core";

interface Props extends BadgeProps {
  count: number;
}

const Badge: React.FC<Props> = ({count, ...props}) =>
  count > 1 ? <ChakraBadge {...props} children={count} /> : null;

export default Badge;
