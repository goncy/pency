import React from "react";
import Head from "next/head";
import {Global, css} from "@emotion/core";

import {META} from "../constants";

import {Tenant} from "~/tenant/types";

interface Props {
  tenant: Tenant;
}

const StoreLayout: React.FC<Props> = ({tenant, children}) => (
  <>
    <Global
      styles={css`
        html,
        body {
          height: 100%;
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
        #drawer-options {
          height: 100% !important;
        }

        #modal-image {
          height: inherit !important;
          margin: 0 !important;
        }
      `}
    />
    <Head>
      <link href={META.favicon} rel="icon" />
      <link href={tenant.logo || META.appleicon} rel="apple-touch-icon" />
      <link href="https://use.typekit.net/kdb3mdf.css" rel="stylesheet" />
      <title>{tenant.title || META.title}</title>
      <meta content={tenant.color || META.theme} name="theme-color" />
      <meta content={tenant.description || META.description} name="description" />
      <meta content={tenant.keywords || META.keywords} name="keywords" />
      <meta content={META.author} name="author" />
      <meta content={META.fbapp} property="fb:app_id" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={META.twitter} name="twitter:site" />
      <meta content={META.twitter} name="twitter:creator" />
      <meta content={`${META.url}/${tenant.slug}`} property="og:url" />
      <meta content="website" property="og:type" />
      <meta content={tenant.title || META.title} property="og:title" />
      <meta content={tenant.description || META.description} property="og:description" />
      <meta content={tenant.banner || META.banner?.url} property="og:image" />
      <meta content={tenant.banner || META.banner?.url} property="og:image:secure" />
      <meta content={tenant.banner || META.banner?.url} property="og:image:url" />
      <meta content={META.banner?.format} property="og:image:type" />
      <meta content={META.banner?.width} property="og:image:width" />
      <meta content={META.banner?.height} property="og:image:height" />
      <meta content={tenant.title || META.title} property="og:image:alt" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      {process.env.NODE_ENV === "production" && (
        <script async src="https://www.googletagmanager.com/gtag/js" />
      )}
    </Head>
    {children}
  </>
);

export default StoreLayout;
