import React from "react";
import {Flex, Link, Text, Image, Stack, Box, Heading, Button} from "@chakra-ui/core";
import Head from "next/head";
import styled from "@emotion/styled";

const UnstyledLink = styled(Link)`
  text-decoration: none !important;
`;

const LandingScreen: React.FC = () => (
  <>
    <Head>
      <link href="/favicon.ico" rel="icon" />
      <meta content="#FFFFFF" name="theme-color" />
      <title>Pency - Tu tienda online</title>
      <meta
        content="Crea tu propia tienda en segundos y vendé por WhatsApp de forma fácil"
        name="description"
      />
      <link href="/logo192.jpg" rel="apple-touch-icon" />
      <meta content="tienda, online, fácil, delivery, compra, venta" name="keywords" />
      <meta content="Gonzalo Pozzo" name="author" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="goncy" name="twitter:site" />
      <meta content="goncy" name="twitter:creator" />
      <meta content="https://pency.now.sh" property="og:url" />
      <meta content="website" property="og:type" />
      <meta content="Pency - Tu tienda online" property="og:title" />
      <meta
        content="Crea tu propia tienda en segundos y vendé por WhatsApp de forma fácil"
        property="og:description"
      />
      <meta content="/og-image.jpg" property="og:image" />
      <meta content="/og-image.jpg" property="og:image:url" />
      <meta content="image/jpeg" property="og:image:type" />
      <meta content="1200" property="og:image:width" />
      <meta content="630" property="og:image:height" />
      <meta content="Pency - Tu tienda online" property="og:image:alt" />
    </Head>
    <Flex backgroundColor="gray.50" height="100vh">
      <Flex
        alignItems="center"
        display={{base: "none", md: "inherit"}}
        justifyContent="space-between"
        paddingX={12}
        paddingY={6}
        position="absolute"
        width="100%"
        zIndex={2}
      >
        <Heading>Pency</Heading>
        <Stack isInline display="none">
          <Button size="sm" variantColor="cyan">
            Mirá un demo
          </Button>
          <Button size="sm" variantColor="cyan">
            Creá tu tienda
          </Button>
        </Stack>
      </Flex>
      <Flex
        alignItems="center"
        backgroundImage="url(./lines.svg)"
        backgroundPosition="top"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        justifyContent="center"
        position="relative"
        textAlign={{base: "center", md: "inherit"}}
        width="100%"
      >
        <Stack
          flex={{base: 1, md: 0.8}}
          justifyContent="center"
          padding={{base: 6, md: 12}}
          spacing={4}
        >
          <Heading as="h1" size="2xl">
            Tu tienda online, <Text color="cyan.500">fácil y gratis</Text>
          </Heading>
          <Text color="gray.500" fontSize="2xl">
            Cargá tus productos y recibí los pedidos de tus clientes por WhatsApp en minútos.
          </Text>
          <Stack isInline justifyContent={{base: "center", md: "flex-start"}} spacing={4}>
            <UnstyledLink href="/blondies">
              <Button size="lg">Mirá un demo</Button>
            </UnstyledLink>
            <UnstyledLink isExternal href="https://forms.gle/FWd3VNM5i9EvpfXZ7">
              <Button size="lg" variantColor="cyan">
                Creá tu tienda
              </Button>
            </UnstyledLink>
          </Stack>
        </Stack>
        <Box
          display={{base: "none", md: "inherit"}}
          flex={1}
          height="100%"
          position="relative"
          width="100%"
        >
          <Image
            height="100%"
            objectFit="contain"
            position="absolute"
            right={0}
            src="/iphone-top.png"
            width="100%"
            zIndex={1}
          />
          <Image height="100%" position="absolute" right={0} src="/circles-top.svg" width="100%" />
        </Box>
      </Flex>
    </Flex>
  </>
);

export default LandingScreen;
