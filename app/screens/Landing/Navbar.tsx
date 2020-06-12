import React from "react";
import {Grid, Button} from "@chakra-ui/core";

import Content from "./Content";

import Link from "~/ui/controls/Link";

const Navbar = () => (
  <Content
    alignItems="center"
    as="nav"
    backgroundColor="white"
    display="flex"
    justifyContent="space-between"
    paddingY={{base: 4, sm: 5}}
  >
    <svg width="114" height="24" fill="#0c353c" xmlns="http://www.w3.org/2000/svg"><defs/><path d="M5.168 14.68h5.6c4.928 0 7.52-3.424 7.52-7.072C18.288 3.832 15.76.6 10.768.6H.048V23h5.12v-8.32zm0-4.64v-4.8h5.28c1.664 0 2.72.864 2.72 2.4s-1.056 2.4-2.72 2.4h-5.28zM21.868.6V23H39.5v-4.64H26.988v-4.48H38.22V9.24H26.988v-4H39.18V.6H21.868zM48.214 4.024L56.406 23h8.768V.6h-5.12v18.976L51.862.6h-8.768V23h5.12V4.024zM73.89 11.8c0-4.16 2.944-6.88 6.528-6.88 3.104 0 5.376 1.824 6.016 4.928l4.704-2.112C90.178 3.544 86.434.28 80.514.28 73.954.152 68.642 5.368 68.77 11.8c0 6.592 4.608 11.52 11.744 11.52 6.144 0 10.24-3.424 11.552-8.928l-4.704-1.888c-.736 3.744-3.008 6.176-6.816 6.176-3.584 0-6.656-2.656-6.656-6.88zM98.051.6h-5.92l8.16 13.76V23h5.12v-8.64L113.571.6h-5.6l-5.12 8.768L98.051.6z" fill="#000"/></svg>
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
