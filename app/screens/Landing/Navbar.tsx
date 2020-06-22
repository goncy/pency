import React from "react";
import {Grid, Button} from "@chakra-ui/core";

import Content from "./Content";

import Link from "~/ui/controls/Link";
import Logo from "~/ui/static/Logo";

const Navbar = () => (
  <Content
    alignItems="center"
    as="nav"
    backgroundColor="white"
    display="flex"
    justifyContent="space-between"
    paddingY={{base: 4, sm: 5}}
  >
    <Logo />
    <Grid alignItems="center" gridAutoFlow="column" gridGap={{base: 4, sm: 8}}>
      <Link
        _hover={{color: "teal.700", borderBottom: "1px", borderColor: "gray.400"}}
        fontWeight={500}
        href={`mailto:${process.env.MANTAINER_EMAIL}?subject:"Pregunta por Pency"`}
        transition="color 0.15s ease-out"
      >
        Soporte
      </Link>
      <Link
        isExternal
        href="https://docs.google.com/forms/d/1P1o0HVHDluk-VMHHRLFVPn_TDKkqg_JhlMBmclcd6Co"
      >
        <Button d={{base: "none", sm: "block"}} variantColor="teal">
          Crear tienda
        </Button>
      </Link>
    </Grid>
  </Content>
);

export default Navbar;
