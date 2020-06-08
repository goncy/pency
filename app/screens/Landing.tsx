import React from "react";
import {Flex, Grid, Box, Text, Link, Button, Image, Tag, TagLabel, Scale} from "@chakra-ui/core";
import styled from "@emotion/styled";

import UserIcon from "~/ui/icons/User";
import ClockIcon from "~/ui/icons/Clock";
import UsersIcon from "~/ui/icons/Users";
import ShareIcon from "~/ui/icons/Share";
import SquareIcon from "~/ui/icons/Square";
import ShoppingIcon from "~/ui/icons/Shopping";
import CustomizableIcon from "~/ui/icons/Customizable";

// const HoverableCard = styled(Flex)``;

const Landing = () => (
  <Box minHeight="100vh">
    {/* Navbar  */}
    <Flex
      alignItems="center"
      as="nav"
      bg="white"
      justifyContent="space-between"
      paddingX={{base: 3, sm: 20}}
      paddingY={{base: 4, sm: 5}}
    >
      <Image alt="Pency" src="/logo.svg" />

      <Grid alignItems="center" gridAutoFlow="column" gridGap={{base: 4, sm: 8}}>
        <Link
          _hover={{color: "teal.700", borderBottom: "1px", borderColor: "gray.400"}}
          fontWeight={500}
          transition="color 0.15s ease-out"
        >
          Equipo
        </Link>
        <Link
          _hover={{color: "teal.700", borderBottom: "1px", borderColor: "gray.400"}}
          fontWeight={500}
          transition="color 0.15s ease-out"
        >
          Soporte
        </Link>
        <Button d={{base: "none", sm: "block"}} variantColor="teal">
          Crear tienda
        </Button>
      </Grid>
    </Flex>
    {/* Header */}
    <Flex
      as="header"
      bg="#1E6D72"
      color="white"
      flexDirection={{base: "column", sm: "column", md: "row"}}
      paddingBottom={{base: 0, sm: 4}}
      paddingTop={{base: 6, sm: 24}}
      paddingX={{base: 3, sm: 20}}
    >
      <Box maxWidth={{base: "95%", sm: 480}}>
        <Text as="h2" fontSize={{base: 24, sm: 48}} fontWeight={500} lineHeight={"130%"} mb={2}>
          Ahorrá tiempo y dinero con tu tienda Pency
        </Text>
        <Text as="h3" color={"#DBF8F3"} fontSize={{base: 20, sm: 24}}>
          Publicá tu catálogo online y recibí los pedidos por WhatsApp GRATIS.
        </Text>
        <Box d={{base: "none", sm: "block"}} marginTop={10}>
          <Button
            _hover={{boxShadow: "xl", transform: "translateY(-1px)"}}
            bg="#EEFCF9"
            boxShadow="lg"
            color="#202428"
            size="lg"
          >
            Crear tienda
          </Button>
          <Button
            _hover={{color: "#202428", backgroundColor: "#EEFCF9"}}
            ml={{base: 0, sm: 6}}
            size="lg"
            variant="outline"
          >
            Ver tienda de prueba
          </Button>
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
          paddingTop={{base: 2, sm: 0}}
          src="./Phone.png"
        />
      </Flex>
    </Flex>
    {/* Section - Primary Features */}
    <Grid
      as="section"
      gridGap={{base: 8, sm: 6}}
      paddingBottom={{base: 12, sm: 20}}
      paddingTop={{base: 48, sm: 32}}
      paddingX={{base: 10, sm: 20}}
      templateColumns="repeat(auto-fit, minmax(230px,1fr))"
    >
      <Box as="article">
        <ShoppingIcon marginBottom={4} />
        <Text color="teal.800" fontSize={{base: 20, sm: 18}} fontWeight={500}>
          Mantené tu catálogo actualizado
        </Text>
        <Text color="#505458" marginTop={2}>
          Cada cambio en tu carta o actualización de precios se refleja al instante.
        </Text>
      </Box>
      <Box as="article">
        <ClockIcon marginBottom={4} />
        <Text color="teal.800" fontSize={{base: 20, sm: 18}} fontWeight={500}>
          Agilizá la gestión de tu negocio
        </Text>
        <Text color="#505458" marginTop={2}>
          Recibir pedidos por teléfono es lento, costoso y favorece errores, optimiza tiempo de tus
          empleados
        </Text>
      </Box>
      <Box as="article">
        <UsersIcon marginBottom={4} />
        <Text color="teal.800" fontSize={{base: 20, sm: 18}} fontWeight={500}>
          Alcanzá a muchos más clientes
        </Text>
        <Text color="#505458" marginTop={2}>
          Agregá, modificá o eliminar productos fácilmente.
        </Text>
      </Box>
      <Box as="article">
        <ShoppingIcon marginBottom={4} />
        <Text color="teal.800" fontSize={{base: 20, sm: 18}} fontWeight={500}>
          Sin intermediarios
        </Text>
        <Text color="#505458" marginTop={2}>
          Los clientes son de tu negocio, no pagás comisiones por cada venta y ofreces un mejor
          precio
        </Text>
      </Box>
    </Grid>
    {/* Section - Main Feature */}
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
      <Text as="h4" color="#808488">
        Try Pency for free, and explore all the tools and services you need to start, run, and grow
        your business
      </Text>
      <Grid
        alignItems="center"
        as="section"
        gridGap={{base: 8, sm: 6}}
        marginTop={{base: 12, sm: 12}}
        templateColumns="repeat(auto-fit, minmax(276px,1fr))"
      >
        <Flex alignItems="center" flexDirection="column">
          <Tag bg="#DBF8F3" marginBottom={4} rounded="full" size="lg" variant="solid">
            <TagLabel color="teal.900">Panaderias</TagLabel>
          </Tag>
          <Image alt="Panaderias" src="/Store.png" />
        </Flex>
        <Flex alignItems="center" flexDirection="column">
          <Tag bg="#DBF8F3" marginBottom={4} rounded="full" size="lg" variant="solid">
            <TagLabel color="teal.900">Restaurantes</TagLabel>
          </Tag>
          <Image alt="Restaurantes" src="/Store.png" />
        </Flex>
        <Flex alignItems="center" flexDirection="column">
          <Tag bg="#DBF8F3" marginBottom={4} rounded="full" size="lg" variant="solid">
            <TagLabel color="teal.900">Decoración</TagLabel>
          </Tag>
          <Image alt="Decoración" src="/Store.png" />
        </Flex>
        <Flex alignItems="center" flexDirection="column">
          <Tag bg="#DBF8F3" marginBottom={4} rounded="full" size="lg" variant="solid">
            <TagLabel color="teal.900">Mueblerías</TagLabel>
          </Tag>
          <Image alt="Mueblerías" src="/Store.png" />
        </Flex>
      </Grid>
    </Box>
    {/* Section - Get Started */}
    <Box
      as="section"
      paddingBottom={{base: 12, sm: 20}}
      paddingTop={{base: 12, sm: 20}}
      paddingX={{base: 10, sm: 20}}
    >
      <Text
        color="#505458"
        fontSize={{base: 24, sm: 36}}
        fontWeight={500}
        marginBottom={8}
        marginTop={2}
        maxWidth={{base: "auto", sm: 560}}
      >
        Comenzá ya mismo y en 5 minutos tené tu tienda funcionando
      </Text>

      <Grid gridGap={{base: 8, sm: 6}} templateColumns="repeat(auto-fit, minmax(230px,1fr))">
        <Box as="article">
          <UserIcon marginBottom={4} />
          <Text color="teal.800" fontSize={{base: 20, sm: 18}} fontWeight={500}>
            Crea tu cuenta
          </Text>
          <Text color="#505458" marginTop={6}>
            Solo necesitas un e-mail
          </Text>
        </Box>
        <Box as="article">
          <CustomizableIcon marginBottom={4} />
          <Text color="teal.800" fontSize={{base: 20, sm: 18}} fontWeight={500}>
            Personalizá tu tienda
          </Text>
          <Text color="#505458" marginTop={6}>
            Que refleje tu estilo!
          </Text>
        </Box>
        <Box as="article">
          <SquareIcon marginBottom={4} />
          <Text color="teal.800" fontSize={{base: 20, sm: 18}} fontWeight={500}>
            Agregá tus productos
          </Text>
          <Text color="#505458" marginTop={6}>
            Es fácil e intuitivo
          </Text>
        </Box>
        <Box as="article">
          <ShareIcon marginBottom={4} />
          <Text color="teal.800" fontSize={{base: 20, sm: 18}} fontWeight={500}>
            Compartila!
          </Text>
          <Text color="#505458" marginTop={6}>
            A tus contactos y redes sociales
          </Text>
        </Box>
      </Grid>
    </Box>
    {/* Section - Quotes */}
    <Box as="section" paddingX={{base: 10, sm: 20}}>
      <Flex
        alignItems="center"
        bg="#F2F4F5"
        borderRadius={2}
        flexDirection="column"
        paddingBottom={{base: 12, sm: 20}}
        paddingTop={{base: 8, sm: 20}}
        paddingX={{base: 26, sm: 0}}
        textAlign="center"
      >
        <Box bg="white" borderRadius="50%" height={24} marginBottom={{base: 6, sm: 42}} width={24}>
          .
        </Box>
        <Text fontSize={{base: 24, sm: 36}} maxWidth={{base: "auto", sm: 782}}>
          “Nuestras ventas son 100% online y encontramos en Pency un aliado para acelerar nuestra
          expansión y evolucionar juntos."
        </Text>
        <Flex
          alignItems="center"
          flexDirection={{base: "column", sm: "row"}}
          fontSize={{base: 20}}
          marginTop={46}
        >
          <Text color="teal.800" marginBottom={{base: 2, sm: 0}}>
            Melanie Arakelian
          </Text>
          <Text color="teal.500" display={{base: "none", sm: "block"}} marginX={2}>
            /
          </Text>
          <Text color="#808488" fontSize={{base: 18, sm: 20}}>
            Dueña de Workcation
          </Text>
        </Flex>
      </Flex>
    </Box>
    {/* Section - Secondary Features */}
    <Box
      paddingBottom={{base: 12, sm: 18}}
      paddingTop={{base: 12, sm: 20}}
      paddingX={{base: 10, sm: 20}}
      textAlign={{base: "left", sm: "center"}}
    >
      <Text fontSize={{base: 24, sm: 48}} fontWeight={500} marginBottom={{base: 4, sm: 6}}>
        Empezá una gestión rápida y profesional de tu negocio
      </Text>
      <Text color="#505458" fontSize={{base: 18, sm: 24}}>
        Try Pency for free, and explore all the tools and services you need to start, run, and grow
        your business.
      </Text>
      <Box
        display={{base: "flex", sm: "block"}}
        justifyContent="stretch"
        left={0}
        marginTop={{base: 24, sm: 12}}
        position={{base: "absolute", sm: "static"}}
        right={0}
      >
        <Button flex="1" variantColor="teal">
          Crear tienda
        </Button>
        <Button flex="1" marginLeft={{base: 0, sm: 12}} variant="outline" variantColor="teal">
          Ver demo
        </Button>
      </Box>
    </Box>
  </Box>
);

export default Landing;
