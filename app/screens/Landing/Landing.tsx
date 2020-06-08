import React from "react";
import {Flex, Grid, Box, Text, Link, Button, Image, Stack, Avatar} from "@chakra-ui/core";
import styled from "@emotion/styled";

import Feature from "./Feature";
import Preview from "./Preview";

import UserIcon from "~/ui/icons/User";
import ClockIcon from "~/ui/icons/Clock";
import UsersIcon from "~/ui/icons/Users";
import ShareIcon from "~/ui/icons/Share";
import SquareIcon from "~/ui/icons/Square";
import ShoppingIcon from "~/ui/icons/Shopping";
import CustomizableIcon from "~/ui/icons/Customizable";

const UnstyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const Landing = () => (
  <Box minHeight="100vh">
    <Flex
      alignItems="center"
      as="nav"
      backgroundColor="white"
      justifyContent="space-between"
      paddingX={{base: 3, sm: 20}}
      paddingY={{base: 4, sm: 5}}
    >
      <Image alt="Pency" src="/logo.svg" />

      <Grid alignItems="center" gridAutoFlow="column" gridGap={{base: 4, sm: 8}}>
        <Link
          _hover={{color: "teal.700", borderBottom: "1px", borderColor: "gray.400"}}
          fontWeight={500}
          href={`mailto:${process.env.MANTAINER_EMAIL}?subject:"Pregunta por Pency"`}
          transition="color 0.15s ease-out"
        >
          Soporte
        </Link>
        <UnstyledLink
          isExternal
          href="https://docs.google.com/forms/d/1P1o0HVHDluk-VMHHRLFVPn_TDKkqg_JhlMBmclcd6Co"
        >
          <Button d={{base: "none", sm: "block"}} variantColor="teal">
            Crear tienda
          </Button>
        </UnstyledLink>
      </Grid>
    </Flex>
    <Flex
      alignItems="center"
      as="header"
      backgroundColor="teal.600"
      color="white"
      flexDirection={{base: "column", md: "row"}}
      paddingX={{base: 4, sm: 20}}
      paddingY={8}
    >
      <Box maxWidth={{base: "auto", sm: 480}}>
        <Text as="h2" fontSize={{base: 24, sm: 48}} fontWeight={500} lineHeight={"130%"} mb={2}>
          Ahorrá tiempo y dinero con tu tienda Pency
        </Text>
        <Text as="h3" color="teal.50" fontSize={{base: 20, sm: 24}}>
          Publicá tu catálogo online y recibí los pedidos por WhatsApp GRATIS.
        </Text>
        <Box display={{base: "none", sm: "block"}} marginTop={10}>
          <UnstyledLink
            isExternal
            href="https://docs.google.com/forms/d/1P1o0HVHDluk-VMHHRLFVPn_TDKkqg_JhlMBmclcd6Co"
          >
            <Button backgroundColor="white" color="black" size="lg">
              Crear tienda
            </Button>
          </UnstyledLink>
          <UnstyledLink isExternal href="https://pency.app/demo">
            <Button
              _hover={{color: "black", backgroundColor: "white"}}
              color="white"
              marginLeft={{base: 0, sm: 6}}
              size="lg"
              variant="outline"
            >
              Ver tienda de prueba
            </Button>
          </UnstyledLink>
        </Box>
      </Box>
      <Flex
        alignItems="center"
        flex={1}
        justifyContent={{base: "center", sm: "center", md: "flex-end"}}
        marginRight={{base: -4, sm: 0}}
        marginTop={{base: 10, sm: 0}}
      >
        <Image
          marginBottom={{base: -20, sm: -24}}
          maxWidth="80vw"
          paddingTop={{base: 2, sm: 0}}
          src="./Phone.png"
        />
      </Flex>
    </Flex>
    <Grid
      as="section"
      gridGap={{base: 8, sm: 6}}
      paddingBottom={{base: 12, sm: 20}}
      paddingTop={{base: 48, sm: 32}}
      paddingX={{base: 10, sm: 20}}
      templateColumns="repeat(auto-fit, minmax(230px,1fr))"
    >
      <Feature icon={ShoppingIcon} title="Mantené tu catálogo actualizado">
        Cada cambio en tu carta o actualización de precios se refleja al instante.
      </Feature>
      <Feature icon={ClockIcon} title="Agilizá la gestión de tu negocio">
        Recibir pedidos por teléfono es lento, costoso y favorece errores, optimiza tiempo de tus
        empleados.
      </Feature>
      <Feature icon={UsersIcon} title="Alcanzá a muchos más clientes">
        Agregá, modificá o eliminar productos fácilmente.
      </Feature>
      <Feature icon={ShoppingIcon} title="Sin intermediarios">
        Los clientes son de tu negocio, no pagás comisiones por cada venta y ofreces un mejor
        precio.
      </Feature>
    </Grid>
    <Box
      as="section"
      bg="#EEFCF9"
      paddingBottom={{base: 12, sm: 24}}
      paddingTop={{base: 16, sm: 16}}
      paddingX={{base: 10, sm: 20}}
      textAlign={{base: "left", sm: "center"}}
    >
      <Text
        as="h3"
        color="gray.900"
        fontSize={{base: 24, sm: 36}}
        fontWeight={500}
        marginBottom={{base: 4, sm: 0}}
      >
        Versatil, para todo tipo de negocios
      </Text>
      <Text as="h4" color="gray.500">
        No importa cual sea tu rubro, Pency se adapta a vos y tus productos.
      </Text>
      <Grid
        alignItems="center"
        as="section"
        gridGap={{base: 8, sm: 6}}
        marginTop={{base: 12, sm: 12}}
        templateColumns="repeat(auto-fit, minmax(276px,1fr))"
      >
        <Preview image="/Store.png" title="Panaderías" />
        <Preview image="/Store.png" title="Restaurantes" />
        <Preview image="/Store.png" title="Decoración" />
        <Preview image="/Store.png" title="Mueblerías" />
      </Grid>
    </Box>
    <Box
      as="section"
      paddingBottom={{base: 12, sm: 20}}
      paddingTop={{base: 12, sm: 20}}
      paddingX={{base: 10, sm: 20}}
    >
      <Text
        color="black"
        fontSize={{base: 24, sm: 36}}
        fontWeight={500}
        marginBottom={8}
        marginTop={2}
        maxWidth={{base: "auto", sm: 560}}
      >
        Comenzá ya mismo y en 5 minutos tené tu tienda funcionando
      </Text>
      <Grid gridGap={{base: 8, sm: 6}} templateColumns="repeat(auto-fit, minmax(230px,1fr))">
        <Feature icon={UserIcon} title="Crea tu cuenta">
          Solo necesitas un e-mail
        </Feature>
        <Feature icon={CustomizableIcon} title="Personalizá tu tienda">
          Que refleje tu estilo!
        </Feature>
        <Feature icon={SquareIcon} title="Agregá tus productos">
          Es fácil e intuitivo
        </Feature>
        <Feature icon={ShareIcon} title="Compartila!">
          A tus contactos y redes sociales
        </Feature>
      </Grid>
    </Box>
    <Box as="section" paddingX={{base: 4, sm: 20}}>
      <Stack
        alignItems="center"
        bg="#F2F4F5"
        borderRadius={2}
        flexDirection="column"
        paddingBottom={{base: 12, sm: 20}}
        paddingTop={{base: 8, sm: 20}}
        paddingX={{base: 26, sm: 0}}
        spacing={4}
        textAlign="center"
      >
        <Avatar name="Francisco Bellocchio" size="2xl" />
        <Text fontSize={{base: "2xl", sm: "3xl"}} maxWidth={{base: "auto", sm: 782}}>
          “Pency apareció en el momento justo como una herramienta para ayudar a nuestra marca a
          potenciar la venta on line y llegar a nuestros clientes de manera simple y segura."
        </Text>
        <Flex alignItems="center" flexDirection={{base: "column", sm: "row"}} fontSize={{base: 20}}>
          <Text color="teal.800" marginBottom={{base: 2, sm: 0}}>
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
    </Box>
    <Box
      paddingX={{base: 10, sm: 20}}
      paddingY={{base: 12, sm: 20}}
      textAlign={{base: "left", sm: "center"}}
    >
      <Text fontSize={{base: 24, sm: 48}} fontWeight={500} marginBottom={{base: 4, sm: 6}}>
        Empezá una gestión rápida y profesional de tu negocio
      </Text>
      <Text color="gray.500" fontSize={{base: 18, sm: 24}}>
        Estás a un paso de llevar tu negocio a otro nivel.
      </Text>
    </Box>
    <Stack
      isInline
      justifyContent="center"
      marginBottom={{base: 0, sm: 20}}
      paddingX={{base: 0, sm: 20}}
      spacing={{base: 0, sm: 8}}
    >
      <UnstyledLink
        isExternal
        flex={{base: 1, sm: "inherit"}}
        href="https://docs.google.com/forms/d/1P1o0HVHDluk-VMHHRLFVPn_TDKkqg_JhlMBmclcd6Co"
      >
        <Button rounded={{base: "none", sm: "md"}} size="lg" variantColor="teal" width="100%">
          Crear tienda
        </Button>
      </UnstyledLink>
      <UnstyledLink isExternal flex={{base: 1, sm: "inherit"}} href="https://pency.app/demo">
        <Button
          backgroundColor="teal.50"
          rounded={{base: "none", sm: "md"}}
          size="lg"
          variant="ghost"
          variantColor="teal"
          width="100%"
        >
          Ver demo
        </Button>
      </UnstyledLink>
    </Stack>
  </Box>
);

export default Landing;
