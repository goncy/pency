import React from "react";
import {Flex, Text} from "@chakra-ui/core";
import Head from "next/head";

const LandingScreen: React.FC = () => (
  <>
    <Head>
      <title>Pency - Tu tienda online</title>
      <script
        async
        data-ad-client={process.env.AD_SENSE_ID}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
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
