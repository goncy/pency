import React from "react";
import {Box, Tabs, TabList, Tab, TabPanels, TabPanel, Heading} from "@chakra-ui/core";

import {Provider as SessionProvider} from "~/session/context";
import ProductsAdminScreen from "~/product/screens/Admin";
import TenantAdminScreen from "~/tenant/screens/Admin";
import fetch from "~/utils/fetch";
import {Tenant} from "~/tenant/types";
import Head from "~/app/components/Head";

interface Props {
  tenant: Tenant;
}

const AdminScreen: React.FC<Props> = ({tenant}) => {
  return (
    <>
      <Head tenant={tenant} />
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
    </>
  );
};

export async function getServerSideProps({
  req: {
    headers: {host},
  },
  params: {slug},
  res,
}) {
  try {
    const BASE_URL = `http://${host}/api`;

    const tenant = await fetch("GET", `${BASE_URL}/tenant?slug=${slug}`);
    const products = await fetch("GET", `${BASE_URL}/product?tenant=${tenant.id}`);

    return {props: {tenant, products}};
  } catch (err) {
    return {props: {error: err?.statusCode || res?.statusCode || 404}};
  }
}

export default AdminScreen;
