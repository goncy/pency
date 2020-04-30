import React from "react";
import {Flex, Text} from "@chakra-ui/core";
import Head from "next/head";

const LandingScreen: React.FC = () => (
  <>
    <Head>
      <link href="/favicon.ico" rel="icon" />
      <meta content="#00B5D8" name="theme-color" />
      <title>Pency - Tu tienda online</title>
      <meta
        content="Crea tu propia tienda en segundos y vendé por WhatsApp de forma fácil"
        name="description"
      />
      <link href="/logo192.png" rel="apple-touch-icon" />
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
    <Flex
      alignItems="center"
      backgroundColor="cyan.500"
      color="white"
      height="100vh"
      justifyContent="center"
      overflow="hidden"
      padding={4}
      width="100vw"
    >
      <Text fontSize="xl" textAlign="center">
        Estamos en construcción, date una vuelta en unos días.
      </Text>
    </Flex>
  </>
);

export default LandingScreen;
