import React from "react";
import {Stack, Avatar, Flex, Text} from "@chakra-ui/core";

import Content from "./Content";

const Testimonial = () => (
  <Content as="section" paddingY={{base: 8, sm: 20}}>
    <Stack
      alignItems="center"
      bg="gray.50"
      rounded="lg"
      flexDirection="column"
      paddingX={4}
      paddingY={{base: 8, sm: 20}}
      spacing={4}
      textAlign="center"
    >
      <Avatar name="Francisco Bellocchio" size="2xl" src="/assets/landing/blondies.jpg" />
      <Text fontSize={{base: "2xl", sm: "3xl"}} maxWidth={{base: "auto", sm: 782}}>
        “Pency apareció en el momento justo como una herramienta para ayudar a nuestra marca a
        potenciar la venta on line y llegar a nuestros clientes de manera simple y segura."
      </Text>
      <Flex alignItems="center" flexDirection={{base: "column", sm: "row"}} fontSize={{base: 20}}>
        <Text color="teal.800" marginBottom={{base: 2, sm: 0}} fontWeight={500} >
          Francisco Bellocchio
        </Text>
        <Text color="teal.500" display={{base: "none", sm: "block"}} marginX={2}>
          /
        </Text>
        <Text color="gray.500" fontSize={{base: 18, sm: 20}}>
          Dueño de Blondies
        </Text>
      </Flex>
    </Stack>
  </Content>
);

export default Testimonial;
