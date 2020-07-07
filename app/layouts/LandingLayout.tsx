import React from "react";
import Head from "next/head";
import {Global, css} from "@emotion/core";

import {META} from "../constants";

const LandingLayout: React.FC = ({children}) => (
  <>
    <Global
      styles={css`
        * {
          touch-action: manipulation;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
        }
      `}
    />
    <Head>
      <link href={META.favicon} rel="icon" />
      <link href={META.appleicon} rel="apple-touch-icon" />
      <link href={META.url} rel="canonical" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap"
        rel="stylesheet"
      />
      <title>{META.title}</title>
      <meta content={META.theme} name="theme-color" />
      <meta content={META.description} name="description" />
      <meta content={META.keywords} name="keywords" />
      <meta content={META.author} name="author" />
      <meta content={META.fbapp} property="fb:app_id" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={META.twitter} name="twitter:site" />
      <meta content={META.twitter} name="twitter:creator" />
      <meta content={META.title} name="twitter:title" />
      <meta content={META.description} name="twitter:description" />
      <meta content={META.banner?.url} property="twitter:image" />
      <meta content={META.author} property="og:site_name" />
      <meta content={META.url} property="og:url" />
      <meta content="website" property="og:type" />
      <meta content={META.title} property="og:title" />
      <meta content={META.description} property="og:description" />
      <meta content={META.banner?.url} property="og:image" />
      <meta content={META.banner?.url} property="og:image:url" />
      <meta content={META.banner?.format} property="og:image:type" />
      <meta content={META.banner?.width} property="og:image:width" />
      <meta content={META.banner?.height} property="og:image:height" />
      <meta content={META.title} property="og:image:alt" />
    </Head>
    {children}
  </>
);

export default LandingLayout;
