import React from "react";
import Head from "next/head";
import {Global, css} from "@emotion/core";

import {META} from "../constants";

import {ClientTenant} from "~/tenant/types";
import {Product} from "~/product/types";

interface Props {
  tenant: ClientTenant;
  product: Product;
}

const StoreLayout: React.FC<Props> = ({tenant, product, children}) => (
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
          letter-spacing: -0.2px;
          touch-action: manipulation;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
        }

        #drawer-cart,
        #drawer-cart-item {
          height: 100% !important;
        }
      `}
    />
    <Head>
      <link href={META.favicon} rel="icon" />
      <link href={tenant.logo || META.appleicon} rel="apple-touch-icon" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap"
        rel="stylesheet"
      />
      <title>{tenant.title || META.title}</title>
      <meta content={tenant.color || META.theme} name="theme-color" />
      <meta content={tenant.description || META.description} name="description" />
      <meta content={tenant.keywords || META.keywords} name="keywords" />
      <meta content={META.author} name="author" />
      <meta content={META.fbapp} property="fb:app_id" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={META.twitter} name="twitter:site" />
      <meta content={META.twitter} name="twitter:creator" />
      {product ? (
        <>
          <meta content={`${META.url}/${tenant.slug}?product=${product.id}`} property="og:url" />
          <meta content="article" property="og:type" />
          <meta content={product.title} property="og:title" />
          <meta content={product.description} property="og:description" />
          <meta content={product.image} property="og:image" />
          <meta content={product.image} property="og:image:secure" />
          <meta content={product.image} property="og:image:url" />
          <meta content="image/jpeg" property="og:image:type" />
          <meta content={product.title} property="og:image:alt" />
        </>
      ) : (
        <>
          <meta content={`${META.url}/${tenant.slug}`} property="og:url" />
          <meta content="website" property="og:type" />
          <meta content={tenant.title || META.title} property="og:title" />
          <meta content={tenant.description || META.description} property="og:description" />
          <meta content={META.banner?.url} property="og:image" />
          <meta content={META.banner?.url} property="og:image:secure" />
          <meta content={META.banner?.url} property="og:image:url" />
          <meta content={META.banner?.format} property="og:image:type" />
          <meta content={META.banner?.width} property="og:image:width" />
          <meta content={META.banner?.height} property="og:image:height" />
          <meta content={tenant.title || META.title} property="og:image:alt" />
        </>
      )}
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      {process.env.NODE_ENV === "production" && (
        <script async src="https://www.googletagmanager.com/gtag/js" />
      )}
    </Head>
    {children}
  </>
);

export default StoreLayout;
