import React from "react";
import Head from "next/head";
import {Global, css} from "@emotion/core";

import {META} from "../constants";

const AdminLayout: React.FC = ({children}) => (
  <>
    <Global
      styles={css`
        html,
        body,
        #__next {
          height: 100%;
        }

        * {
          letter-spacing: -0.2px;
          touch-action: manipulation;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
        }

        #drawer-product {
          height: 100% !important;
        }
      `}
    />
    <Head>
      <link href={META.favicon} rel="icon" />
      <link href={META.appleicon} rel="apple-touch-icon" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap"
        rel="stylesheet"
      />
      <title>{`Panel de administración | ${META.title}`}</title>
      <meta content={META.theme} name="theme-color" />
      <meta content={META.description} name="description" />
      <meta content={META.keywords} name="keywords" />
      <meta content={META.author} name="author" />
      <meta content={META.fbapp} property="fb:app_id" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={META.twitter} name="twitter:site" />
      <meta content={META.twitter} name="twitter:creator" />
      <meta content={META.url} property="og:url" />
      <meta content="website" property="og:type" />
      <meta content={META.title} property="og:title" />
      <meta content={META.description} property="og:description" />
      <meta content={META.banner?.url} property="og:image" />
      <meta content={META.banner?.url} property="og:image:secure" />
      <meta content={META.banner?.url} property="og:image:url" />
      <meta content={META.banner?.format} property="og:image:type" />
      <meta content={META.banner?.width} property="og:image:width" />
      <meta content={META.banner?.height} property="og:image:height" />
      <meta content={META.title} property="og:image:alt" />
    </Head>
    {children}
  </>
);

export default AdminLayout;
