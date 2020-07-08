import React from "react";
import Head from "next/head";
import {Global, css} from "@emotion/core";

import {META} from "../constants";

import {ClientTenant} from "~/tenant/types";
import {Product} from "~/product/types";
import {CURRENCIES} from "~/i18n/constants";

interface Props {
  tenant: ClientTenant;
  product: Product;
}

const StoreLayout: React.FC<Props> = ({tenant, product, children}) => (
  <>
    <Global
      styles={css`
        body {
          min-height: 100vh;
          min-height: -webkit-fill-available;
          height: 100%;
        }

        html {
          height: -webkit-fill-available;
        }

        html,
        body {
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
      <link href={`${META.url}/${tenant.slug}`} rel="canonical" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap"
        rel="stylesheet"
      />
      <title>{tenant.title || META.title}</title>
      <meta content={tenant.color || META.theme} name="theme-color" />
      <meta content={tenant.description || META.description} name="description" />
      <meta content={tenant.keywords || META.keywords} name="keywords" />
      <meta content={META.author} name="author" />
      <meta content={META.author} property="og:site_name" />
      <meta content={META.fbapp} property="fb:app_id" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={tenant.twitter ? `@${tenant.twitter}` : META.twitter} name="twitter:creator" />
      <meta content={META.twitter} name="twitter:site" />
      {product ? (
        <>
          <meta content={product.title} name="twitter:title" />
          <meta content={product.description} name="twitter:description" />
          <meta content={product.image || META.banner?.url} property="twitter:image" />
          <meta content={`${META.url}/${tenant.slug}?product=${product.id}`} property="og:url" />
          <meta content="article" property="og:type" />
          <meta content={product.title} property="og:title" />
          <meta content={product.description} property="og:description" />
          <meta content={product.image} property="og:image" />
          <meta content={product.image} property="og:image:secure" />
          <meta content={product.image} property="og:image:url" />
          <meta content="image/jpeg" property="og:image:type" />
          <meta content={product.title} property="og:image:alt" />
          <meta content={String(product.price)} property="og:price:amount" />
          <meta content={CURRENCIES[tenant.country]} property="og:price:currency" />
          <meta content={String(product.price)} property="product:price:amount" />
          <meta content={CURRENCIES[tenant.country]} property="product:price:currency" />
          <meta content={product.category} property="article:section" />
          <meta content={product.title} itemProp="name" />
          <meta content={product.description} itemProp="description" />
          <meta content={product.image} itemProp="image" />
        </>
      ) : (
        <>
          <meta content={tenant.title || META.title} name="twitter:title" />
          <meta content={tenant.description || META.description} name="twitter:description" />
          <meta
            content={tenant.banner || tenant.logo || META.banner?.url}
            property="twitter:image"
          />
          <meta content={`${META.url}/${tenant.slug}`} property="og:url" />
          <meta content="website" property="og:type" />
          <meta
            content={tenant.title ? `Pency | ${tenant.title}` : META.title}
            property="og:title"
          />
          <meta content={tenant.description || META.description} property="og:description" />
          <meta content={tenant.banner || tenant.logo || META.banner?.url} property="og:image" />
          <meta
            content={tenant.banner || tenant.logo || META.banner?.url}
            property="og:image:secure"
          />
          <meta
            content={tenant.banner || tenant.logo || META.banner?.url}
            property="og:image:url"
          />
          <meta content={META.banner?.format} property="og:image:type" />
          <meta content={META.banner?.width} property="og:image:width" />
          <meta content={META.banner?.height} property="og:image:height" />
          <meta content={tenant.title || META.title} property="og:image:alt" />
        </>
      )}
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    </Head>
    {children}
  </>
);

export default StoreLayout;
