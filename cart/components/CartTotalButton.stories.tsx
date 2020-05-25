import React from "react";
import faker from "faker";
import {Box} from "@chakra-ui/core";

import CartTotalButton from "./CartTotalButton";

export const full = () => (
  <Box maxWidth="340px">
    <CartTotalButton
      count={faker.random.number(20)}
      total={faker.random.number(10000)}
      onClick={() => {}}
    />
  </Box>
);

export default {title: "CartTotalButton"};
