import React from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Stack,
  Image,
  Button,
  Link,
  Text,
} from "@chakra-ui/core";

import {Provider as SessionProvider} from "~/session/context";
import ProductsAdminScreen from "~/product/screens/Admin";
import TenantAdminScreen from "~/tenant/screens/Admin";
import fetch from "~/utils/fetch";
import {Tenant} from "~/tenant/types";
import Head from "~/app/components/Head";
import BoxIcon from "~/ui/icons/Box";
import SlidersIcon from "~/ui/icons/Sliders";
import HelpCircleIcon from "~/ui/icons/HelpCircle";
import LogOutIcon from "~/ui/icons/LogOut";
import IconButton from "~/ui/controls/IconButton";

interface Props {
  tenant: Tenant;
}

const AdminScreen: React.FC<Props> = ({tenant}) => {
  return (
    <>
      <Head tenant={tenant} />
      <SessionProvider>
        <Box as="main" overflowY="auto">
          <Flex
            alignItems="center"
            boxShadow="sm"
            height={16}
            justifyContent="space-between"
            paddingX={4}
            paddingY={2}
            position="relative"
          >
            <Stack isInline alignItems="center" spacing={2}>
              <Image alt="Pency" src="/logo.svg" />
              <Link href={`/${tenant.slug}`} rel="noopener noreferrer" target="_blank">
                <Button
                  backgroundColor="primary.50"
                  rightIcon="external-link"
                  size="xs"
                  variant="ghost"
                  variantColor="primary"
                >
                  Ver tienda
                </Button>
              </Link>
            </Stack>
            <Stack isInline spacing={{base: 0, sm: 8}}>
              <Link href={`mailto:${process.env.MANTAINER_EMAIL}`}>
                <IconButton color="black" fontWeight="500" leftIcon={HelpCircleIcon} variant="link">
                  Ayuda
                </IconButton>
              </Link>
              <IconButton color="black" fontWeight="500" leftIcon={LogOutIcon} variant="link">
                Salir
              </IconButton>
            </Stack>
          </Flex>
          <Tabs size="lg" variantColor="primary">
            <Stack
              isInline
              alignItems="center"
              backgroundColor="gray.100"
              borderBottom="1px solid"
              borderColor="gray.200"
              height={16}
              paddingX={4}
              spacing={4}
            >
              <TabList height={16}>
                <Tab fontWeight={500}>
                  <BoxIcon marginRight={2} />
                  <Text>Productos</Text>
                </Tab>
                <Tab fontWeight={500}>
                  <SlidersIcon marginRight={2} />
                  <Text>Tienda</Text>
                </Tab>
              </TabList>
            </Stack>
            <TabPanels padding={4}>
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
    return {props: {statusCode: err?.status || res?.statusCode || 404}};
  }
}

export default AdminScreen;
