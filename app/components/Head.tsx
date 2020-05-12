import React from "react";
import NextHead from "next/head";
import {Global, css} from "@emotion/core";

import {Tenant} from "~/tenant/types";

interface Props {
  tenant: Tenant;
  track?: boolean;
}

const Head: React.FC<Props> = ({tenant, track = false}) => (
  <>
    <Global
      styles={css`
        html,
        body {
          height: 100%;
          max-height: 100vh;
          width: 100%;
          max-width: 100vw;
          overscroll-behavior: contain;
          overflow: hidden;
          position: fixed;
        }

        #__next {
          height: 100%;
        }

        * {
          touch-action: manipulation;
          font-family: aktiv-grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
        }

        #drawer-cart,
        #drawer-product,
        #drawer-options {
          height: 100% !important;
        }

        #modal-image {
          height: inherit !important;
          margin: 0 !important;
        }
      `}
    />
    <NextHead>
      <link href="https://use.typekit.net/kdb3mdf.css" rel="stylesheet" />
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
      {track && <script async src="https://www.googletagmanager.com/gtag/js" />}
    </NextHead>
  </>
);

export default Head;
