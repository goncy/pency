import React from "react";
import {SimpleGrid, Stack} from "@chakra-ui/core";

import Introduction from "./Introduction";
import Contact from "./Contact";
import Challenges from "./Challenges";
import Tier from "./Tier";

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
            <Tier expiration={tenant.tierUntil} tier={tenant.tier} />
            <Contact />
          </Stack>
          <Challenges products={products} tenant={tenant} />
        </SimpleGrid>
      </Stack>
    </Content>
  );
};

export default HomeScreen;
