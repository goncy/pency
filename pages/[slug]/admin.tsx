import React from "react";
import fetch from "isomorphic-unfetch";
import {Box, Tabs, TabList, Tab, TabPanels, TabPanel, Heading} from "@chakra-ui/core";

import {Provider as SessionProvider} from "~/session/context";
import ProductsAdminScreen from "~/product/screens/Admin";
import TenantAdminScreen from "~/tenant/screens/Admin";

const AdminScreen: React.FC = () => {
  return (
    <SessionProvider>
      <Box height="100%" overflowY="auto" padding={{base: 3, sm: 6}}>
        <Heading as="h1" mb={{base: 3, sm: 6}} size="2xl">
          Panel de administración
        </Heading>
        <Tabs variant="soft-rounded" variantColor="primary">
          <TabList mb={{base: 3, sm: 6}}>
            <Tab>Productos</Tab>
            <Tab>Tienda</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProductsAdminScreen />
            </TabPanel>
            <TabPanel>
              <TenantAdminScreen />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </SessionProvider>
  );
};

export async function getServerSideProps({params: {slug}}) {
  const tenant = await fetch(`http://localhost:3000/api/tenant?slug=${slug}`).then((res) =>
    res.json(),
  );
  const products = await fetch(
    `http://localhost:3000/api/product?tenant=${tenant.id}`,
  ).then((res) => res.json());

  return {props: {tenant, products}};
}

export default AdminScreen;
