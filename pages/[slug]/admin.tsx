import React from "react";
import {Box, Tabs, TabList, Tab, TabPanels, TabPanel, Heading} from "@chakra-ui/core";
import fetch from "isomorphic-unfetch";

import {Provider as SessionProvider} from "~/session/context";
import ProductsAdminScreen from "~/product/screens/Admin";
import TenantAdminScreen from "~/tenant/screens/Admin";

const AdminScreen: React.FC = () => {
  return (
    <SessionProvider>
      <Box as="main" height="100%" overflowY="auto" padding={4}>
        <Heading as="h1" mb={4} size="2xl">
          Panel de administración
        </Heading>
        <Tabs variant="soft-rounded" variantColor="primary">
          <TabList mb={4}>
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

export async function getServerSideProps({params: {slug}, req}) {
  const BASE_URL = `http://${req.headers.host}/api`;

  try {
    const tenant = await fetch(`${BASE_URL}/tenant?slug=${slug}`).then((res) =>
      res.ok ? res.json() : Promise.reject(res),
    );
    const products = await fetch(`${BASE_URL}/product?tenant=${tenant.id}`).then((res) =>
      res.ok ? res.json() : Promise.reject(res),
    );

    return {props: {tenant, products}};
  } catch ({status, statusText: text}) {
    return {props: {error: {status, text}}};
  }
}

export default AdminScreen;
