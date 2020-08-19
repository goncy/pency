import React from "react";
import {SimpleGrid, Stack} from "@chakra-ui/core";

import Introduction from "./Introduction";
import Contact from "./Contact";
import Challenges from "./Challenges";
import Assets from "./Assets";

import Content from "~/ui/structure/Content";
import {useTenant} from "~/tenant/hooks";
import {useProducts} from "~/product/hooks";

const HomeScreen: React.FC = () => {
  const tenant = useTenant();
  const products = useProducts();

  return (
    <Content padding={4}>
      <Stack shouldWrapChildren spacing={{base: 4, sm: 8}}>
        <SimpleGrid columns={{base: 1, sm: 2}} spacing={{base: 4, sm: 8}}>
          <Stack shouldWrapChildren spacing={{base: 4, sm: 8}}>
            <Introduction title={tenant.title} />
            <Contact />
          </Stack>
          <Stack shouldWrapChildren spacing={{base: 4, sm: 8}}>
            <Challenges products={products} tenant={tenant} />
            <Assets tenant={tenant} />
          </Stack>
        </SimpleGrid>
      </Stack>
    </Content>
  );
};

export default HomeScreen;
