import React from "react";
import {Global, css} from "@emotion/core";
import {Flex, Heading, Image, ThemeProvider, CSSReset} from "@chakra-ui/core";
import Link from "next/link";
import Head from "next/head";

import {Provider as ProductProvider} from "~/product/context";
import {Provider as TenantProvider} from "~/tenant/context";
import {Provider as CartProvider} from "~/cart/context";

function App({Component, pageProps}) {
  const {tenant, products} = pageProps;

  return (
    <ThemeProvider>
      <CSSReset />
      <Global
        styles={css`
          body {
            height: 100%;
            max-height: 100vh;
            width: 100%;
            max-width: 100vw;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
              "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overscroll-behavior: contain;
            overflow: hidden;
            position: fixed;
          }

          #__next {
            height: 100%;
          }

          * {
            touch-action: manipulation;
          }

          #drawer-cart {
            height: 100% !important;
          }

          #modal-image,
          #modal-options {
            height: inherit !important;
            margin: 0 !important;
          }
        `}
      />
      {tenant && products ? (
        <>
          <Head>
            <link href="/favicon.ico" rel="icon" />
            <meta
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              name="viewport"
            />
            <meta content={tenant.color || "#00B5D8"} name="theme-color" />
            <meta
              content={
                tenant.description ||
                "Crea tu propia tienda en segundos y vendé por WhatsApp de forma fácil"
              }
              name="description"
            />
            <link href={tenant.logo || "/logo192.png"} rel="apple-touch-icon" />
            <meta content={tenant.color || "#00B5D8"} name="theme-color" />
            <meta
              content={tenant.keywords || "venta, whatsapp, tienda, online, delivery, productos"}
              name="keywords"
            />
            <meta content="Gonzalo Pozzo" name="author" />
            <meta content="summary_large_image" name="twitter:card" />
            <meta content="goncy" name="twitter:site" />
            <meta content="goncy" name="twitter:creator" />
            <meta content="https://pency.now.sh" property="og:url" />
            <meta content="website" property="og:type" />
            <meta content={tenant.title || "Pency - Tu tienda online"} property="og:title" />
            <meta
              content={
                tenant.description ||
                "Crea tu propia tienda en segundos y vendé por WhatsApp de forma fácil"
              }
              property="og:description"
            />
            <meta content={tenant.banner || "/og-image.jpg"} property="og:image" />
            <meta content={tenant.banner || "/og-image.jpg"} property="og:image:url" />
            <meta content="image/jpeg" property="og:image:type" />
            <meta content="1200" property="og:image:width" />
            <meta content="630" property="og:image:height" />
            <meta content={tenant.title || "Pency - Tu tienda online"} property="og:image:alt" />
            <title>{tenant.title || "Pency - Tu tienda online"}</title>
          </Head>
          <TenantProvider initialValue={tenant}>
            <Flex direction="column" height="100%">
              <Flex
                align="center"
                as="nav"
                bg={`primary.${tenant.hue}`}
                color="white"
                justifyContent="space-between"
                padding={3}
                wrap="wrap"
              >
                <Heading as="h1" size="lg">
                  <Link href={`/${tenant.slug}`}>
                    {tenant.logo ? <Image maxHeight={16} src={tenant.logo} /> : tenant.slug}
                  </Link>
                </Heading>
              </Flex>

              <ProductProvider initialValues={products}>
                <CartProvider>
                  <Component {...pageProps} />
                </CartProvider>
              </ProductProvider>
            </Flex>
          </TenantProvider>
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}

export default App;
